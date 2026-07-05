import type { ProofImage } from "@/backend";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface LightboxProps {
  /** Index into `photos` of the currently displayed image. */
  index: number;
  /** Photos in the current category only — navigation stays within this set. */
  photos: ProofImage[];
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Full-screen photo viewer built on the existing Radix Dialog (ui/dialog.tsx).
 * Navigation is confined to the supplied `photos` array (within-category only).
 * Escape + backdrop click are handled by Radix; ArrowLeft/ArrowRight move
 * within the current category.
 */
export function Lightbox({
  index,
  photos,
  open,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        e.preventDefault();
        onNext();
      }
    },
    [hasPrev, hasNext, onPrev, onNext],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const positionLabel = useMemo(
    () => `${index + 1} / ${photos.length}`,
    [index, photos.length],
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPortal>
        <DialogContent
          className="lightbox-overlay border-0 bg-transparent p-0 shadow-none sm:max-w-none"
          showCloseButton={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
          data-ocid="proof.lightbox.dialog"
        >
          <DialogTitle className="sr-only">
            {photo ? photo.altText : "Photo viewer"}
          </DialogTitle>

          {/* Close button */}
          <button
            type="button"
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close photo viewer"
            data-ocid="proof.lightbox.close_button"
          >
            <X className="size-5" aria-hidden />
          </button>

          {/* Prev nav (within category only) */}
          {hasPrev && (
            <button
              type="button"
              className="lightbox-nav lightbox-nav-prev"
              onClick={onPrev}
              aria-label="Previous photo"
              data-ocid="proof.lightbox.pagination_prev"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
          )}

          {/* Next nav (within category only) */}
          {hasNext && (
            <button
              type="button"
              className="lightbox-nav lightbox-nav-next"
              onClick={onNext}
              aria-label="Next photo"
              data-ocid="proof.lightbox.pagination_next"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          )}

          {photo && (
            <figure className="lightbox-content lightbox-figure">
              <img
                src={photo.photoUrl}
                alt={photo.altText}
                className="lightbox-image"
                decoding="async"
              />
              <figcaption className="lightbox-caption">
                <span className="lightbox-category-pill">{photo.category}</span>
                <p className="lightbox-caption-text">{photo.caption}</p>
                <p className="mt-2 text-xs text-white/60">{positionLabel}</p>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
