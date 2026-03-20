import { EventInfo, WishItem } from './types';

export const EVENT_INFO: EventInfo = {
  hostNames: ['Bapak H. Ahmad Fauzi', 'Ibu Hj. Siti Nurhaliza'],
  eventTitle: 'Walimatussafar',
  eventSubtitle: 'Syukuran Keberangkatan Ibadah Haji',
  date: '2026-04-19T08:00:00+07:00',
  dateHijri: '1 Syawwal 1448 H',
  dateFormatted: 'Minggu, 19 April 2026',
  time: '08.00 WIB - Selesai',
  venue: 'Kediaman Bpk. H. Ahmad Fauzi',
  address: 'Jl. Mawar No. 123, RT 05/RW 02, Kel. Sukamaju, Kec. Cilandak, Jakarta Selatan',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890',
  mapLink: 'https://maps.google.com/?q=-6.3,106.8',
};

export const INITIAL_WISHES: WishItem[] = [
  {
    id: '1',
    name: 'Pak RT Hasan',
    message: 'Semoga perjalanan haji Bapak dan Ibu diberi kelancaran, kesehatan, dan menjadi haji yang mabrur. Aamiin.',
    timestamp: Date.now() - 86400000,
  },
  {
    id: '2',
    name: 'Bu Sari',
    message: 'Selamat menunaikan ibadah haji. Semoga senantiasa dalam lindungan Allah SWT. Haji Mabrur!',
    timestamp: Date.now() - 43200000,
  },
];

export const BISMILLAH_TEXT = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

export const DOA_TEXT = 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَسْأَلَةِ وَخَيْرَ الدُّعَاءِ وَخَيْرَ النَّجَاحِ';

export const DEFAULT_GUEST_NAME = 'Tamu Undangan';
