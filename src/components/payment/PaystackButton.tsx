import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

interface PaystackButtonProps {
  email: string;
  name: string;
  appointmentId: string;
  amount?: number; // in kobo, default 500000 (₦5,000)
  onSuccess?: () => void;
  onClose?: () => void;
}

const PaystackButton = ({ email, name, appointmentId, amount = 500000, onSuccess, onClose }: PaystackButtonProps) => {
  const { toast } = useToast();
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    if (document.querySelector('script[src*="paystack"]')) {
      scriptLoaded.current = true;
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => { scriptLoaded.current = true; };
    document.body.appendChild(script);
  }, []);

  const pay = () => {
    if (!window.PaystackPop) {
      toast({ title: "Payment system loading...", description: "Please try again in a moment." });
      return;
    }
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount,
      currency: "NGN",
      ref: `drsamuel_${appointmentId}_${Date.now()}`,
      metadata: { custom_fields: [{ display_name: "Patient", variable_name: "patient_name", value: name }] },
      callback: async (response: { reference: string }) => {
        const { error } = await supabase.from("payment_records").insert({
          appointment_id: appointmentId,
          payer_name: name,
          paystack_reference: response.reference,
          amount: amount / 100,
          status: "success",
        });
        if (!error) {
          await supabase.from("appointments").update({ payment_status: "paid" }).eq("id", appointmentId);
        }
        toast({ title: "Payment Successful! 🎉", description: `Reference: ${response.reference}` });
        onSuccess?.();
      },
      onClose: () => {
        toast({ title: "Payment cancelled", variant: "destructive" });
        onClose?.();
      },
    });
    handler.openIframe();
  };

  return (
    <button
      onClick={pay}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[hsl(var(--dental-gold))] text-foreground font-semibold hover:opacity-90 transition-opacity text-sm"
    >
      💳 Pay ₦{(amount / 100).toLocaleString()} Consultation Fee
    </button>
  );
};

export default PaystackButton;
