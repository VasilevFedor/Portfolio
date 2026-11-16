import type { ImgHTMLAttributes } from "react";
import images from "../case-images.json";

type ImageAsset = { src: string; srcSet: string; width: number; height: number };

/** Pre-sized static variants avoid a cold image-optimizer request on first visit. */
export default function CaseImage({
  src,
  alt,
  sizes = "(max-width: 799px) calc(100vw - 48px), 800px",
  loading = "lazy",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const asset = (images as Record<string, ImageAsset>)[src];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={asset?.src ?? src}
      srcSet={asset?.srcSet}
      width={asset?.width ?? props.width}
      height={asset?.height ?? props.height}
      sizes={asset ? sizes : undefined}
      alt={alt}
      loading={loading}
      decoding="async"
    />
  );
}
