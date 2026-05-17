import type { CompanyProfileContent } from "./schema";

export const companyProfileDefaultContent: CompanyProfileContent = {
  published: true,
  companyName: "Northline Advisory",
  companyTagline: "Practical strategy for companies entering their next chapter.",
  companyDescription: "Northline Advisory helps growing organizations sharpen operations, improve customer trust, and deliver complex projects with calm execution.",
  logoUrl: "",
  heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  services: ["Business transformation", "Operational planning", "Digital delivery", "Customer experience"],
  projects: ["Regional bank service redesign", "Manufacturing operations playbook", "Public-sector digital roadmap"],
  teamMembers: [
    { name: "Amelia Hart", role: "Managing Partner" },
    { name: "Dimas Pratama", role: "Delivery Lead" },
    { name: "Sarah Kim", role: "Client Strategy" }
  ],
  values: ["Clarity before scale", "Trust through delivery", "Measured, durable progress"],
  contactInfo: "partners@example.com",
  seoTitle: "Professional Company Profile",
  seoDescription: "A trustworthy company profile website with CMS, admin dashboard, Firebase, and theme settings."
};
