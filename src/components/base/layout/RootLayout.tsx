import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full min-h-full">
      <Header />
      <main className="min-h-[calc(100%-6rem)]">{children}</main>
      <Footer />
    </div>
  );
}
