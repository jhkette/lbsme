"use client";

import SidebarItem from "@/components/lbcoreui/SidebarItem";
export default function Sidebar() {
  return (
    <div className="bg-lbgreen w-28 min-h-screen flex flex-col min-h-screen">
      <nav>
        <ul className="flex flex-col h-full justify-between">
          <div>
          <SidebarItem
            iconName="homegreen.svg"
            label="Home"/>
           <SidebarItem
            iconName="List.svg"
            label="subs"/>
            <SidebarItem
            iconName="Activity.svg"
            label="Analytics"/>
             <SidebarItem
            iconName="Dollar.svg"
            label="Payments"/>

            <SidebarItem
            iconName="Tag.svg"
            label="Marketplace"/>
      
          </div>
          <div className="mt-16" >
            <SidebarItem
            iconName="help.svg"
            label="Help"/>
          
          </div>
        </ul>
      </nav>
    </div>
  );
}
