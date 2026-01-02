"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ label, href }) => {
    const pathName = usePathname();

    return (
        <Link className={`nav-link ${pathName === href ? "nav-link-active" : ""}`} href={href}>
            {label}
        </Link>
    );
};

export default NavLink;
