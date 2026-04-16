import MainGrid from "@/components/dashboard/components/MainGrid";
import type { StatCardProps } from "@/components/dashboard/components/StatCard";
import { dataDB } from "@/lib/db";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = dataDB.collection("messages");

  // 1. 日付範囲と0埋め用のラベル作成
  const now = new Date();
  const daysToShow = 30;

  const dateLabels = Array.from({ length: daysToShow }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (daysToShow - 1 - i));
    return d.toISOString().split("T")[0];
  });

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - (daysToShow - 1));
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  // 2. DB集計
  const dailyStats = await collection
    .aggregate([
      {
        $match: {
          guild_id: id,
          timestamp: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          uniqueUsers: { $addToSet: "$user_id" },
          messageCount: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const statsMap = new Map(
    dailyStats.map((s) => [
      s._id,
      { users: s.uniqueUsers.length, messages: s.messageCount },
    ]),
  );

  // 3. 0埋めデータ
  const userChartData = dateLabels.map(
    (date) => statsMap.get(date)?.users || 0,
  );
  const messageChartData = dateLabels.map(
    (date) => statsMap.get(date)?.messages || 0,
  );

  // 4. 合計の計算
  const totalMessages = messageChartData.reduce((a, b) => a + b, 0);
  const totalActiveUsers = (
    await collection.distinct("user_id", {
      guild_id: id,
      timestamp: { $gte: thirtyDaysAgo },
    })
  ).length;

  // 新規：トレンドとパーセントを同時に計算する関数
  const getTrendInfo = (data: number[]) => {
    const current = data[data.length - 1] || 0; // 今日
    const previous = data[data.length - 2] || 0; // 昨日

    let trend: "up" | "down" | "neutral" = "neutral";
    let percent = 0;

    if (current > previous) trend = "up";
    else if (current < previous) trend = "down";

    // 変化率の計算 ((現在 - 過去) / 過去) * 100
    if (previous === 0) {
      // 過去が0で現在がプラスなら +100% 扱いにする
      percent = current > 0 ? 100 : 0;
    } else {
      const diff = ((current - previous) / previous) * 100;
      const rounded = Math.round(diff * 10) / 10; // 小数点第1位で丸める
      percent = diff > 0 ? rounded : rounded;
    }

    return { trend, percent };
  };

  const userTrend = getTrendInfo(userChartData);
  const messageTrend = getTrendInfo(messageChartData);

  const data: StatCardProps[] = [
    {
      title: "アクティブユーザー数",
      value: totalActiveUsers.toLocaleString(),
      interval: "Last 30 days",
      trend: userTrend.trend,
      percent: userTrend.percent, // ここに計算結果を渡す
      data: userChartData,
    },
    {
      title: "総メッセージ数",
      value: totalMessages.toLocaleString(),
      interval: "Last 30 days",
      trend: messageTrend.trend,
      percent: messageTrend.percent, // ここに計算結果を渡す
      data: messageChartData,
    },
  ];

  return <MainGrid data={data} />;
}
