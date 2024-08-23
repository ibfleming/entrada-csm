import {
  DashboardIcon,
  PersonIcon,
  Pencil1Icon,
  HomeIcon,
  GlobeIcon,
  CubeIcon,
} from "@radix-ui/react-icons";
import { type IconProps } from "@radix-ui/react-icons/dist/types";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

export type NavSubItem = {
  name: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  link: string;
};

export type NavItem = {
  name: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  link: string;
  submenu?: NavSubItem[];
};

export const navItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    link: "/",
    submenu: [
      {
        name: "My Dashboard",
        link: "/",
      },
      {
        name: "Leasing Center",
        link: "/",
      },
    ],
  },
  {
    name: "Residents",
    icon: HomeIcon,
    link: "/residents",
    submenu: [
      {
        name: "All Residents",
        icon: undefined,
        link: "/",
      },
      {
        name: "Unit Assigmnents",
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
    icon: Pencil1Icon,
    link: "/applicants",
  },
  {
    name: "Leads",
    icon: PersonIcon,
    link: "/leads",
  },
  {
    name: "Tools",
    icon: CubeIcon,
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
    icon: GlobeIcon,
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
