import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#131722',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(120,123,134,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,123,134,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 40px',
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,208,132,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Ticker badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 999,
            border: '1px solid rgba(0,208,132,0.3)',
            background: 'rgba(0,208,132,0.08)',
            marginBottom: 28,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d084' }} />
          <span style={{ color: '#00d084', fontSize: 14, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            KOSPI · WGLEE · Frontend Developer
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00d084 0%, #00b4d8 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          WG.LEE
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 30, color: '#d1d4dc', marginBottom: 8 }}>
          이원교 · Frontend Developer
        </div>

        {/* Tech stack */}
        <div style={{ fontSize: 18, color: '#787b86', marginBottom: 40 }}>
          React · React Native · TypeScript · Next.js
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { label: '메모리 최적화', value: '-69%' },
            { label: '번들사이즈', value: '-43%' },
            { label: 'MAU', value: '500만+' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#00d084' }}>{stat.value}</span>
              <span style={{ fontSize: 13, color: '#787b86' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: 32, right: 48, fontSize: 14, color: '#4b5563' }}>
          wglee.getcodeforge.dev
        </div>
      </div>
    )
  );
}
