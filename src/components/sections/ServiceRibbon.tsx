const services = [
  "Extractions",
  "Fillings",
  "Root Canal",
  "Tooth Whitening",
  "Pulp Treatment",
  "Dentures",
  "Fluoride",
  "Fissure Sealants",
  "Sensitive Teeth",
  "Alignments",
  "Crowns & Bridges",
  "Veneers",
  "Mouthguards",
  "Geriatric Care",
];

const ServiceRibbon = () => (
  <div className="bg-primary py-3 overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...services, ...services].map((s, i) => (
        <span key={i} className="mx-6 text-sm font-medium text-primary-foreground flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C9.5 2 7.5 3 7 5C6.5 7 5 8 4 10C3 12 3 14 4 16C5 18 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 19 18 20 16C21 14 21 12 20 10C19 8 17.5 7 17 5C16.5 3 14.5 2 12 2Z" fill="currentColor" opacity="0.5"/>
          </svg>
          {s}
        </span>
      ))}
    </div>
  </div>
);

export default ServiceRibbon;
