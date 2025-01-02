import { Chore } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ChoreDialog({
  isOpen,
  chore,
  close,
}: {
  isOpen: boolean;
  chore: Chore;
  close: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{chore.name}</DialogTitle>
          <DialogDescription>{chore.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="secondary">
            Mark as completed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChoreDialog;
