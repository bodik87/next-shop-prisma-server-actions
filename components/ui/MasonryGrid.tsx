"use client"

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,
  1200: 2,
  600: 1,
};

export default function MasonryGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-3 p-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {children}
      </Masonry>
    </div>
  );
}
