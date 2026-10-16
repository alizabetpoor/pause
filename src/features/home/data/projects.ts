export type Project = {
  title: string;
  location: string;
  year: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    title: "LAKAJA CAFE",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img44.png",
    imageAlt: "Lakaja Cafe exterior and landscape",
  },
  {
    title: "NOOR GOLD GALLERY",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img48.png",
    imageAlt: "Noor Gold Gallery interior",
  },
  {
    title: "RG GOLD GALLERY",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img42.png",
    imageAlt: "RG Gold Gallery interior",
  },
  {
    title: "TOBACCO SHOP",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img45.png",
    imageAlt: "Tobacco shop interior",
  },
  {
    title: "CONFERENCE HALL",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img46.png",
    imageAlt: "Conference hall interior",
  },
  {
    title: "SHOWROOM",
    location: "SARI",
    year: "2025",
    image: "/assets/figma/img43.png",
    imageAlt: "Showroom interior",
  },
];

export const projectCategories = [
  "RESIDENTIAL",
  "VILLAS",
  "COMMERCIAL",
  "INTERIOR",
];
