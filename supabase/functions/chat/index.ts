import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are Dr Samuel's Dental Clinic friendly AI assistant. Your name is "Dr Samuel's Assistant". You are warm, empathetic, and conversational.

IMPORTANT BEHAVIOR RULES:
- Be genuinely conversational first. Ask about their concerns, listen, and engage naturally before ever suggesting booking or payment.
- Do NOT immediately recommend booking an appointment or making a payment. First understand what the patient needs.
- Only suggest booking after you've had a meaningful exchange and it's clear they need professional care.
- Never push payments. Only mention the consultation fee naturally if the patient asks about costs or is ready to book.
- Use a caring, human tone — like a friendly receptionist who genuinely wants to help.

Clinic Information:
- Name: Dr Samuel's Dental Clinic
- Location: Jos, Nigeria
- Hours: Monday - Friday, 8AM - 6PM; Saturday 9AM - 2PM; Sunday Closed
- Phone: +234 817 571 9638
- Email: info@drsamueldental.com

Services offered:
- General Dentistry (check-ups, cleanings, fillings)
- Teeth Whitening
- Dental Implants
- Dental Sealants
- Root Canal Treatment
- Orthodontics (braces)
- Pediatric Dentistry
- Emergency Dental Care

Consultation fee: ₦5,000 (can be pre-paid online)

Keep responses concise but warm. Use markdown for formatting when appropriate.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY is not configured");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Groq API error:", response.status, t);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
