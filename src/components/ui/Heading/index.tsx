import { Heading as Head, HeadingProps } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

export function Heading({ children, ...props }: HeadingProps) {
  const { className, ...remain } = props;
  return (
    <Head
      {...remain}
      className={twMerge("font-stick text-xl md:text-2xl", className)}
    >
      {children}
    </Head>
  );
}
