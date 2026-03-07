import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaystackButtonProps {
  email: string;
  name: string;
  appointmentId: string;
  amount?: number;
  onSuccess?: () => void;
  onClose?: () => void;
}

const PaystackButton = ({ email, name, appointmentId, amount = 500000, onSuccess, onClose }: PaystackButtonProps) => {
  const { toast } = useToast();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    // Load Paystack V2 script
    const existingScript = document.querySelector('script[src="https://js.paystack.co/v2/inline.js"]');
    if (existingScript) {
      if ((window as any).PaystackPop) {
        setScriptReady(true);
      } else {
        existingScript.addEventListener("load", () => setScriptReady(true));
      }
    } else {
      // Remove old V1 script if present
      const oldScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
      if (oldScript) oldScript.remove();

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v2/inline.js";
      script.async = true;
      script.onload = () => setScriptReady(true);
      script.onerror = () => {
        toast({ title: "Failed to load payment system", variant: "destructive" });
      };
      document.head.appendChild(script);
    }

    // Fetch public key
    supabase.functions.invoke("paystack-key").then(({ data, error }) => {
      if (error) {
        console.error("Failed to fetch Paystack key:", error);
        return;
      }
      if (data?.key) setPublicKey(data.key);
    });
  }, []);

  const pay = useCallback(() => {
    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) {
      toast({ title: "Payment system still loading", description: "Please wait a moment and try again." });
      return;
    }
    if (!publicKey) {
      toast({ title: "Payment not ready", description: "Please wait a moment and try again." });
      return;
    }

    setPaying(true);

    try {
      const popup = new PaystackPop();
      popup.newTransaction({
        key: publicKey,
        email,
        amount,
        currency: "NGN",
        channels: ["card"],
        ref: `drsamuel_${appointmentId}_${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "Patient", variable_name: "patient_name", value: name },
          ],
        },
        onSuccess: async (transaction: { reference: string }) => {
          try {
            const { error } = await supabase.from("payment_records").insert({
              appointment_id: appointmentId,
              payer_name: name,
              paystack_reference: transaction.reference,
              amount: amount / 100,
              status: "success",
            });
            if (!error) {
              await supabase.from("appointments").update({ payment_status: "paid" }).eq("id", appointmentId);
            }
            toast({ title: "Payment Successful! 🎉", description: `Reference: ${transaction.reference}` });
            onSuccess?.();
          } catch (err) {
            console.error("Payment record error:", err);
          }
          setPaying(false);
        },
        onCancel: () => {
          toast({ title: "Payment cancelled", variant: "destructive" });
          setPaying(false);
          onClose?.();
        },
      });
    } catch (err) {
      console.error("Paystack error:", err);
      toast({ title: "Payment error", description: "Could not open payment window. Please try again.", variant: "destructive" });
      setPaying(false);
    }
  }, [publicKey, email, amount, appointmentId, name, onSuccess, onClose, toast]);

  const isReady = scriptReady && !!publicKey;

  return (
    <button
      type="button"
      onClick={pay}
      disabled={!isReady || paying}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
    >
      {paying ? "Processing..." : !isReady ? "Loading payment..." : `💳 Pay ₦${(amount / 100).toLocaleString()} Consultation Fee`}
    </button>
  );
};

export default PaystackButton;
