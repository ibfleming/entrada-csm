import {
  DashboardIcon,
  PersonIcon,
  Pencil1Icon,
  HomeIcon,
  GlobeIcon,
  CubeIcon,
} from "@radix-ui/react-icons";
import { type IconProps } from "@radix-ui/react-icons/dist/types";
import {
  type Icon,
  IconBuildingCommunity,
  IconBuildingStore,
  IconContract,
  IconHammer,
  IconHomeEdit,
  IconLayoutDashboard,
  IconLogs,
  IconPackage,
  IconRecycle,
  IconReport,
  IconUsers,
} from "@tabler/icons-react";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

export type NavSubItem = {
  name: string;
  icon?: Icon;
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
    icon: undefined,
    link: "/",
    submenu: [
      {
        name: "My Dashboard",
        icon: IconLayoutDashboard,
        link: "/",
      },
      {
        name: "Leasing Center",
        icon: IconContract,
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
        icon: IconUsers,
        link: "/",
      },
      {
        name: "Unit Assigmnents",
        icon: IconHomeEdit,
        link: "/",
      },
      {
        name: "Maintenance",
        icon: IconHammer,
        link: "/",
      },
      {
        name: "Renewals",
        icon: IconRecycle,
        link: "/",
      },
      {
        name: "Packages",
        icon: IconPackage,
        link: "/",
      },
      {
        name: "Community",
        icon: IconBuildingCommunity,
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
        icon: IconLogs,
        link: "/",
      },
      {
        name: "Marketing Hub",
        icon: IconBuildingStore,
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
        icon: IconReport,
        link: "/",
      },
    ],
  },
];
