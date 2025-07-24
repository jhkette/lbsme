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
import { redirect, RedirectType } from 'next/navigation'

interface OpenBankingPopUpProps {
  connectAccount: () => void;
  navigateDashboard: () => void;
}

export function OpenBankingPopUp({ connectAccount, navigateDashboard }: OpenBankingPopUpProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-fit px-8 py-6 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
         
       onClick={connectAccount} >
          Connect Your Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">You are now connected to Open Banking</DialogTitle>
          <DialogDescription className="text-lg pt-4">
            Please follow the instuctions on the new tab to add your account to Little Birdie. 
            Once you have recieved a success message return to the Little Birdie website and click  &quot; Go to dashbaord &quot;. 
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2"></div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={navigateDashboard}
            className="w-fit px-8 py-6 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300">
              Go to dashbaord
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
