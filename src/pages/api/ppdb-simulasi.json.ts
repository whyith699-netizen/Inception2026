import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const rules = {
    academic_year: '2026/2027',
    target_school: {
      name: 'SMA Negeri 1 Klaten',
      address: 'Jl. Merbabu No. 13 Klaten, Jawa Tengah (57423)',
      coordinates: { lat: -7.7018, lng: 110.6025 },
      capacity_total: 396, // 11 rombel x 36 siswa
    },
    quotas: [
      { key: 'zonasi', label: 'Jalur Zonasi Reguler', percentage: 55, seats: 218, max_distance_meters: 5000, priority_radius_meters: 2500 },
      { key: 'prestasi', label: 'Jalur Prestasi', percentage: 20, seats: 79, min_score: 88.0, cert_multiplier: 1.5 },
      { key: 'afirmasi', label: 'Jalur Afirmasi (KIP/DTKS)', percentage: 20, seats: 79, requires_dtks: true },
      { key: 'mutasi', label: 'Jalur Perpindahan Tugas Orang Tua', percentage: 5, seats: 20, requires_sk_pindah: true },
    ],
    historical_cutoffs: {
      2025: { zonasi_max_km: 3.42, prestasi_min_score: 93.15 },
      2024: { zonasi_max_km: 3.65, prestasi_min_score: 92.80 },
    },
  };

  return new Response(JSON.stringify({ status: 'success', data: rules }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
