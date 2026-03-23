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
          background: 'linear-gradient(135deg, #03040b 0%, #121226 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'transparent',
            backgroundClip: 'text',
            backgroundImage: 'linear-gradient(135deg, #00e1ff 0%, #ff3399 100%)',
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
