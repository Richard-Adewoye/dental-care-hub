import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const AppointmentForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate save — will connect to Supabase later
    await new Promise(r => setTimeout(r, 800));
    toast({ title: "Appointment Booked!", description: `Thank you ${form.name}, your appointment is set for ${form.date} at ${form.time}.` });
    setForm({ name: "", phone: "", date: "", time: "" });
    setLoading(false);
  };

  return (
    <section id="appointment" className="relative -mt-8 z-10">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="dental-gradient rounded-2xl p-6 md:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Full Name</label>
            <Input
              placeholder="John Doe"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Phone Number</label>
            <Input
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Preferred Date</label>
            <div className="relative">
              <Input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-primary-foreground/80">Preferred Time</label>
            <select
              value={form.time}
              onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              className="flex h-10 w-full rounded-md border bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground px-3 py-2 text-sm"
            >
              <option value="" className="text-foreground">Select Time</option>
              {timeSlots.map(t => (
                <option key={t} value={t} className="text-foreground">{t}</option>
              ))}
            </select>
          </div>
          <Button
            type="submit"
            disabled={loading}
            variant="secondary"
            size="lg"
            className="font-semibold"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AppointmentForm;
