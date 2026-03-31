import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #131722 0%, #1a1e2d 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 208, 132, 0.4)',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'transparent',
            backgroundClip: 'text',
            backgroundImage: 'linear-gradient(135deg, #00d084 0%, #00b8d9 100%)',
          }}
        >
          W
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
