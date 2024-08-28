"use client";

import Link from "next/link";
import { type NavItem, type NavSubItem, navItems } from "~/data/navItems";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "../styles/nav.css";

interface MenuItemProps {
  item: NavItem;
  pathname: string;
  showDropdown: string | null;
  setShowDropdown: (itemName: string | null) => void;
}

const MenuItem = ({
  item,
  pathname,
  showDropdown,
  setShowDropdown,
}: MenuItemProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = () => {
    setShowDropdown(item.name);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  const handleSubmenuMouseEnter = () => {
    setShowDropdown(showDropdown);
  };

  useEffect(() => {
    if (showDropdown === item.name) {
      dropdownRef.current &&
        (dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`);
    } else if (dropdownRef.current) {
      dropdownRef.current.style.maxHeight = "0";
    }
  }, [showDropdown, item.name]);

  return (
    <li className={`item ${pathname === item.link ? "active" : ""}`}>
      <Link
        className={`link ${item.submenu ? "" : "pr-5"} ${showDropdown === item.name ? "active" : ""}`}
        href={item.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
      >
        {item.icon && <item.icon size="1.5em" />}
        {item.name}
        {item.submenu ? <CaretDownIcon className="arrow" /> : null}
      </Link>
      {item.submenu && showDropdown === item.name && (
        <ul
          ref={dropdownRef}
          className="wrapper"
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleSubmenuMouseEnter}
        >
          <div className="content">
            {item.submenu?.map((subitem: NavSubItem, index: number) => (
              <li className="subitem" key={index}>
                <Link className="sublink" href={subitem.link}>
                  {subitem.icon && <subitem.icon preserveAspectRatio="true" />}
                  {subitem.name}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      )}
    </li>
  );
};

export default function Navigation(props: { children: React.ReactNode }) {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      <nav className="nav">
        <ul className="menu">
          {navItems.map((item: NavItem, index: number) => (
            <MenuItem
              key={index}
              item={item}
              pathname={pathname}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            />
          ))}
        </ul>
      </nav>
      {props.children}
    </>
  );
}
