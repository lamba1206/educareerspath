import type { ProofImage } from "@/backend";
import { useState } from "react";

interface GalleryCardProps {
  photo: ProofImage;
  index: number;
  onOpen: (photo: ProofImage) => void;
}

/**
 * Single photo card for the Proof gallery. Layers on top of the existing
 * `.glass-card` surface utility and uses the gallery-* CSS classes from
 * index.css for media, caption, and category pill styling.
 */
export function GalleryCard({ photo, index, onOpen }: GalleryCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      className="gallery-card glass-card hover-lift w-full text-left"
      onClick={() => onOpen(photo)}
      aria-label={`Open photo: ${photo.altText}`}
      data-ocid={`proof.gallery.item.${index + 1}`}
    >
      <div className="gallery-card-media">
        <img
          src={photo.photoUrl}
          alt={photo.altText}
          loading="lazy"
          decoding="async"
          className={`gallery-thumb${loaded ? " gallery-thumb-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="gallery-card-body">
        <span className="gallery-category-pill">{photo.category}</span>
        <p className="gallery-card-caption">{photo.caption}</p>
      </div>
    </button>
  );
}
