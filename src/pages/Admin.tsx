import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Lock, Mail, CalendarDays, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogEditor from "@/components/admin/BlogEditor";
import BlogList from "@/components/admin/BlogList";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  payment_status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const ADMIN_NAME = "admin";
const ADMIN_PASSWORD = "DrSamuel2024";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [creatingPost, setCreatingPost] = useState(false);

  const handleLogin = () => {
    if (loginName === ADMIN_NAME && loginPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchData = async () => {
      const [apptRes, msgRes, blogRes] = await Promise.all([
        supabase.from("appointments").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      ]);
      if (apptRes.data) setAppointments(apptRes.data);
      if (msgRes.data) setMessages(msgRes.data);
      if (blogRes.data) setBlogPosts(blogRes.data as any);
      setLoading(false);
    };
    fetchData();

    const channel = supabase
      .channel("admin-all")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => {
        supabase.from("appointments").select("*").order("created_at", { ascending: false }).then(({ data }) => {
          if (data) setAppointments(data);
        });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_messages" }, () => {
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => {
          if (data) setMessages(data);
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [authenticated]);

  const filteredAppointments = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.preferred_date.includes(search)
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-muted/30">
          <div className="w-full max-w-sm space-y-6 p-8 bg-card rounded-2xl shadow-lg border border-border">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
              <p className="text-sm text-muted-foreground">Enter credentials to access the dashboard</p>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Username"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              {loginError && <p className="text-sm text-destructive">{loginError}</p>}
              <Button className="w-full" onClick={handleLogin}>
                Sign In
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">View appointments and contact messages</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments" className="gap-2">
              <CalendarDays className="w-4 h-4" /> Appointments ({appointments.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <Mail className="w-4 h-4" /> Messages ({messages.length})
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <FileText className="w-4 h-4" /> Blog ({blogPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            {loading ? (
              <p className="text-muted-foreground text-center py-20">Loading...</p>
            ) : filteredAppointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-20">No appointments found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Patient</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Phone</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Time</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Payment</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Booked At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAppointments.map((a) => (
                      <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{a.phone}</td>
                        <td className="px-4 py-3 text-muted-foreground">{a.preferred_date}</td>
                        <td className="px-4 py-3 text-muted-foreground">{a.preferred_time}</td>
                        <td className="px-4 py-3">
                          <Badge variant={a.payment_status === "paid" ? "default" : "secondary"}>
                            {a.payment_status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {new Date(a.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              Total: {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? "s" : ""}
            </p>
          </TabsContent>

          <TabsContent value="messages">
            {loading ? (
              <p className="text-muted-foreground text-center py-20">Loading...</p>
            ) : filteredMessages.length === 0 ? (
              <p className="text-muted-foreground text-center py-20">No messages found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subject</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Message</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredMessages.map((m) => (
                      <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{m.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.subject || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{m.message}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {new Date(m.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              Total: {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
            </p>
          </TabsContent>

          <TabsContent value="blog">
            {editingPost || creatingPost ? (
              <BlogEditor
                post={editingPost || undefined}
                onSaved={() => {
                  setEditingPost(null);
                  setCreatingPost(false);
                  supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).then(({ data }) => {
                    if (data) setBlogPosts(data as any);
                  });
                }}
                onCancel={() => {
                  setEditingPost(null);
                  setCreatingPost(false);
                }}
              />
            ) : (
              <BlogList
                posts={blogPosts}
                search={search}
                loading={loading}
                onEdit={(post) => setEditingPost(post)}
                onNew={() => setCreatingPost(true)}
                onRefresh={() => {
                  supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).then(({ data }) => {
                    if (data) setBlogPosts(data as any);
                  });
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
