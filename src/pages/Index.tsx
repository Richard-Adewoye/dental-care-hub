import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AppointmentForm from "@/components/sections/AppointmentForm";
import AboutUs from "@/components/sections/AboutUs";
import ServiceRibbon from "@/components/sections/ServiceRibbon";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DedicatedCare from "@/components/sections/DedicatedCare";
import Testimonials from "@/components/sections/Testimonials";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <Hero />
      <AppointmentForm />
      <AboutUs />
      <ServiceRibbon />
      <DedicatedCare />
      <Services />
      <Testimonials />
      <ServiceRibbon />
      <WhyChooseUs />
    </main>
    <Footer />
  </div>
);

export default Index;
