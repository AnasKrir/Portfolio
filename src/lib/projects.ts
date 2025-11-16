import type { Project } from "./types";

export const PROJECTS: Project[] = [
  /* ...tous les objets du tableau que je t’ai donné... */

   {
    title: "GStock (Django) — Stock & Orders",
    category: "Web Apps",
    description:
      "Django app for products, orders, and stock with admin auth and responsive Bootstrap UI.",
    image: "/images/projets/gstock-django.jpg",
    icon: "🧱",
    tags: ["Python", "Django 2.2+", "SQLite", "Bootstrap 4"],
    features: [
      "Secure auth (Admin)",
      "Products & Categories CRUD",
      "Orders: draft → validated → delivered",
      "Auto stock decrement + low-stock checks",
      "Responsive templates",
    ],
    link: "https://github.com/AnasKrir/G_Stock",
  },
  {
    title: "KY-CHAT — Real-Time Rooms",
    category: "Web Apps",
    description:
      "Simple real-time chat rooms with Django, classic templates & AJAX for instant messages.",
    image: "/images/projets/kychat.jpg",
    icon: "💬",
    tags: ["Django", "SQLite", "HTML/CSS/JS", "AJAX"],
    features: [
      "Create/Join chat rooms",
      "Django auth",
      "Instant messages (AJAX)",
      "Extendable to WebSockets",
    ],
    link: "https://github.com/AnasKrir/KY-CHAT",
  },
  {
    title: "Dentopro — Dental Clinic (Swing)",
    category: "Desktop Apps",
    description:
      "Java desktop app (Swing) to manage patients, appointments, invoices and medical files.",
    image: "/images/projets/dentopro.jpg",
    icon: "🦷",
    tags: ["Java 23", "Swing", "MVC", "Maven", "Lombok"],
    features: [
      "Patients, appointments, invoices",
      "Roles (Dentist/Secretary)",
      "TXT file storage (no DB)",
      "Ready-to-run desktop app",
    ],
    link: "https://github.com/AnasKrir/DENTOPRO",
  },
  {
    title: "Bankati Web App — Banking",
    category: "Web Apps",
    description:
      "Spring Boot banking app with users, accounts, credits, roles and secure authentication.",
    image: "/images/projets/bankati.jpg",
    icon: "🏦",
    tags: ["Java 17", "Spring Boot 3.5", "JPA/Hibernate", "MySQL", "Thymeleaf", "Security"],
    features: [
      "Admin/Client auth & roles",
      "Accounts & credits management",
      "Credit history",
      "Responsive UI (Thymeleaf + CSS)",
    ],
    link: "https://github.com/AnasKrir/BANKATI",
  },
  {
    title: "HotelManagement — .NET MVC",
    category: "Web Apps",
    description:
      "Hotel management (rooms, bookings, clients, payments) with Razor + SQL Server.",
    image: "/images/projets/hotel.jpg",
    icon: "🏨",
    tags: [".NET 8 MVC", "C#", "SQL Server", "EF Core", "Docker"],
    features: [
      "Reservations & rooms",
      "Clients & services",
      "Payments + receptionist dashboard",
      "Auth & roles (WIP)",
      "Docker + SQL Server container",
    ],
    link: "https://github.com/AnasKrir/H-telLuxe",
  },
  {
    title: "TodoApp — Android (Room + MVVM)",
    category: "Mobile Apps",
    description:
      "Android app in Java with Room, LiveData and RecyclerView for smooth task management.",
    image: "/images/projets/todoapp.jpg",
    icon: "📱",
    tags: ["Java", "Android Studio", "Room", "LiveData", "MVVM"],
    features: [
      "User auth",
      "Tasks CRUD + done state",
      "Local storage (Room/SQLite)",
      "Reactive UI (LiveData)",
    ],
    link: "https://github.com/AnasKrir/TodoApp",
  },
  {
    title: "GStock (Spring Boot) — Agrofourniture",
    category: "Web Apps",
    description:
      "Spring Boot + Thymeleaf stock/clients/orders with roles, Security and cloud deploy.",
    image: "/images/projets/gstock-sb.jpg",
    icon: "📦",
    tags: [
      "Spring Boot 3.5",
      "Thymeleaf",
      "Security 6",
      "JPA",
      "MySQL (dev)",
      "PostgreSQL (prod)",
      "Docker",
    ],
    features: [
      "ADMIN & SELLER roles",
      "Products/Clients/Orders",
      "Auto stock decrement",
      "Simple reporting DTOs",
      "Render + Neon deploy",
    ],
    link: "https://github.com/AnasKrir/gstock",
  },
  {
    title: "DW-Construction — BI Dashboard",
    category: "Data Projects",
    description:
      "Data warehouse + Power BI dashboards (KPI, maps, slicers) with star schema.",
    image: "/images/projets/dw.jpg",
    icon: "📊",
    tags: ["Power BI", "DAX", "Excel ETL", "Star Schema"],
    features: [
      "Centralized construction KPIs",
      "Star schema modeling",
      "Interactive dashboards",
      "PDF/Images/.pbix export",
    ],
    link: "https://github.com/AnasKrir/dw-construction-bi",
  },
  {
    title: "Tennis Championship — C++ Console",
    category: "Console Apps",
    description:
      "Console app to register players, generate matches, track scores and final ranking.",
    image: "/images/projets/tennis.jpg",
    icon: "🎾",
    tags: ["C++17", "CLI", "g++/clang++"],
    features: ["Players management", "Random match draw", "Ranking calculation", "Clear CLI"],
    link: "https://github.com/AnasKrir/tennis-championship-cpp",
  },
];
