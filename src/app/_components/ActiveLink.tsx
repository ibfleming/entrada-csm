"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type PropsWithChildren } from "react";

const getLinkUrl = (href: LinkProps["href"], as?: LinkProps["as"]): string => {
  // Dynamic route will be matched via props.as
  // Static route will be matched via props.href
  if (as) return JSON.stringify(as);
  return JSON.stringify(href);
};

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
};

export const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const pathname = usePathname();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    if (pathname) {
      const linkUrl = getLinkUrl(props.href, props.as);

      const linkPathname = new URL(linkUrl, location.href).pathname;
      const activePathname = new URL(pathname, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    pathname,
    props.href,
    props.as,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};
