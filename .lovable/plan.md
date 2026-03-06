

# Dr Samuel's Dental Clinic — Implementation Plan

## Design Analysis

The mockup shows a blue (#3B5FE6-ish) and white themed dental website with:
- Top info bar (phone, email, address, socials)
- Navigation header with logo + links + "Book Now" CTA
- Hero section with headline, subtext, CTA buttons, and dentist image
- Inline appointment booking form (Name, Phone, Date, Time)
- About Us section with image + bullet points
- Scrolling service category ribbon
- Services grid (3 cards with images and icons)
- Why Choose Us section (partially visible)
- Footer

Branding will be **"Dr Samuel's Dental Clinic"** instead of "Dental."

## Architecture

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          (top bar + nav)
│   │   ├── Footer.tsx
│   │   └── LoadingScreen.tsx   (session-based splash)
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── AboutUs.tsx
│   │   ├── ServiceRibbon.tsx   (scrolling marquee)
│   │   ├── Services.tsx
│   │   └── WhyChooseUs.tsx
│   ├── chat/
│   │   ├── ChatButton.tsx      (floating + pulse animation)
│   │   └── ChatModal.tsx
│   └── payment/
│       └── PaystackButton.tsx
├── pages/
│   ├── Index.tsx               (single-page home)
│   ├── Contact.tsx             (contact form + WhatsApp)
│   ├── Admin.tsx               (login + dashboard)
│   └── NotFound.tsx
├── hooks/
│   └── useSessionLoading.ts
└── lib/
    └── utils.ts
```

## Implementation Phases

### Phase 1: Foundation & Loading Screen
- Update color theme to match design (primary blue ~`230 80% 56%`, white background)
- Create `LoadingScreen` component with the clinic logo and a fade-out animation
- Use `sessionStorage` to track if loading has already been shown this session
- Set up routes: `/`, `/contact`, `/admin`

### Phase 2: Layout (Header + Footer)
- **Top info bar**: phone, email, address on left; social icons on right; dark bg
- **Navigation**: Logo "Dr Samuel's" + tooth icon, nav links (Home, Services, About Us, Why Choose Us as smooth-scroll anchors; Contact Us as `/contact` link), "Book Now" button
- **Mobile**: Hamburger menu with sheet/drawer
- **Footer**: Multi-column with address, hours, quick links, social icons

### Phase 3: Hero Section
- Split layout: left side with "Top-Notch Dental Care" tag, headline "Your Best Dental Experience Awaits", paragraph, two CTAs ("Explore Our Services" button + "Watch Video" text link)
- Right side: dentist image (placeholder stock photo) with blue decorative shape behind
- Responsive: stack on mobile

### Phase 4: Appointment Booking Form
- Horizontal inline form bar below hero: Name, Phone Number, Preferred Date (date picker), Preferred Time (time select), "Book an Appointment" button
- Client-side validation with react-hook-form + zod
- On submit: save to Supabase `appointments` table, show toast confirmation
- Stacks vertically on mobile

### Phase 5: About Us Section
- Two-column: image on left (with logo overlay badge), content on right
- "ABOUT US" label, "15 Years of Expertise in Dental Care" headline
- 3 bullet points with blue check icons
- "Learn More" button

### Phase 6: Service Ribbon + Services Grid
- **Ribbon**: Auto-scrolling horizontal marquee with tooth icons + service names (General Dentistry, Teeth Whitening, Dental Implant, Dental Sealant). Appears above and below Services section
- **Services section**: "OUR SERVICES" label, headline, "Explore All Services" button
- 3 cards: image at top, blue circle icon overlay, title, description, "Learn more →" link

### Phase 7: Why Choose Us
- Design a section matching the blue/white theme
- 4 benefit cards in a grid: Experienced Staff, Advanced Technology, Personalized Care, Affordable Pricing
- Each with an icon, title, and short description

### Phase 8: Contact Page
- Clean form: Name, Email, Subject, Message textarea
- Form saves to Supabase `contact_messages` table
- WhatsApp button with green styling and WhatsApp icon, linking to `https://wa.me/PLACEHOLDER`
- Clinic info sidebar (address, phone, hours, map placeholder)

### Phase 9: Supabase Integration (Database)
Tables needed:
- `appointments` (id, name, phone, preferred_date, preferred_time, payment_status, created_at)
- `contact_messages` (id, name, email, subject, message, created_at)
- `payment_records` (id, appointment_id, payer_name, paystack_reference, amount, status, created_at)

### Phase 10: Admin Dashboard
- Login page with Supabase auth (email/password)
- Protected route checking auth state
- Dashboard with tabs: Appointments, Payments, Contact Messages
- Data tables with search/filter by name
- Uses Supabase RLS + user_roles table for admin access

### Phase 11: Paystack Payment
- After appointment booking success, show option to "Pre-pay Consultation Fee"
- Paystack inline popup integration using their JS library
- Record transaction in `payment_records` table
- Show payment status in admin dashboard

### Phase 12: AI Chatbot (Groq)
- Floating action button in bottom-right with pulsing wave animation (CSS keyframes)
- Click opens modal chat interface
- Powered by Groq API via Supabase Edge Function
- Pre-configured system prompt with clinic info (services, hours, location, FAQs)
- Maintains conversation context during session

## Technical Notes
- Smooth scrolling via `scroll-behavior: smooth` on html + `scrollIntoView` on nav clicks
- All images will use high-quality placeholder/stock dental images from public URLs initially
- The loading screen checks `sessionStorage.getItem('hasLoaded')` — only shows animation on first visit per session
- Paystack and Groq API keys will be stored as Supabase secrets / edge function env vars
- Mobile-first responsive design throughout

