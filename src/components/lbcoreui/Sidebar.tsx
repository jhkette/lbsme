"use client";
import Image from "next/image";
import SidebarItem from "@/components/lbcoreui/SidebarItem";
export default function Sidebar() {
  return (
    <div className="bg-lbgreen w-32 h-dvh flex flex-col">
      <nav>
        <ul className="flex flex-col min-h-[750px] justify-between">
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
          <div className="" >
            <SidebarItem
            iconName="help.svg"
            label="Help"/>
          
          </div>
        </ul>
      </nav>
    </div>
  );
}
