"use client";
import { usePathname } from "next/navigation";
import SidebarItem from "@/components/lbcoreui/SidebarItem";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: "homegreen.svg", path: "/dashboard", exact: true },
    { label: "subs", icon: "List.svg", path: "/dashboard/subs" },
    { label: "Analytics", icon: "Activity.svg", path: "/dashboard/analytics" },
    { label: "Payments", icon: "Dollar.svg", path: "/dashboard/payments" },
    { label: "Marketplace", icon: "Tag.svg", path: "/dashboard/marketplace" },
  ];

  const helpItem = { label: "Help", icon: "help.svg", path: "/dashboard/help" };

  return (
    <div className="bg-lbgreen w-28 min-h-screen">
      <nav>
        {navItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            iconName={item.icon}
            path={item.path}
            active={
              item.exact
                ? pathname === item.path
                : pathname.startsWith(item.path)
            }
          />
        ))}

        <div className="mt-16">
          <SidebarItem
            label={helpItem.label}
            iconName={helpItem.icon}
            path={helpItem.path}
            active={pathname.startsWith(helpItem.path)}
          />
        </div>
      </nav>
    </div>
  );
}
