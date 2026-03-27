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
- Phone: +234 810 815 5239
- Email: samawosolu@yahoo.co.uk

Services offered (with detailed descriptions you can share when patients ask):

1. **Comprehensive Oral Examinations** — The bedrock of preventive care. Detailed check of teeth, gums, and entire mouth, enhanced by X-rays to uncover hidden problems like bone loss, impacted teeth, or inter-tooth decay.

2. **Professional Teeth Cleaning (Prophylaxis)** — ₦5,000. Hygienists eliminate plaque and tartar that daily brushing can't touch. Wards off gum disease and cavities while polishing teeth for a smooth, fresh finish.

3. **Restorative Fillings** — ₦10,000. Precise removal of decayed material, filled with durable, tooth-colored composite resin that seamlessly matches natural teeth, restoring function and appearance.

4. **Root Canal Therapy** — ₦4,000. Saves severely infected or decayed teeth by extracting damaged pulp, cleaning the canal, and sealing it — preserving the natural tooth without extraction.

5. **Periodontal (Gum) Treatment** — ₦15,000. Deep cleaning techniques like scaling and root planing remove deep-seated bacteria below the gum line, promoting tissue reattachment and gum health.

6. **Crowns and Bridges** — ₦12,000. Crowns encase and strengthen a single compromised tooth; bridges span gaps from missing teeth, mimicking natural dentition.

7. **Professional Teeth Whitening** — ₦20,000. High-concentration bleaching agents with advanced light technology safely erase deep stains, delivering several shades brighter results in one session.

When discussing prices, present them naturally. Patients can pre-pay online after booking via the website.

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
