import { Box } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

export type ContentLayoutProps = Partial<{
  children: React.ReactNode;
  title: string | React.ReactNode;
}>;

export function ContentLayout({ children, title }: ContentLayoutProps) {
  return (
    <Box className="w-full h-full flex flex-col bg-slate-100 items-center">
      <Box
        className={twMerge(
          "min-h-28 flex justify-center items-center",
          typeof title === "string" &&
            "font-klee font-bold text-2xl sm:text-4xl",
        )}
      >
        <h1>{title}</h1>
      </Box>
      <Box className="bg-white w-3/4 max-w-5xl rounded-t-md p-1 mx-auto grow">
        {children}
      </Box>
    </Box>
  );
}
