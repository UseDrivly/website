import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 9999,
            background: '#0E1510',
            border: '4px solid #7AB800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Arial',
              fontWeight: 800,
              fontSize: 108,
              fontStyle: 'italic',
              lineHeight: 1,
              color: '#7AB800',
              letterSpacing: -4,
            }}
          >
            D
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
