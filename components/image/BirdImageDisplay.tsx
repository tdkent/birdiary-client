"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bird } from "@/models/db";
import { Bird as BirdIcon } from "lucide-react";
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
            <figcaption className="px-1 text-xs italic md:text-sm">
              {scientificName}. &copy; {imgAttribute ?? "Public Domain"}
            </figcaption>
          </figure>
        </DialogTrigger>
        <DialogContent className="min-w-[95%]">
          <DialogHeader className="sr-only">
            <DialogTitle>{bird.commonName}</DialogTitle>
            <DialogDescription>
              Full-screen image of {bird.commonName}
            </DialogDescription>
          </DialogHeader>
          <figure className="flex flex-col gap-1 md:gap-2">
            <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
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
        </DialogContent>
      </Dialog>
    </>
  );
}
