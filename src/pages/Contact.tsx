import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      subject: form.subject || null,
      message: form.message,
    });
    if (error) {
      toast({ title: "Failed to send", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  const whatsappUrl = "https://wa.me/2348108155239?text=" + encodeURIComponent("Hello! I'd like to inquire about dental services at Exceptional Dental Care.");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact Us</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Have a question or need to book an appointment? Reach out to us.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Name *</label>
                  <Input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input placeholder="How can we help?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Message *</label>
                <Textarea placeholder="Your message..." rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <h3 className="font-bold text-card-foreground">Clinic Information</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +234 810 815 5239</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> samawosolu@yahoo.co.uk</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Jos, Nigeria</p>
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Mon - Fri: 8AM - 6PM</p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-whatsapp text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-6 h-6" />
                <div>
                  <p className="font-bold">Chat with us on WhatsApp</p>
                  <p className="text-xs opacity-80">Quick responses, always available</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
