import type { CompanyProfileContent } from "./schema";

export const companyProfileDefaultContent: CompanyProfileContent = {
  published: true,
  companyName: "Northline Advisory",
  companyTagline: "Practical strategy for companies entering their next chapter.",
  companyDescription: "Northline Advisory helps growing organizations sharpen operations, improve customer trust, and deliver complex projects with calm execution.",
  logoUrl: "",
  heroImage: "",
  heroImageAlt: "Professional company profile overview",
  services: [
    { title: "Business transformation", description: "Align leadership, operating model, and delivery rhythm before scale creates avoidable drag." },
    { title: "Operational planning", description: "Turn broad goals into accountable workstreams, milestones, and decision points." },
    { title: "Digital delivery", description: "Guide product, engineering, and stakeholder teams through practical execution." },
    { title: "Customer experience", description: "Map service journeys and remove the friction that weakens trust." }
  ],
  projects: [
    {
      name: "Regional bank service redesign",
      type: "Customer trust",
      challenge: "High-volume branch and digital handoffs created inconsistent customer ownership.",
      approach: "Mapped the service journey and clarified escalation paths for frontline teams.",
      result: "Clearer service ownership"
    },
    {
      name: "Manufacturing operations playbook",
      type: "Operating model",
      challenge: "Planning, escalation, and delivery routines varied across sites.",
      approach: "Documented repeatable rhythms and decision checkpoints for operating leaders.",
      result: "Faster team alignment"
    },
    {
      name: "Public-sector digital roadmap",
      type: "Digital delivery",
      challenge: "A complex program needed sequencing before funding and stakeholder approval.",
      approach: "Grouped initiatives into fundable phases with measurable delivery outcomes.",
      result: "Decision-ready roadmap"
    }
  ],
  stats: [
    { label: "Engagement model", value: "Senior-led" },
    { label: "Delivery style", value: "Milestone-based" },
    { label: "Focus", value: "Durable change" }
  ],
  sectors: ["Financial services", "Manufacturing", "Public sector", "Digital operations"],
  teamMembers: [
    { name: "Amelia Hart", role: "Managing Partner", bio: "Leads strategy, operating model, and executive alignment work." },
    { name: "Dimas Pratama", role: "Delivery Lead", bio: "Turns complex programs into clear delivery rhythms and checkpoints." },
    { name: "Sarah Kim", role: "Client Strategy", bio: "Connects customer insight, service design, and measurable outcomes." }
  ],
  valuesIntro: "The operating principles below keep the company credible when projects become complex.",
  values: ["Clarity before scale", "Trust through delivery", "Measured, durable progress"],
  contactInfo: "partners@example.com",
  seoTitle: "Professional Company Profile",
  seoDescription: "A trustworthy company profile website with CMS, admin dashboard, Firebase, and theme settings."
};
