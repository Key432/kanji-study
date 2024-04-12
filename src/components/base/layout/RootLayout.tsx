import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full min-h-full flex flex-col">
      <Header />
      <main className="h-full grow">{children}</main>
      <Footer />
    </div>
  );
}
