import { Card, CardProps } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "../Heading";

export type MenuBoxProps = CardProps & {
  heading?: ReactNode;
  href?: string;
  hasMounted?: boolean;
};

export function MenuBox({
  children,
  heading,
  className,
  hasMounted,
  href,
  ...props
}: MenuBoxProps) {
  const Container = ({ children }: { children: ReactNode }) =>
    href && hasMounted ? (
      <Link href={href} className={twMerge("cursor-pointer", className)}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <Container>
      <Card
        {...props}
        className={twMerge(
          "shadow-md active:translate-y-0.5 h-full w-full",
          !hasMounted && className,
        )}
      >
        {heading && (
          <Heading
            as="h3"
            className="font-normal flex justify-between items-end"
          >
            {heading}
            {!hasMounted && (
              <span className="text-secondary-300 text-xs">未完成！</span>
            )}
          </Heading>
        )}
        {children}
      </Card>
    </Container>
  );
}
