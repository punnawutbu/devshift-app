export const normalizeLang = (lang?: string) => {
  if (!lang) return 'th';
  if (lang.startsWith('en')) return 'en';
  return 'th';
};

export const formatDateTimeLocalized = (iso?: string, lang?: string) => {
  if (!iso) return '-';

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  const l = normalizeLang(lang);

  return d.toLocaleString(l === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRoundLabel = (seq?: number, lang?: string) => {
  const l = normalizeLang(lang);
  if (!seq) return '';
  return l === 'th' ? `ครั้งที่ ${seq}` : `Round ${seq}`;
};

export const formatNumber = (n?: number | null) => {
  if (n === null || n === undefined || Number.isNaN(n)) return '-';
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
};
