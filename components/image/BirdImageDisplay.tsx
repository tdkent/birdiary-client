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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bird } from "@/models/db";
import { Bird as BirdIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type BirdImageDisplayProps = {
  bird: Bird;
  imgUrl: string;
  sizes: string;
};

export default function BirdImageDisplay({
  bird,
  imgUrl,
  sizes,
}: BirdImageDisplayProps) {
  const [loading, setLoading] = useState(true);
  const [loadingDialog, setLoadingDialog] = useState(true);
  const { commonName, imgAttribute, scientificName } = bird;
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <figure className="flex flex-col gap-1 md:gap-2">
            <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
              {loading ? <BirdIcon strokeWidth={1} size={64} /> : null}
              <Image
                alt={commonName}
                className="object-cover"
                fill
                onLoad={() => setLoading(false)}
                priority
                sizes={sizes}
                src={imgUrl}
              />
            </div>
            <figcaption className="px-1 text-left text-xs italic md:text-sm">
              {scientificName}. &copy; {imgAttribute ?? "Public Domain"}
            </figcaption>
          </figure>
        </DialogTrigger>
        <DialogContent className="max-h-full min-w-full rounded-none border-none p-0 [&>button]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{bird.commonName}</DialogTitle>
            <DialogDescription>
              Full-screen image of {bird.commonName}
            </DialogDescription>
          </DialogHeader>
          <figure>
            <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden">
              {loadingDialog ? <BirdIcon strokeWidth={1} size={64} /> : null}
              <Image
                alt={commonName}
                className="object-cover"
                fill
                onLoad={() => setLoadingDialog(false)}
                priority
                quality={100}
                sizes={sizes}
                src={imgUrl}
              />
            </div>
          </figure>
          <DialogFooter className="absolute right-2 top-2 scale-90 sm:justify-start md:right-4 md:top-4 md:scale-100 lg:right-8 lg:top-8 lg:scale-125">
            <DialogClose asChild>
              <Button
                aria-label="Close"
                className="rounded-full text-background dark:text-foreground dark:hover:text-background"
                size="icon"
                type="button"
                variant="ghost"
              >
                <X strokeWidth={1.5} />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
