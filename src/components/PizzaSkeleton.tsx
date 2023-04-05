import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={260}
    height={450}
    viewBox="0 0 260 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block">
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="280" rx="0" ry="0" width="260" height="20" />
    <rect x="0" y="320" rx="0" ry="0" width="280" height="82" />
    <rect x="0" y="419" rx="0" ry="0" width="80" height="30" />
    <rect x="107" y="419" rx="0" ry="0" width="150" height="30" />
  </ContentLoader>
);
