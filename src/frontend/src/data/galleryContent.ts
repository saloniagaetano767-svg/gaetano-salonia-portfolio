export interface GalleryItem {
  id: string;
  /** Replace this file in public/assets/gallery/ — update extension if needed. */
  src: string;
  featured?: boolean;
  placeholder?: boolean;
}

/** Swap files in public/assets/gallery/ when real photos are ready. */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "portrait",
    src: "/assets/gallery/gallery-01.svg",
    featured: true,
    placeholder: true,
  },
  {
    id: "work",
    src: "/assets/gallery/gallery-02.svg",
    placeholder: true,
  },
  {
    id: "team",
    src: "/assets/gallery/gallery-03.svg",
    placeholder: true,
  },
  {
    id: "switzerland",
    src: "/assets/gallery/gallery-04.svg",
    featured: true,
    placeholder: true,
  },
  {
    id: "everyday",
    src: "/assets/gallery/gallery-05.svg",
    placeholder: true,
  },
  {
    id: "moment",
    src: "/assets/gallery/gallery-06.svg",
    placeholder: true,
  },
];
