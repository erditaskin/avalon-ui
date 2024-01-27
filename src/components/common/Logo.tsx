import Image from "next/image";

interface IProps {
  width?: number;
  height?: number;
  theme?: string;
}

const Logo = ({ width = 100, height = 100, theme = "dark" }: IProps) => {
  const src = `${process.env.NEXT_PUBLIC_S3_URL}assets/avalon_${theme}.png`;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      loader={() => src}
      alt="Avalon"
      unoptimized={true}
      priority={true}
    />
  );
};

export default Logo;
