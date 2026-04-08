import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero banner */}
      <section className="relative pt-20 pb-12 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        <div className="container relative z-10 pt-12 pb-4 text-center space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary-foreground/60 bg-primary-foreground/10 px-4 py-1.5 rounded-full">
            Contact Us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Get In Touch</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto text-sm md:text-base">
            Have a question or need to book an appointment? Reach out to us.
          </p>
        </div>
      </section>

      <main className="flex-1 pb-16">
        {/* Contact info strip */}
        <div className="bg-accent border-b border-border">
          <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Phone, label: "Phone", value: "+234 810 815 5239" },
                { icon: Mail, label: "Email", value: "samawosolu@yahoo.co.uk" },
                { icon: MapPin, label: "Location", value: "Jos, Nigeria" },
                { icon: Clock, label: "Hours", value: "Mon - Fri: 8AM - 6PM" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-xs md:text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form + sidebar */}
        <div className="container mt-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5 p-6 md:p-8 rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Send className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-card-foreground">Send Us a Message</h2>
              </div>

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
              <Button type="submit" size="lg" disabled={loading} className="gap-2">
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-primary text-primary-foreground space-y-4">
                <h3 className="font-bold text-lg">Visit Our Clinic</h3>
                <p className="text-sm text-primary-foreground/70">
                  We'd love to see you in person. Walk in or book an appointment — our team is ready to give you the best dental care experience.
                </p>
                <div className="space-y-3 text-sm text-primary-foreground/80">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-foreground/60" /> Jos, Nigeria</p>
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-foreground/60" /> Mon - Fri: 8AM - 6PM</p>
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
                  <p className="font-bold">Chat on WhatsApp</p>
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
