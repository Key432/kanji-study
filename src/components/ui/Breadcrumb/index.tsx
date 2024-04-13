import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type BreadcrumbProps = {
  values: { text: string; href?: string }[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export function Breadcrumb({ values, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={twMerge("text-sm", className)}>
      <ol>
        {values.map((item, index) => {
          const isLast = index === values.length - 1;
          return (
            <li key={index} className="inline">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="underline hover:text-secondary-default"
                >
                  {item.text}
                </Link>
              ) : (
                <span>{item.text}</span>
              )}
              {!isLast && <span className="px-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
