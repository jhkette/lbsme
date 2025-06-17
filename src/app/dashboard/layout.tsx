
import HeaderDashboard from "@/components/lbcoreui/HeaderDashboard";
import Sidebar from "@/components/lbcoreui/Sidebar";

import { fetchTopDeals } from "@/actions/deals";
import { Toaster } from 'react-hot-toast';
export default async function Layout({ children }: { children: React.ReactNode }) {
 

  // console.log("Apollo Client initialized:", apolloClient);
   const loadDeals = async () => {
  try {
    const deals = await fetchTopDeals();
    console.log('Top deals:', deals);
    // deals will be properly typed as Deal[]
  } catch (error) {
    // Handle errors
    console.log(error)
  }
};
// console.log(loadDeals)
loadDeals()

  return (
    <div className="flex flex-col items-start  min-h-screen bg-gray-100">
    
        <HeaderDashboard />
        
        <div className="flex flex-row w-full">
          <Sidebar />
          {children}
        </div>
       <Toaster/>
  
    </div>
  );
}
