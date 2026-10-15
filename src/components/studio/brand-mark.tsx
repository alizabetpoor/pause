import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  width?: number;
};

export function BrandMark({ className, width = 160 }: BrandMarkProps) {
  const height = Math.round((width * 94) / 269);

  return (
    <Image
      src="/assets/pause-mark.png"
      alt="Pause Studio"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
