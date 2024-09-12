import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import CreateResidentForm from "./create-form";
import { Button } from "@/ui/button";

export default function CreateResidentButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-inter text-primary">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10 sm:min-w-[512px]">
        <DialogHeader className="font-inter text-primary">
          <DialogTitle>Add a new resident</DialogTitle>
          <DialogDescription>
            Fill out the form with the resident&apos;s information and submit to
            save.
          </DialogDescription>
        </DialogHeader>
        <CreateResidentForm />
      </DialogContent>
    </Dialog>
  );
}
