import { GoHome as ResidentsIcon } from "react-icons/go";
import { HiOutlinePencilSquare as ApplicantsIcon } from "react-icons/hi2";
import { LiaToolsSolid as ToolsIcon } from "react-icons/lia";
import { MdOutlineSpaceDashboard as DashboardIcon } from "react-icons/md";
import {
  TbReportSearch as DataReportsIcon,
  TbUsers as LeadsIcon,
} from "react-icons/tb";
import { type IconType } from "react-icons/lib";
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

export type NavSubItem = {
  name: string;
  icon: Icon;
  link: string;
};

export type NavItem = {
  name: string;
  icon: IconType;
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
    icon: ResidentsIcon,
    link: "/residents",
    submenu: [
      {
        name: "All Residents",
        icon: IconUsers,
        link: "/",
      },
      {
        name: "Assign Units",
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
    icon: ApplicantsIcon,
    link: "/applicants",
  },
  {
    name: "Leads",
    icon: LeadsIcon,
    link: "/leads",
  },
  {
    name: "Tools",
    icon: ToolsIcon,
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
    icon: DataReportsIcon,
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
