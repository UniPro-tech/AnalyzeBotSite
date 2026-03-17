import HeroSlideshow from "../components/HeroSlideshow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSlideshow />
      <section id="news">
        <h3 className="text-2xl font-bold mb-4">ニュース</h3>
        <ul className="list-disc list-inside text-left text-gray-700"></ul>
      </section>
    </main>
  );
}
