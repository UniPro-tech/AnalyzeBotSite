import { HeroStyles, PrimaryStyles } from "@/constants/styles";

export const dynamic = "force-static";

export default function QandA() {
  const FAQ_CONTENTS = [
    {
      id: "no_data",
      question: "会話をしているにも関わらず、「データ不足」と表示されます。",
      answer:
        "そのチャンネルがBotから見えていない可能性があります。Botの権限を今一度確認し、プライベートチャンネルでBotに権限がついていない場合は、付与してみてください。",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <section id="hero" className={HeroStyles.wrapper}>
        <div className={`${HeroStyles.layouts.fullWidth}`}>
          <h2 className={`${HeroStyles.headline} mb-4`}>FAQ</h2>
          <p className={`${HeroStyles.paragraph} mb-8`}>
            よくあるご質問にお答えします。
          </p>
        </div>
      </section>
      <section id="faq" className={PrimaryStyles.layouts.center}>
        {FAQ_CONTENTS.map((item) => (
          <div
            key={item.id}
            className="border-b border-slate-200 pb-6 last:border-0"
          >
            <h3 className="flex items-start gap-3 text-xl font-semibold mb-3">
              <span className="text-blue-600 font-bold">Q.</span>
              {item.question}
            </h3>
            <div className="flex items-start gap-3 text-slate-600 leading-relaxed">
              <span className="text-red-500 font-bold">A.</span>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
