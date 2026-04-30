import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
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
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: 510,
            height: 510,
            borderRadius: 9999,
            background: '#0E1510',
            border: '8px solid #7AB800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontFamily: 'Arial',
              fontWeight: 800,
              fontSize: 320,
              fontStyle: 'italic',
              lineHeight: 1,
              color: '#7AB800',
              letterSpacing: -10,
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
