export type Project = {
  title: string;
  category: "Web Apps" | "Data Projects" | "Mobile Apps" | "Desktop Apps" | "Console Apps";
  description: string;
  image: string;
  icon: string;
  link?: string;
  tags: string[];
  features?: string[];
};
