import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full h-12 bg-primary-300">
      <div className="h-full container mx-auto flex justify-end items-center">
        <Link
          href="https://github.com/Key432/key-kanji-note"
          target="_blank"
          className="active:translate-y-0.5"
        >
          リポジトリ
        </Link>
      </div>
    </footer>
  );
}
