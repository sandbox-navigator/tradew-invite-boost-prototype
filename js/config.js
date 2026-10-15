// 运营可调参数。任务的人数、手数、入金门槛只在这里改，页面文案和规则会跟着变。
const BONUS_TIERS = [
  { id: "new", minScore: 0, bonusPct: 40 },
  { id: "normal", minScore: 30, bonusPct: 30 },
  { id: "active", minScore: 70, bonusPct: 15 },
].sort((a, b) => a.minScore - b.minScore);

// 开局进度由运营配置，默认落在 95%–96%。活动页会展示这笔特殊加成，不展示任务人数和手数。
const DEMO_HISTORY_SCORE = 45;
const OPENING_PROGRESS_PCT = 95;

function bonusFromHistory(score) {
  let picked = BONUS_TIERS[0];
  BONUS_TIERS.forEach((tier) => {
    if (score >= tier.minScore) picked = tier;
  });
  return picked;
}

const ACTIVE_TIER = bonusFromHistory(DEMO_HISTORY_SCORE);

const CONFIG = {
  currency: "USDT",
  rewardCap: 50,
  roundDays: 7,
  cycleDays: 30,
  roundsPerCycle: 1,
  maxBoostPerFriend: 3,
  demoHistoryScore: DEMO_HISTORY_SCORE,
  bonusTiers: BONUS_TIERS,
  bonusTierId: ACTIVE_TIER.id,
  specialBonusPct: OPENING_PROGRESS_PCT,
  boostRange: ["0.005%", "10%"],
  inviteCode: "TW8K2Q9",
  inviteLink: "https://tw.app/r/TW8K2Q9",
  hashtag: "#TWReferralBoost",
  brand: "TW",
  tasks: [
    // 每位好友首次入金计 1 次。minAmount 为 0 表示任意金额。
    { id: "deposit", type: "perFriend", targetPeople: 20, minAmount: 0, enabled: true },
    // 两条捷径取较高值。外汇与非外汇手数分开配置，活动页不展示这些数字。
    { id: "trade", type: "dual", lotsPerFriend: 1, targetLots: 5, headcount: 5, lotsEach: 5, forexLots: 8, nonForexLots: 5 },
    // 旧的单人达标任务不再对用户展示。
    { id: "bigTrade", type: "instant", lots: 5, public: false },
  ],
};
