interface CommandData {
  name: string;
  subCommands?: CommandData[];
  description?: string;
  usage?: string;
  example?: string;
}

const COMMAND_DATA: CommandData[] = [
  {
    name: "about",
    description: "活動解析くん(仮)の概要を表示します。",
    usage: "/about",
  },
  {
    name: "wordcloud",
    subCommands: [
      {
        name: "generate",
        description: "ワードクラウドを生成します。",
        usage: "/wordcloud generate [options]",
        example:
          "/wordcloud generate period:7 channel:#general user:@username role:@role",
      },
      {
        name: "schedule",
        description: "ワードクラウドの定期生成を設定します。",
        usage: "/wordcloud schedule [options]",
        example:
          "/wordcloud schedule frequency:デイリー(毎日) channel:#general time:0:00",
      },
      {
        name: "list",
        description: "スケジュール設定一覧を表示します。",
        usage: "/wordcloud list",
        example: "/wordcloud list",
      },
      {
        name: "remove",
        description: "スケジュール設定を削除します。",
        usage: "/wordcloud remove [options]",
        example: "/wordcloud remove channel:#general frequency:デイリー(毎日)",
      },
    ],
  },
  {
    name: "network",
    subCommands: [
      {
        name: "generate",
        description: "ネットワーク図を生成します。",
        usage: "/network generate [options]",
        example:
          "/network generate period:7 channel:#general user:@username role:@role",
      },
    ],
  },
  {
    name: "optout",
    subCommands: [
      {
        name: "user",
        description: "ユーザーを解析対象から除外します。",
        usage: "/optout user [options]",
        example: "/optout user optout:true recursive:true",
      },
      {
        name: "channel",
        description: "チャンネルを解析対象から除外します。",
        usage: "/optout channel [options]",
        example: "/optout channel channel:#general optout:true recursive:true",
      },
    ],
  },
  {
    name: "utils",
    subCommands: [
      {
        name: "sudachi_pos",
        description: "Sudachiの形態素分析結果を表示します。",
        usage: "/utils sudachi_pos [options]",
        example: "/utils sudachi_pos text:解析対象のテキスト mode:A(短単位)",
      },
    ],
  },
];

export default function CommandList() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-(--primary-background) text-(--primary-headline)">
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">コマンド一覧</h1>
          {COMMAND_DATA.map((command) => (
            <div key={command.name} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">{command.name}</h2>
              {command.description && (
                <p className="mb-4 text-lg text-(--primary-paragraph)">
                  {command.description}
                </p>
              )}
              {command.usage && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-1">使用例</h3>
                  <pre className="bg-(--primary-card-background) p-4 rounded">
                    {command.usage}
                  </pre>
                </div>
              )}
              {command.example && (
                <div>
                  <h3 className="text-lg font-medium mb-1">コマンド例</h3>
                  <pre className="bg-(--primary-card-background) p-4 rounded">
                    {command.example}
                  </pre>
                </div>
              )}
              {command.subCommands && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">サブコマンド</h3>
                  <ul className="space-y-4">
                    {command.subCommands.map((sub) => (
                      <li
                        key={sub.name}
                        className="border-l-4 border-(--primary-button) pl-4"
                      >
                        <h4 className="text-md font-semibold">{sub.name}</h4>
                        {sub.description && (
                          <p className="text-(--primary-paragraph)">
                            {sub.description}
                          </p>
                        )}
                        {sub.usage && (
                          <div className="mt-2">
                            <h5 className="text-sm font-medium mb-1">使用例</h5>
                            <pre className="bg-(--primary-card-background) p-3 rounded text-sm">
                              {sub.usage}
                            </pre>
                          </div>
                        )}
                        {sub.example && (
                          <div className="mt-2">
                            <h5 className="text-sm font-medium mb-1">
                              コマンド例
                            </h5>
                            <pre className="bg-(--primary-card-background) p-3 rounded text-sm">
                              {sub.example}
                            </pre>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
