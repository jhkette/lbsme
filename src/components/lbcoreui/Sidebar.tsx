
"use client";
import { usePathname } from "next/navigation";
import SidebarItem from "@/components/lbcoreui/SidebarItem";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: "homegreen.svg", path: "/dashboard" },
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
           active={pathname === item.path}
          />
        ))}
      {/* seperate from the main map loop as this needs to appear lower in the ui of the
      sider */}
        <div className="mt-16">
          <SidebarItem
            label={helpItem.label}
            iconName={helpItem.icon}
            active={pathname === helpItem.path}
          />
        </div>
      </nav>
    </div>
  );
}