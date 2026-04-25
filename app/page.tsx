import { Header } from "@/components/home/Header";
import { Greeting } from "@/components/home/Greeting";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <Greeting />
      <CategoryGrid />
    </div>
  );
}
