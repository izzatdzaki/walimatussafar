'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { EVENT_INFO, BISMILLAH_TEXT } from '@/lib/constants';
import IslamicOrnament from '@/components/IslamicOrnament';

// Check if a line is purely Arabic script (no Latin characters)
function isPureArabic(text: string): boolean {
  const stripped = text.replace(/\s/g, '');
  if (stripped.length === 0) return false;
  const hasArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(stripped);
  const hasLatin = /[a-zA-Z]/.test(stripped);
  return hasArabic && !hasLatin;
}

// Render WhatsApp-style formatting: *bold*, _italic_
function renderWhatsAppFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*[^*]+\*)|(_[^_]+_)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const raw = match[0];
    if (raw.startsWith('*') && raw.endsWith('*')) {
      parts.push(<strong key={match.index}>{raw.slice(1, -1)}</strong>);
    } else if (raw.startsWith('_') && raw.endsWith('_')) {
      parts.push(<em key={match.index}>{raw.slice(1, -1)}</em>);
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

interface MessageTemplate {
  id: string;
  label: string;
  description: string;
  generateMessage: (guestName: string) => string;
}

interface RecipientEntry {
  id: string;
  name: string;
  phone: string | null;
}

function normalizePhoneNumber(phone: string): string | null {
  const digitsOnly = phone.replace(/\D/g, '');

  if (!digitsOnly) {
    return null;
  }

  if (digitsOnly.startsWith('62')) {
    return digitsOnly;
  }

  if (digitsOnly.startsWith('0')) {
    return `62${digitsOnly.slice(1)}`;
  }

  return digitsOnly;
}

function parseRecipientInput(input: string): RecipientEntry[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const tabParts = line
        .split('\t')
        .map((part) => part.trim())
        .filter(Boolean);

      if (tabParts.length >= 3) {
        const rawName = tabParts[1];
        const rawPhone = tabParts[2];

        return {
          id: `${index}-${rawName}`,
          name: rawName,
          phone: normalizePhoneNumber(rawPhone),
        };
      }

      const phoneMatch = line.match(/(\+?\d[\d\s()-]{7,}\d)\s*$/);
      const rawPhone = phoneMatch?.[1] ?? '';
      const phone = normalizePhoneNumber(rawPhone);
      let name = phoneMatch ? line.slice(0, line.lastIndexOf(rawPhone)).trim() : line;

      name = name.replace(/^\d+\s+/, '').trim();

      return {
        id: `${index}-${name}`,
        name: name || 'Tamu Undangan',
        phone,
      };
    });
}

const WEBSITE_BASE_URL = 'http://localhostech.my.id';

const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'formal',
    label: 'Formal',
    description: 'Pesan resmi untuk keluarga & tetua',
    generateMessage: (guestName: string) => {
      const encodedName = encodeURIComponent(guestName);
      return `\u200Eبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

Assalamu'alaikum Wr. Wb.

Kepada Yth.
Bapak/Ibu/Saudara/i *${guestName}*

Dengan memohon Rahmat dan Ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara:

* *${EVENT_INFO.eventTitle}* *
_${EVENT_INFO.eventSubtitle}_

*${EVENT_INFO.hostNames[0]}*

Tanggal: ${EVENT_INFO.dateFormatted}
(${EVENT_INFO.dateHijri})
Waktu: ${EVENT_INFO.time}
Tempat: ${EVENT_INFO.venue}
Alamat: ${EVENT_INFO.address}

Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Untuk informasi lebih lengkap, silakan buka undangan digital kami:
${WEBSITE_BASE_URL}/?to=${encodedName}

Atas kehadiran dan doa restunya, kami ucapkan terima kasih.

Wassalamu'alaikum Wr. Wb.
Hormat kami,
${EVENT_INFO.hostNames[0]}`;
    },
  },
  {
    id: 'casual',
    label: 'Santai',
    description: 'Pesan kasual untuk teman & sahabat',
    generateMessage: (guestName: string) => {
      const encodedName = encodeURIComponent(guestName);
      return `Assalamu'alaikum!

Hai *${guestName}*

Alhamdulillah, kami sekeluarga akan berangkat menunaikan ibadah haji. Sebelum berangkat, kami ingin mengadakan syukuran bersama.

*${EVENT_INFO.eventTitle}*
_${EVENT_INFO.eventSubtitle}_

Tanggal: ${EVENT_INFO.dateFormatted}
Waktu: ${EVENT_INFO.time}
Tempat: ${EVENT_INFO.venue}, ${EVENT_INFO.address}

Yuk hadir ya! Doakan kami supaya diberikan kelancaran & haji yang mabrur.

Buka undangan digitalnya di sini ya:
${WEBSITE_BASE_URL}/?to=${encodedName}

Ditunggu kehadirannya!

Wassalam,
${EVENT_INFO.hostNames[0]}`;
    },
  },
  {
    id: 'short',
    label: 'Singkat',
    description: 'Pesan pendek & langsung',
    generateMessage: (guestName: string) => {
      const encodedName = encodeURIComponent(guestName);
      return `Assalamu'alaikum *${guestName}*

Kami mengundang kehadiran Anda pada acara *${EVENT_INFO.eventTitle}* (${EVENT_INFO.eventSubtitle}).

Tanggal: ${EVENT_INFO.dateFormatted}
Waktu: ${EVENT_INFO.time}
Tempat: ${EVENT_INFO.venue}

Silakan buka undangan lengkapnya:
${WEBSITE_BASE_URL}/?to=${encodedName}

Mohon doa restunya.
Wassalam`;
    },
  },
  {
    id: 'group',
    label: 'Grup',
    description: 'Untuk dikirim ke grup WhatsApp',
    generateMessage: (guestName: string) => {
      const encodedName = encodeURIComponent(guestName);
      return `\u200Eبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

Assalamu'alaikum Wr. Wb.

Kepada seluruh saudara/i *${guestName}* sekalian,

Dengan memohon Rahmat Allah SWT, kami mengundang untuk menghadiri acara:

* *${EVENT_INFO.eventTitle}* *
_${EVENT_INFO.eventSubtitle}_

*${EVENT_INFO.hostNames[0]}*

Tanggal: ${EVENT_INFO.dateFormatted} (${EVENT_INFO.dateHijri})
Waktu: ${EVENT_INFO.time}
Tempat: ${EVENT_INFO.venue}
Alamat: ${EVENT_INFO.address}

Buka undangan digital:
${WEBSITE_BASE_URL}/?to=${encodedName}

Mohon doa restu agar diberikan kelancaran dalam menunaikan ibadah haji dan menjadi haji yang mabrur. Aamiin.

Wassalamu'alaikum Wr. Wb.`;
    },
  },
];

export default function KirimPesanPage() {
  const [guestNamesInput, setGuestNamesInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('formal');
  const [copied, setCopied] = useState(false);

  const recipients = parseRecipientInput(guestNamesInput);
  const recipientsWithPhone = recipients.filter((recipient) => recipient.phone);
  const previewGuestName = recipients[0]?.name || 'Tamu Undangan';
  const currentTemplate = MESSAGE_TEMPLATES.find((t) => t.id === selectedTemplate)!;
  const generatedMessage = currentTemplate.generateMessage(previewGuestName);
  const allGeneratedMessages =
    recipients.length > 0
      ? recipients
          .map((recipient, index) => {
            const message = currentTemplate.generateMessage(recipient.name);
            const phoneLabel = recipient.phone ? ` (${recipient.phone})` : '';
            return `=== Pesan ${index + 1}: ${recipient.name}${phoneLabel} ===\n${message}`;
          })
          .join('\n\n')
      : generatedMessage;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(allGeneratedMessages);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = allGeneratedMessages;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const recipientsToSend =
      recipientsWithPhone.length > 0
        ? recipientsWithPhone
        : [{ id: 'default', name: 'Tamu Undangan', phone: null }];

    recipientsToSend.forEach((recipient) => {
      const encoded = encodeURIComponent(currentTemplate.generateMessage(recipient.name));
      const url = recipient.phone
        ? `https://api.whatsapp.com/send?phone=${recipient.phone}&text=${encoded}`
        : `https://api.whatsapp.com/send?text=${encoded}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="relative bg-white py-10 px-6 text-center overflow-hidden">
        <div className="absolute top-0 inset-x-0 pointer-events-none opacity-10">
          <IslamicOrnament variant="mosque-silhouette" color="var(--gold)" className="w-full" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <p className="font-arabic text-lg text-gold-dark mb-3">{BISMILLAH_TEXT}</p>
          <IslamicOrnament variant="divider" color="var(--gold)" />
          <h1 className="font-heading text-2xl md:text-3xl text-gold-dark mt-4">
            Kirim Undangan
          </h1>
          <p className="text-text-medium text-sm mt-2">
            Pilih template pesan & kirim ke teman-teman Anda
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Recipient Input */}
        <div className="card-ornate-islamic p-5">
          <label htmlFor="guestNames" className="block text-sm font-heading text-gold-dark mb-2">
            Daftar Penerima
          </label>
          <textarea
            id="guestNames"
            value={guestNamesInput}
            onChange={(e) => setGuestNamesInput(e.target.value)}
            placeholder={`Paste data dari Google Sheets...\nContoh:\n1\tCrew RSU Cahaya Medika\t6281344623746\n2\tMuhammad Afdal & Ny\t82194575833`}
            rows={7}
            className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors text-sm resize-y"
          />
          <p className="text-text-light text-xs mt-2">
            Bisa paste langsung baris dari Google Sheets: `No`, `Nama`, `Nomor Hp`
          </p>
          <p className="text-text-light text-xs mt-1">
            {recipients.length > 0
              ? `${recipients.length} penerima terdeteksi, ${recipientsWithPhone.length} nomor valid siap dikirim.`
              : 'Nama penerima akan tampil di pesan, dan nomor HP akan dipakai untuk membuka chat WhatsApp.'}
          </p>
          <p className="text-text-light text-xs mt-1">
            Jika satu baris berisi nama dan nomor sekaligus, sistem akan mengambil angka terakhir sebagai nomor HP.
          </p>
        </div>

        {/* Template Selection */}
        <div className="card-ornate-islamic p-5">
          <p className="text-sm font-heading text-gold-dark mb-3">Pilih Template</p>
          <div className="grid grid-cols-2 gap-2">
            {MESSAGE_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-3 rounded-lg border text-left transition-all text-sm ${
                  selectedTemplate === template.id
                    ? 'border-gold bg-gold/10 text-gold-dark'
                    : 'border-gold/20 bg-white text-text-medium hover:border-gold/40'
                }`}
              >
                <span className="block font-heading text-sm">{template.label}</span>
                <span className="block text-xs mt-0.5 opacity-70">{template.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="card-ornate-islamic p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-heading text-gold-dark">Preview Pesan</p>
            <span className="text-xs text-text-light px-2 py-0.5 bg-cream rounded-full">
              {currentTemplate.label}
            </span>
          </div>
          {recipients.length > 0 && (
            <p className="text-xs text-text-light mb-3">
              Menampilkan preview untuk: <span className="text-gold-dark">{previewGuestName}</span>
              {recipients[0]?.phone && (
                <span className="text-text-light"> ({recipients[0].phone})</span>
              )}
            </p>
          )}
          <div className="bg-cream/80 rounded-lg p-4 max-h-80 overflow-y-auto">
            {generatedMessage.split('\n').map((line, i) => {
              const isArabic = isPureArabic(line);

              if (line.trim() === '') {
                return <div key={i} className="h-3" />;
              }

              return (
                <p
                  key={i}
                  dir={isArabic ? 'rtl' : 'ltr'}
                  style={{ textAlign: isArabic ? 'right' : 'left', unicodeBidi: 'plaintext' }}
                  className={`text-sm text-text-dark leading-relaxed break-words ${
                    isArabic ? 'font-arabic text-base' : 'font-body'
                  }`}
                >
                  {renderWhatsAppFormat(line)}
                </p>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className={`w-full py-3.5 rounded-full border text-sm font-heading transition-all duration-300 ${
              copied
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gold text-gold hover:bg-gold hover:text-white'
            }`}
          >
            {copied ? 'Tersalin!' : recipients.length > 1 ? 'Salin Semua Pesan' : 'Salin Pesan'}
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-sm font-heading hover:bg-[#1fb855] transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {recipientsWithPhone.length > 1
              ? `Kirim ke ${recipientsWithPhone.length} Nomor WhatsApp`
              : recipientsWithPhone.length === 1
                ? 'Kirim ke Nomor WhatsApp'
                : 'Kirim via WhatsApp'}
          </button>
          {recipients.length > 1 && (
            <p className="text-xs text-text-light text-center">
              Browser bisa meminta izin popup karena WhatsApp akan dibuka untuk tiap penerima.
            </p>
          )}
        </div>

        {/* Back to invitation link */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="text-gold-dark text-sm font-heading hover:text-gold transition-colors inline-flex items-center gap-1"
          >
            ← Kembali ke Undangan
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-2">
          <IslamicOrnament variant="kaaba" className="mx-auto w-10 h-10 opacity-30" />
        </div>
      </main>
    </div>
  );
}
