import { style, keyframes } from '@vanilla-extract/css';

const shimmer = keyframes({
  '0%': {
    backgroundPosition: '-468px 0',
  },
  '100%': {
    backgroundPosition: '468px 0',
  },
});

const skeleton = style({
  background: `linear-gradient(
    to right,
    #f3f4f6 8%,
    #e5e7eb 18%,
    #f3f4f6 33%
  )`,
  backgroundSize: '936px 104px',
  animation: `${shimmer} 1.5s ease-in-out infinite`,
});

export const skeletonCard = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  height: '100%',
});

export const skeletonImage = style([skeleton, {
  width: '100%',
  height: '200px',
  backgroundColor: '#f3f4f6',
}]);

export const skeletonContent = style({
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const skeletonDate = style([skeleton, {
  height: '20px',
  width: '150px',
  borderRadius: '0.25rem',
}]);

export const skeletonTitle = style([skeleton, {
  height: '28px',
  width: '100%',
  borderRadius: '0.25rem',
}]);

export const skeletonExcerpt = style([skeleton, {
  height: '60px',
  width: '100%',
  borderRadius: '0.25rem',
}]);

export const skeletonMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '0.5rem',
});

export const skeletonLocation = style([skeleton, {
  height: '20px',
  width: '120px',
  borderRadius: '0.25rem',
}]);

export const skeletonTags = style([skeleton, {
  height: '24px',
  width: '80px',
  borderRadius: '0.25rem',
}]);