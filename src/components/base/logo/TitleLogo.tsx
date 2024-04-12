import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function TitleLogo({
  className,
}: {
  className?: HTMLAttributes<HTMLParagraphElement>["className"];
}) {
  return (
    <p className={twMerge("font-klee font-bold", className)}>
      <span className="font-emoji">🖊</span>語彙力あげあげ委員会
    </p>
  );
}
