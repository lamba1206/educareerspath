import type { ProofImage } from "@/backend";
import { GalleryCard } from "@/components/GalleryCard";
import { Lightbox } from "@/components/Lightbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useProofImages } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

/**
 * Groups the workshop photographs returned by `useProofImages` by category and
 * renders each category as a labeled section with a responsive `.gallery-grid`.
 * Clicking any card opens the Lightbox scoped to that category.
 */
export function PhotoGallery() {
  const { data, isLoading, isError } = useProofImages();
  const photos = data ?? [];

  // Group photos by category, preserving backend sortOrder within each group.
  const grouped = useMemo(() => {
    const map = new Map<string, ProofImage[]>();
    for (const p of photos) {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => Number(a.sortOrder - b.sortOrder));
    }
    return Array.from(map.entries());
  }, [photos]);

  // Lightbox state — scoped to a single category's photo array.
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhotos = useMemo(
    () => grouped.find(([cat]) => cat === activeCategory)?.[1] ?? [],
    [grouped, activeCategory],
  );

  const openPhoto = (category: string, photo: ProofImage) => {
    const list = grouped.find(([cat]) => cat === category)?.[1] ?? [];
    const idx = list.findIndex((p) => p.id === photo.id);
    setActiveCategory(category);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const closeLightbox = () => setActiveCategory(null);
  const prevPhoto = () => setActiveIndex((i) => Math.max(0, i - 1));
  const nextPhoto = () =>
    setActiveIndex((i) => Math.min(activePhotos.length - 1, i + 1));

  if (isLoading) {
    return (
      <div className="gallery-grid" data-ocid="proof.gallery.loading_state">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={`skeleton-card-${i + 1}`}
            data-ocid={`proof.gallery.loading_state.item.${i + 1}`}
            className="aspect-[4/3] w-full rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (isError || photos.length === 0) {
    return (
      <div
        className="glass-card mx-auto max-w-md p-8 text-center"
        data-ocid="proof.gallery.empty_state"
      >
        <p className="text-sm text-muted-foreground">
          Workshop photographs are being curated. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      {grouped.map(([category, list], sectionIdx) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: Math.min(sectionIdx * 0.1, 0.4) }}
          className="mb-12 last:mb-0"
          data-ocid={`proof.gallery.section.${sectionIdx + 1}`}
        >
          <div className="mb-5 flex items-center gap-3">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {category}
            </h3>
            <span className="text-sm text-muted-foreground">
              {list.length} {list.length === 1 ? "photo" : "photos"}
            </span>
          </div>
          <div className="gallery-grid">
            {list.map((photo, i) => (
              <GalleryCard
                key={photo.id.toString()}
                photo={photo}
                index={i}
                onOpen={(p) => openPhoto(category, p)}
              />
            ))}
          </div>
        </motion.section>
      ))}

      <Lightbox
        index={activeIndex}
        photos={activePhotos}
        open={activeCategory !== null}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </>
  );
}
