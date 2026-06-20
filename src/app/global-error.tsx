'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', fontFamily: 'sans-serif', background: '#F5F2EA', color: '#171B3A' }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>حدث خطأ غير متوقع</h2>
        <button onClick={reset} style={{ padding: '8px 20px', borderRadius: 12, background: '#171B3A', color: '#fff', border: 'none', cursor: 'pointer' }}>
          حاول مجدداً
        </button>
      </body>
    </html>
  );
}
