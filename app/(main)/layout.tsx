import { Metadata } from "next";
import { Nav as Navbar } from "./components/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: {
    default: "Mwai",
    template: "%s | Mwai",
  },
  description: "",
  openGraph: {
    title: "Mwai",
    description: "",

    locale: "en_US",
    type: "website",
  },
};
export const revalidate = 60 * 60 * 24; // 24 hours
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
      <Footer />
    </>
  );
}
