"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// We only have one product photo per product, so each finish is previewed by
// tinting that photo with a CSS filter. Copper is the photo as shot.
const FINISH_FILTER: Record<string, string> = {
  "Polished Copper": "none",
  "Brushed Copper": "saturate(0.85) brightness(1.05)",
  "Patina Teal": "hue-rotate(150deg) saturate(0.9)",
  "Night Sky": "hue-rotate(195deg) saturate(0.55) brightness(0.5)",
  "Desert Sand": "saturate(0.3) brightness(1.3) sepia(0.25)",
};

const SWATCH: Record<string, string> = {
  "Polished Copper": "bg-[#b87333]",
  "Brushed Copper": "bg-[#b87333]",
  "Patina Teal": "bg-[#4a8c82]",
  "Night Sky": "bg-[#1c2333]",
  "Desert Sand": "bg-[#efe3d0]",
};

type Props = {
  productName: string;
  src: string;
  alt: string;
  colors: string[];
};

export function ColorSlides({ productName, src, alt, colors }: Props) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const count = colors.length;
  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${productName} colors`}
      className="flex flex-col gap-3"
    >
      <div
        className="bg-secondary relative overflow-hidden rounded-xl"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {colors.map((color, i) => (
            <div
              key={color}
              role="group"
              aria-roledescription="slide"
              aria-label={`${color}, ${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="w-full shrink-0 p-6"
            >
              <Image
                src={src}
                alt={i === 0 ? alt : `${alt}, ${color} finish preview`}
                width={1254}
                height={1254}
                sizes="(min-width: 768px) 40vw, 80vw"
                style={{ filter: FINISH_FILTER[color] ?? "none" }}
                className="mx-auto h-auto w-full max-w-72 object-contain transition-[filter,transform] duration-500 hover:scale-105 motion-reduce:transition-none"
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={`Previous ${productName} color`}
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full shadow transition-transform hover:scale-110 active:scale-90"
        >
          <ChevronLeft />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={`Next ${productName} color`}
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full shadow transition-transform hover:scale-110 active:scale-90"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div role="group" aria-label="Choose a color" className="flex gap-3">
          {colors.map((color, i) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "size-8 rounded-full border-2 transition-all duration-200 hover:-translate-y-1 hover:scale-125 active:scale-95 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none",
                SWATCH[color] ?? "bg-primary",
                i === index
                  ? "border-primary ring-primary/40 scale-110 ring-4"
                  : "border-border",
              )}
            />
          ))}
        </div>
        <p aria-live="polite" className="text-sm font-semibold">
          {colors[index]}{" "}
          <span className="text-muted-foreground font-normal">(preview)</span>
        </p>
      </div>
    </div>
  );
}
