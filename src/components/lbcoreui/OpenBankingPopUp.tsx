import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OpenBankingPopUpProps {
  connectAccount: () => void;
  navigateDashboard: () => void;
  status: string;
  obLoading?: boolean;
}

export function OpenBankingPopUp({ connectAccount, navigateDashboard, status, obLoading }: OpenBankingPopUpProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!obLoading &&(
        <Button
          className="w-fit px-8 py-6 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
         
       onClick={connectAccount} >
          {status == "Active" ? "Add another account":"Connect to Open Banking" }
        </Button>)
}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">You are now connected to Open Banking</DialogTitle>
          <DialogDescription className="text-lg pt-4">
            Please follow the instuctions on the new tab to add your account to Little Birdie. 
            Once you have recieved a success message return to the Little Birdie website.
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
  );
}
