import { type LucideIcon } from "lucide-react";

export type NavSubItem = {
  name: string;
  icon?: LucideIcon;
  link: string;
};

export type NavItem = {
  name: string;
  icon?: LucideIcon;
  link: string;
  submenu?: NavSubItem[];
};

export const navItems = [
  {
    name: "Dashboard",
    icon: undefined,
    link: "/",
    submenu: [
      {
        name: "My Dashboard",
        icon: undefined,
        link: "/",
      },
      {
        name: "Leasing Center",
        icon: undefined,
        link: "/",
      },
    ],
  },
  {
    name: "Residents",
    icon: undefined,
    link: "/residents",
    submenu: [
      {
        name: "All Residents",
        icon: undefined,
        link: "/",
      },
      {
        name: "Assign Units",
        icon: undefined,
        link: "/",
      },
      {
        name: "Maintenance",
        icon: undefined,
        link: "/",
      },
      {
        name: "Renewals",
        icon: undefined,
        link: "/",
      },
      {
        name: "Packages",
        icon: undefined,
        link: "/",
      },
      {
        name: "Community",
        icon: undefined,
        link: "/",
      },
    ],
  },
  {
    name: "Applicants",
    icon: undefined,
    link: "/applicants",
  },
  {
    name: "Leads",
    icon: undefined,
    link: "/leads",
  },
  {
    name: "Tools",
    icon: undefined,
    link: "/tools",
    submenu: [
      {
        name: "Call Tracker Logs",
        icon: undefined,
        link: "/",
      },
      {
        name: "Marketing Hub",
        icon: undefined,
        link: "/",
      },
    ],
  },
  {
    name: "Data & Reports",
    icon: undefined,
    link: "/reports",
    submenu: [
      {
        name: "Reporting",
        icon: undefined,
        link: "/",
      },
    ],
  },
];
