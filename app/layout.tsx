import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Code Story Studio — Ideas into something real",
 description: "A clearer way to plan, design, and build your next digital product."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}