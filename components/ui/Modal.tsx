"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type ModalProps = {
  buttonSize: "default" | "sm" | "lg" | "icon" | null | undefined;
  buttonVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  children: React.ReactNode;
  description: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  triggerText: string;
};

export default function Modal({
  buttonSize,
  buttonVariant,
  children,
  description,
  open,
  setOpen,
  title,
  triggerText,
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
        variant={buttonVariant}
        size={buttonSize}
        onClick={() => setOpen(true)}
      >
        {triggerText}
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
              <Button type="button" size="lg" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
