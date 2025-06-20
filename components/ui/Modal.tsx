"use client";

import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  triggerText: string;
  buttonTrigger?: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function Modal({
  open,
  setOpen,
  triggerText,
  // buttonTrigger,
  title,
  description,
  children,
}: ModalProps) {
  // This effect is needed to manage clicks inside the Place Autocomplete dropdown.
  // Although the dropdown appears to be inside the <Dialog>, it is actually outside
  // of it. <Dialog> therefore registers the click event as a signal to close the modal.
  // The solution is register events inside the Autocomplete dropdown (.pac-container)
  // and prevent them from bubbling (e.stopPropagation())
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest(".pac-container")
      ) {
        e.stopPropagation();
      }
    };

    // Listen for "pointerdown" in case Dialog closes before "click" triggers
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="w-fit p-0 hover:bg-transparent"
        onClick={() => setOpen(true)}
      >
        <span>{triggerText}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    // <Dialog>
    //   <DialogTrigger>
    //     {buttonTrigger ? (
    //       <Button
    //         variant="ghost"
    //         className="w-fit p-0 hover:bg-transparent"
    //         asChild
    //       >
    //         <span>{triggerText}</span>
    //       </Button>
    //     ) : (
    //       triggerText
    //     )}
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>{title}</DialogTitle>
    //       <DialogDescription>{description}</DialogDescription>
    //     </DialogHeader>
    //     {children}
    //     <DialogFooter>
    //       <DialogClose asChild>
    //         <Button type="button" variant="secondary">
    //           Cancel
    //         </Button>
    //       </DialogClose>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
