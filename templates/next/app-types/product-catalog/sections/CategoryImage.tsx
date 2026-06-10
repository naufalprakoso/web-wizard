"use client";

import { useEffect, useState } from "react";

type CategoryImageProps = {
  src: string;
  alt: string;
};

export function CategoryImage({ src, alt }: CategoryImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}
