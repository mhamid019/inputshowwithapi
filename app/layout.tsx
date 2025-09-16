import "./global.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student App",
  description: "Next.js Student CRUD App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">
        {/* Navbar */}
        <nav className="flex gap-6 p-4 shadow bg-sky-900">
          <Link href="/">Home</Link>
          <Link href="/input">Input</Link>
          <Link href="/show">Show</Link>
        </nav>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
