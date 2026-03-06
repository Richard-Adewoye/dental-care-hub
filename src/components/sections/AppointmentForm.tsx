import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PaystackButton from "@/components/payment/PaystackButton";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const AppointmentForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState<{ id: string; name: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from("appointments").insert({
      name: form.name,
      phone: form.phone,
      preferred_date: form.date,
      preferred_time: form.time,
    }).select("id").single();

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Appointment Booked!", description: `Thank you ${form.name}, your appointment is set for ${form.date} at ${form.time}.` });
      setBooked({ id: data.id, name: form.name });
    }
    setLoading(false);
  };

  if (booked) {
    return (
      <section id="appointment" className="relative -mt-8 z-10">
        <div className="container">
          <div className="dental-gradient rounded-2xl p-6 md:p-8 shadow-2xl text-center space-y-4">
            <h3 className="text-xl font-bold text-primary-foreground">✅ Appointment Booked!</h3>
            <p className="text-primary-foreground/80 text-sm">Would you like to pre-pay the consultation fee?</p>
            <div className="flex items-center justify-center gap-4">
              <PaystackButton
                email={form.email || "patient@drsamueldental.com"}
                name={booked.name}
                appointmentId={booked.id}
                onSuccess={() => setBooked(null)}
              />
              <Button variant="secondary" onClick={() => { setBooked(null); setForm({ name: "", phone: "", email: "", date: "", time: "" }); }}>
                Skip for now
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="relative -mt-8 z-10">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="dental-gradient rounded-2xl p-6 md:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Full Name</label>
            <Input placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Phone Number</label>
            <Input placeholder="+234 800 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Preferred Date</label>
            <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Preferred Time</label>
            <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="flex h-10 w-full rounded-md border bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground px-3 py-2 text-sm">
              <option value="" className="text-foreground">Select Time</option>
              {timeSlots.map(t => <option key={t} value={t} className="text-foreground">{t}</option>)}
            </select>
          </div>
          <Button type="submit" disabled={loading} variant="secondary" size="lg" className="font-semibold">
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AppointmentForm;
