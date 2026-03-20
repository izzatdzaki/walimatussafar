export interface EventInfo {
  hostNames: string[];
  eventTitle: string;
  eventSubtitle: string;
  date: string; // ISO date string
  dateHijri: string;
  dateFormatted: string;
  time: string;
  venue: string;
  address: string;
  mapEmbedUrl: string;
  mapLink: string;
}

export interface WishItem {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export interface RsvpData {
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'belum_pasti';
  guests: number;
}

export interface GalleryImage {
  id: string;
  alt: string;
  bgColor: string;
  icon: string;
}
