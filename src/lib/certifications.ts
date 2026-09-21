// lib/certifications.ts
export type Certificate = {
  title: string;
  org: string;
  pdf: string;     // chemin PDF public
  thumb: string;   // vignette jpg/png
};

export const CERTS: Certificate[] = [
  {
    title: "Advanced Spring Cloud Microservices & Deployment with Docker",
    org: "packt",
    pdf: "/certs/MS.pdf",
    thumb: "/certs/MS.jpg",
  },
  {
    title: "Machine Learning with Python",
    org: "IBM",
    pdf: "/certs/ML.pdf",
    thumb: "/certs/ML.jpg",
  },
  {
    title: "Virtual Networks in Azure",
    org: "WHIZLABS",
    pdf: "/certs/Azure.pdf",
    thumb: "/certs/Azure.jpg",
  },
  {
    title: "Intro to Containers w/ Docker, K8s & OpenShift",
    org: "IBM",
    pdf: "/certs/Docker.pdf",
    thumb: "/certs/Docker.jpg",
  },
  {
    title: "Introduction to Git and GitHub",
    org: "Google",
    pdf: "/certs/Git.pdf",
    thumb: "/certs/Git.jpg",
  },
  {
    title: "Introduction à la POO en (C++)",
    org: "EPFL",
    pdf: "/certs/C++.pdf",
    thumb: "/certs/C++.jpg",
  },
  {
    title: "Introduction to CSS3",
    org: "University of Michigan",
    pdf: "/certs/CSS.pdf",
    thumb: "/certs/CSS.jpg",
  },
  {
    title: "Software Engineering: Software Design and Project Management",
    org: "The hong kong university of science and technology",
    pdf: "/certs/GP.pdf",
    thumb: "/certs/GP.jpg",
  },
  {
    title: "HTML, CSS, and Javascript for Web Developers",
    org: "Johns Hopkins University",
    pdf: "/certs/HTML_CSS_JS.pdf",
    thumb: "/certs/HTML_CSS_JS.jpg",
  },
  {
    title: "Introduction to HTML5",
    org: "University of Michigan",
    pdf: "/certs/HTML.pdf",
    thumb: "/certs/HTML.jpg",
  },
  {
    title: "Introduction to Java and OOP",
    org: "University of Pennsylvania",
    pdf: "/certs/Java.pdf",
    thumb: "/certs/Java.jpg",
  },
  {
    title: "Interactivity with JavaScript",
    org: "University of Michigan",
    pdf: "/certs/JS.pdf",
    thumb: "/certs/JS.jpg",
  },
  {
    title: "React Native",
    org: "Meta",
    pdf: "/certs/Meta.pdf",
    thumb: "/certs/Meta.jpg",
  },
  {
    title: "Programming for Everybody (Getting Started with Python)",
    org: "University of Michigan",
    pdf: "/certs/Python.pdf",
    thumb: "/certs/Python.jpg",
  },
  {
    title: "React Basics",
    org: "Meta",
    pdf: "/certs/React.pdf",
    thumb: "/certs/React.jpg",
  },
  {
    title: "The Structured Query Language (SQL)",
    org: "University of Colorado Boulder",
    pdf: "/certs/SQL.pdf",
    thumb: "/certs/SQL.jpg",
  },
  {
    title: "The Unix  Workbench",
    org: "Johns Hopkins University",
    pdf: "/certs/Unix.pdf",
    thumb: "/certs/Unix.jpg",
  },
    {
    title: "La recherche documentaire",
    org: "Institut Polytechnique de Paris",
    pdf: "/certs/recherche.pdf",
    thumb: "/certs/recherche.jpg",
  },
    {
    title: "The Arduino Platform and C Programming",
    org: "UC Irvine",
    pdf: "/certs/Arduino.pdf",
    thumb: "/certs/Arduino.jpg",
  },
  {
    title: "Honoris 21st Century Soft Skills Certificate",
    org: "Honoris Online Academy",
    pdf: "/certs/Honoris.pdf",
    thumb: "/certs/Honoris.jpg",
  },
  
];
