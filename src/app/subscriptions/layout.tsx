import Header from "@/components/coreui/header";
import Sidebar from "@/components/coreui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start  min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-row w-full">
      <Sidebar />
      {children}
      </div>

    </div>
  );
}
