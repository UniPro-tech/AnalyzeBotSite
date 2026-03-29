import Image from "next/image";
import { HeroStyles, PrimaryStyles } from "@/constants/styles";

export default function HowToUse() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <section id="hero" className={HeroStyles.wrapper}>
        <div className={HeroStyles.layouts.imageSide}>
          <div className="w-full lg:w-[44%]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className={`${HeroStyles.headline} mb-4`}>使い方</h2>
              <p className={`${HeroStyles.paragraph} mb-8`}>
                活動分析くんの使い方を説明します。
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[56%]">
            <div className="relative mx-auto max-w-3xl">
              <Image
                src="/imgs/sample/daily_cloud_01.png"
                alt="How to use"
                width={1200}
                height={800}
                style={{ objectFit: "cover" }}
                className="w-full h-auto rounded-[20px] border border-black/10 bg-white"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="wordcloud" className={PrimaryStyles.wrapper}>
        <div className={PrimaryStyles.layouts.imageSide}>
          <div className="w-full lg:w-[56%]">
            <div className="relative mx-auto max-w-3xl">
              <Image
                src="/imgs/sample/manual_cloud_01.png"
                alt="Word Cloud Example"
                width={1200}
                height={800}
                style={{ objectFit: "cover" }}
                className="w-full h-auto rounded-[20px] border border-black/10 bg-white"
              />
            </div>
          </div>

          <div className="w-full lg:w-[44%]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className={`${PrimaryStyles.headline} mb-4`}>
                ワードクラウド生成
              </h2>
              <p className={`${PrimaryStyles.paragraph} mb-8`}>
                これは活動分析くんが生成するワードクラウドの例です。ユーザーの活動データから重要なキーワードを抽出し、視覚的に表示します。
              </p>
              <p className={`${PrimaryStyles.paragraph}`}>
                ユーザー指定など条件を変更することで、様々なワードクラウドを生成できます。例えば、特定の期間やチャンネル、ロールに絞ったワードクラウドも作成可能です。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={HeroStyles.wrapper}>
        <div className={HeroStyles.layouts.imageSide}>
          <div className="w-full lg:w-[44%]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className={`${HeroStyles.headline} mb-4`}>
                ネットワーク図生成
              </h2>
              <p className={`${HeroStyles.paragraph} mb-8`}>
                これは活動分析くんが生成するネットワーク図の例です。ユーザー同士の交流や関係性を視覚的に表現します。
              </p>
              <p className={`${HeroStyles.paragraph}`}>
                ネットワーク図も条件を変更して生成できます。例えば、特定の期間やチャンネル、ロールに絞ったネットワーク図も作成可能です。
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[56%]">
            <div className="relative mx-auto max-w-3xl">
              <Image
                src="/imgs/sample/manual_network_01.png"
                alt="Network Graph Example"
                width={1200}
                height={800}
                style={{ objectFit: "cover" }}
                className="w-full h-auto rounded-[20px] border border-black/10 bg-white"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="scheduled-cloud" className={PrimaryStyles.wrapper}>
        <div className={PrimaryStyles.layouts.imageSide}>
          <div className="w-full lg:w-[56%]">
            <div className="relative mx-auto max-w-3xl">
              <Image
                src="/imgs/sample/daily_cloud_01.png"
                alt="Scheduled Cloud Example"
                width={1200}
                height={800}
                style={{ objectFit: "cover" }}
                className="w-full h-auto rounded-[20px] border border-black/10 bg-white"
              />
            </div>
          </div>

          <div className="w-full lg:w-[44%]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className={`${PrimaryStyles.headline} mb-4`}>
                予約ワードクラウド生成
              </h2>
              <p className={`${PrimaryStyles.paragraph} mb-8`}>
                これは活動分析くんが生成する予約ワードクラウドの例です。ユーザーが指定した期間に応じて、自動的にワードクラウドが生成されます。
              </p>
              <p>
                毎日生成すれば、モデレーターがどの話題が注目されているかを把握できるだけでなく、サーバーメンバーの話のネタにもつながります！
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="optout" className={HeroStyles.wrapper}>
        <div className={HeroStyles.layouts.imageSide}>
          <div className="w-full lg:w-[44%]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className={`${HeroStyles.headline} mb-4`}>
                オプトアウトについて
              </h2>
              <p className={`${HeroStyles.paragraph} mb-8`}>
                活動分析くんはユーザーの活動データを解析するツールですが、ユーザーはいつでもオプトアウトできます。オプトアウトすると、そのユーザーのデータは解析されなくなります。
              </p>
              <p className={`${PrimaryStyles.paragraph}`}>
                オプトアウトはユーザー単位のみならず、特定のチャンネルに対して行うこともできます。
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[56%]">
            <div className="relative mx-auto max-w-3xl">
              <Image
                src="/imgs/sample/optout_01.png"
                alt="Opt-out Example"
                width={1200}
                height={800}
                style={{ objectFit: "cover" }}
                className="w-full h-auto rounded-[20px] border border-black/10 bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
