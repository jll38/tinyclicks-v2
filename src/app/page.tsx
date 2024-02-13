import Image from "next/image";
import Shortener from "@/components/Shortener/Shortener";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Shortener />
    </main>
  );
}
