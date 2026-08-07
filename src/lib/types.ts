export type Project = {
  title: string;
  category: "Web Apps" | "Data Projects" | "Mobile Apps" | "Desktop Apps" | "Console Apps" | "Data & AI";
  description: string;
  image: string;
  icon: string;
  link?: string;
  tags: string[];
  features?: string[];
};
