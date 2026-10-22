const C = CONFIG;
const TASK = Object.fromEntries(C.tasks.map((t) => [t.id, t]));
const visibleTasks = () => C.tasks.filter((task) => task.public !== false && task.enabled !== false);
const DAY = 86400000;
const HOUR = 3600000;
const TOAST_DURATION = 1800;

const clockBase = new Date(2026, 8, 28, 14, 0, 0).getTime();
const loadedAt = Date.now();
const nowMs = () => clockBase + (Date.now() - loadedAt);

const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (ms) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const fmtAmt = (n) => n.toFixed(4);
const fmtPct = (n) => `${Number(n.toFixed(2))}%`;
const fmtLots = (n) => String(Number(n.toFixed(2)));
const lotWord = (n) => (Number(n) === 1 ? "lot" : "lots");
const cur = C.currency;
const openingGiftAmount = (C.rewardCap * C.specialBonusPct) / 100;
const themeName = document.documentElement.dataset.theme || "";
const isV3 = themeName === "v3";
const isAttempt = themeName === "attempt";
let usesDeferredEntry = themeName === "tradew";
const ink = themeName === "tradew" || themeName === "v3"
  ? { stroke: "#000000", muted: "#93959C", soft: "#C6C8CB", gold: "#12C65B", goldDeep: "#009B74", ribbon: "#064843", ink: "#000000", line: "#EFEFF0", line2: "#E2E2E2", empty: "#93959C", emptyFill: "#F6F6F7" }
  : { stroke: "#eaecef", muted: "#848e9c", soft: "#c6ccd4", gold: "#fcd535", goldDeep: "#f0b90b", ribbon: "#b8860b", ink: "#0b0e11", line: "#2b3139", line2: "#3a3f47", empty: "#5e6673", emptyFill: "#1e2329" };

function depositAmountLine(task, lang) {
  if (task.minAmount) {
    return lang === "zh"
      ? `首次入金不低于 ${task.minAmount} ${cur} 才计入。`
      : `A first deposit of at least ${task.minAmount} ${cur} counts.`;
  }
  return lang === "zh" ? "任意金额的首次入金即可计入。" : "A first deposit of any amount counts.";
}

function pctOf(value, target) {
  if (!target) return 0;
  return Math.min(100, (value / target) * 100);
}

const copy = {
  zh: {
    title: "邀请助力",
    tasksTitle: "奖励解锁方式",
    tasksSub: `完成以下任一任务，即可解锁本轮全部${C.rewardCap} ${cur}奖励`,
    rewardTitle: "可获得的奖励",
    rulesLink: "活动规则",
    shareTitle: "分享",
    invite: "邀请好友",
    inviteShort: "邀请",
    rulesTitle: "规则",
    kickerEarned: "您已累积",
    kickerMax: "每轮可得",
    kickerFull: "已集满",
    kickerPaid: "本周期奖励已提现",
    gap: (n) => `还差 <b>${n} ${cur}</b> 即可`,
    withdraw: "提现",
    idleGap: "开启后即可参与本轮活动",
    roundLeft: (t) => `本轮剩余 <b>${t}</b>`,
    roundLen: `每轮持续 ${C.roundDays} 天，未集满则本轮失效`,
    roundDone: "",
    roundEnded: (d) => `上一轮已于 <b>${d}</b> 结束`,
    nextIn: (t) => `距离下一轮开启还有 <b>${t}</b>`,
    dhms: (d, h, m, s) => `${pad(d)}天 ${pad(h)}小时 ${pad(m)}分钟 ${pad(s)}秒`,
    startRound: "开启新一轮",
    withdrawNow: "立即提现",
    waitCycle: "等待下一周期",
    notAllowed: "暂不可参与",
    badgeExpired: "本轮已过期，未发放任何奖励",
    badgeDone: "本轮已完成",
    badgePaid: (n) => `${n} ${cur} 已发放至资金账户`,
    badgeBlocked: "暂不符合参与条件",
    noteExpired: "可立即开启新一轮再次尝试。",
    noteCooldown: `每 ${C.cycleDays} 天最多完成 ${C.roundsPerCycle} 轮，请等待下一周期开启新任务。`,
    noteBlocked: "受限国家/地区用户，以及高级代理（用户代理、商务代理、IB 明星代理）不可参与本活动。",
    blockedEntryTitle: "暂时无法参加此活动",
    blockedEntryText: "由于您所在的国家或地区受到限制，暂时无法参加本活动。您可以前往活动中心查看其他可参与的活动。",
    viewOtherCampaigns: "查看其他活动",
    openingCampaignCenter: "正在前往活动中心（演示）",
    kycNeed: "完成 KYC 认证后即可提现",
    kycOk: "已通过 KYC，可立即提现",
    quick: ["我的邀请", "奖励", "规则"],
    taskN: (i) => `任务 ${i}：`,
    tag: "",
    tagDual: "",
    tagBig: "达标直接解锁 100%",
    done: "已完成",
    todo: "进行中",
    tasks: {
      deposit: {
        title: () => `邀请新好友注册并完成入金`,
        list: () => [
          `邀请好友在平台完成入金，将按活动配置的比例解锁 ${C.rewardCap} ${cur}。`,
        ],
        prog: "已入金好友",
        unit: "人",
      },
      trade: {
        title: () => `邀请新好友在平台交易`,
        list: () => [
          `邀请好友在平台完成交易，将按活动配置的比例解锁 ${C.rewardCap} ${cur}。`,
          "有两种达标方式：累计交易，或一定人数各自交易达标。先完成的即达标，两者不叠加。",
          "外汇和非外汇的达标要求不同。美分、Pro 账户交易量不计入，好友持仓时间不得低于 1 分钟。",
        ],
        prog: "累计计入手数",
        progHeads: "各自交易达标",
        unit: "手",
        unitHeads: "人",
      },
      bigTrade: {
        title: (task) => `邀请 1 位好友在平台交易 ${fmtLots(task.lots)} 手`,
        list: (task) => [
          `任意 1 位受邀好友累计交易满 ${fmtLots(task.lots)} 手，直接解锁 100% 奖励。`,
          "未达标前本任务不加进度。与任务 1、任务 2 互相独立，同一好友本任务最多助力 1 次。",
        ],
        prog: "单个好友最高手数",
        unit: "手",
      },
    },
    rewardHead: `${C.rewardCap} ${cur} 等您赢！`,
    rewardTag: `每 ${C.cycleDays} 天`,
    rewardList: [
      `每 ${C.cycleDays} 天可完成 ${C.roundsPerCycle} 轮，可获得 ${C.rewardCap} ${cur}，每轮持续 ${C.roundDays} 天。`,
      "奖励只在本轮累计集满后发放，领取前需完成 KYC 身份认证。",
      "未在本轮内集满的奖励将过期失效。",
    ],
    rewardInfoTitle: "奖励说明",
    rewardInfo: `<ol class="info-steps">
      <li><span>1</span><p>每完成 1 个任务，进度将按比例解锁。</p></li>
      <li><span>2</span><p>每 ${C.cycleDays} 天最多可完成 ${C.roundsPerCycle} 轮，可获得 ${C.rewardCap} ${cur}。</p></li>
      <li><span>3</span><p>每轮持续 ${C.roundDays} 天，若未能解锁某一轮的全部奖励，该未完成的轮次将过期失效。</p></li>
      <li><span>4</span><p>失效后，可开启新一轮并再次尝试。</p></li>
    </ol>`,
    tabs: ["我的邀请", "我的奖励"],
    ledgerTotal: "本轮累计",
    ledgerGift: "TradeW 新用户赠送",
    ledgerDeposit: (name) => `好友 ${name} 完成入金任务`,
    ledgerTrade: (name) => `好友 ${name} 完成交易任务`,
    ledgerTime: "发生时间",
    ledgerStatus: "状态",
    ledgerBalance: "累计金额",
    ledgerEffective: "已生效",
    ledgerExpired: "本轮已失效",
    syncNotice: "认证和交易状态将在 1 小时内更新，敬请期待！",
    periodSelect: "选择参与轮次",
    from: "来自",
    arrived: "记录时间",
    srcBonus: "平台特殊加成",
    srcTask: { deposit: "入金", trade: "交易", tradeHead: "多人达标", bigTrade: "大额交易" },
    bonusHint: "特殊加成不代表已收到奖励，本轮集满后统一发放。",
    noRound: "尚未开启本轮",
    noInvitees: "暂无邀请人",
    noRewards: "暂无奖励",
    deposited: "已入金",
    notDeposited: "未入金",
    validLots: "有效交易手数",
    rewardNotice: `奖励将在本轮集满 ${C.rewardCap} ${cur} 并完成 KYC 后发放至资金账户。`,
    rewardRec: "邀请助力奖励",
    paidAt: "发放时间",
    completedAt: "完成时间",
    status: "状态",
    paid: "已发放",
    pendingClaim: "待领取",
    rewardRound: "参与轮次",
    joined: (d) => `注册于 ${d}`,
    chips: { deposit: "入金", trade: () => "交易", bigTrade: () => "交易" },
    boosted: "已助力",
    inviteId: "邀请码",
    inviteLink: "邀请链接",
    posterTitle: "通过我的邀请链接加入 TradeW",
    posterSub: "注册并完成任务，开启交易。",
    channels: [
      { id: "fb", name: "Facebook", mark: "f" },
      { id: "wa", name: "WhatsApp", mark: "W" },
      { id: "tg", name: "Telegram", mark: "T" },
      { id: "save", name: "保存图片", mark: "↓" },
    ],
    welcomeKicker: "TradeW 送你",
    welcomeGap: (n) => `距离提现仅差 <b>${n} ${cur}</b>`,
    returnKicker: "距离提现仅差",
    returnHint: "邀请好友，更快获得更多奖励",
    comebackKicker: "上一轮已结束",
    comebackMiss: "没集满，这轮没有奖励",
    comebackGap: (n) => `上一轮还有 <b>${n} ${cur}</b> 未解锁`,
    again: "再来一轮",
    coachGap: (n) => `本轮还差 <b>${n} ${cur}</b>`,
    coachHint: "邀请好友，进度才会增加",
    shortTitle: (n) => `还差 <b>${n} ${cur}</b> 即可提现`,
    shortHint: "邀请好友，更快获得更多奖励",
    decideLater: "稍后决定",
    copied: "已复制",
    opened: (n) => `已打开 ${n}（演示）`,
    saved: "海报已保存到相册（演示）",
    service: "客服功能即将开放",
    back: "返回上一页",
    needRound: "请先开启本轮",
    cantInvite: "当前状态不可邀请",
    lockedWithdraw: `集满 ${C.rewardCap} ${cur} 后才可提现`,
    started: (p) => `新一轮已开启，平台赠送 ${p} 进度加成`,
    fullTitle: "恭喜，本轮已集满！",
    fullText: `您已累积 ${C.rewardCap} ${cur}`,
    goWithdraw: "去提现",
    kycTitle: "需要完成 KYC 认证",
    kycText: "为保障资金安全，提现前需完成 KYC 身份认证。每位用户每月仅可参与一次。",
    later: "稍后",
    goKyc: "去认证",
    kycPassed: "KYC 认证已通过（演示）",
    confirmTitle: "确认提现",
    confirmText: `${C.rewardCap} ${cur} 将发放至您的资金账户。`,
    cancel: "取消",
    confirm: "确认提现",
    paidToast: `${C.rewardCap} ${cur} 已发放`,
    ok: "好的",
    v3Clock: (d, h, m) => (d > 0 ? `还剩 ${d}天${h}小时` : `还剩 ${h}小时${m}分`),
    v3Fast: "当前最快",
    v3Higher: "较高",
    v3LaneLots: "累计手数",
    v3LaneHeads: "各自满手",
    v3Wait: "未集满",
    v3Ready: "可提现",
    v3Paid: "已发放",
    v3WaitNote: "集满后发放，需完成 KYC",
    v3DepositStep: () => "再让 1 位好友入金，进度会增加",
    v3DepositFinish: () => "再让 1 位好友入金，这轮就能提现",
    v3LotStep: () => "再让 1 位好友完成交易，进度会增加",
    v3LotFinish: () => "再让 1 位好友完成交易，这轮就能提现",
    v3HeadStep: () => "再邀请好友完成交易，这条方式才会计入进度",
    v3HeadFinish: () => "再让 1 位好友完成交易，这轮就能提现",
    v3BigFinish: () => "让 1 位好友完成交易，这轮就能提现",
    v3BigStep: () => "让 1 位好友完成交易，进度会增加",
    v3OutDeposit: () => "邀请新好友完成入金",
    v3OutTrade: "有两种方式，先完成的即达标，两者不叠加。",
    v3Coupon: (n) => `${n} ${cur} 奖励券`,
    v3NoFriends: "还没有受邀好友",
    v3MoreFriends: (n) => `还有 ${n} 人`,
    v3OutBig: (lots) => `1 位好友满 ${lots} 手，直接解锁 100%`,
    ticker: (u, n) => `${u} 获得了 <b>${n} ${cur}</b>`,
    rules: () => `
        <h4>1. 如何参与</h4>
        <p>第 1 步：点击"邀请好友"，获取您的专属邀请链接或邀请码。</p>
        <p>第 2 步：将您的邀请链接或邀请码分享给尚未注册 app 的好友。</p>
        <p>第 3 步：当您的受邀好友完成任务后，您的奖励将不断累积。</p>
        <p>第 4 步：继续邀请好友，积攒 ${cur} 并解锁提现权限。</p>
        <h4>2. 轮次与奖励</h4>
        <p>用户每 ${C.cycleDays} 天最多可完成 ${C.roundsPerCycle} 轮，可获得 ${C.rewardCap} ${cur}。每轮持续 ${C.roundDays} 天。若用户未能解锁某一轮的全部奖励，该未完成的轮次将过期失效，不会发放任何奖励。随后，用户可开启新一轮并再次尝试。</p>
        <p class="num"><b>3.</b> ${C.cycleDays} 天内完成 ${C.roundsPerCycle} 轮后需等待下一周期开启新任务。</p>
        <p class="num"><b>4.</b> 各位受邀好友在同一轮次内完成所有必做任务后，方可为您的进度助力。</p>
        <p class="num"><b>5.</b> 美分、Pro 账户交易量不计入有效交易量统计，好友持仓时间不得低于 1 分钟。</p>
        <p class="num"><b>6.</b> 新用户仅能选择一种邀请方式完成注册，通过本邀请链接注册的用户不可重复申请其他邀请奖励。不可与其他邀友活动奖励同享（交易每手返佣 2/3 美金可同享）。</p>
        <p class="num"><b>7.</b> 受限国家/地区用户无法作为邀请人或受邀好友参与本活动。</p>
        <p class="num"><b>8.</b> 平台保留调整活动机制的权利，包括奖励内容、任务要求及活动时间。建议您定期查阅活动页面以获取最新信息。每位用户每月仅可参与一次。</p>
        <p class="num"><b>9.</b> 同一设备或同一用户 ID 不可重复参与。若参与者涉嫌通过同一 IP、同一设备注册多个账户，或存在其他欺诈、恶意行为，平台保留取消其参与资格并撤销奖励的权利。</p>
        <p class="num"><b>10.</b> 高级代理不参与本活动（用户代理及商务代理和 IB 明星代理均不可参与）。</p>
        <p class="foot">最终解释权归本平台所有。</p>`,
  },
  en: {
    title: "Invite Boost",
    tasksTitle: "Ways to Unlock Your Reward",
    tasksSub: `Complete either task to unlock the full ${C.rewardCap} ${cur} reward.`,
    rewardTitle: "Rewards",
    rulesLink: "Campaign rules",
    shareTitle: "Share",
    invite: "Invite Friends",
    inviteShort: "Invite",
    rulesTitle: "Rules",
    kickerEarned: "You've unlocked",
    kickerMax: "Reward per round",
    kickerFull: "Round complete",
    kickerPaid: "Reward paid for this cycle",
    gap: (n) => `Only <b>${n} ${cur}</b> left to`,
    withdraw: "unlock",
    idleGap: "Start a round to join.",
    roundLeft: (t) => `Round ends in <b>${t}</b>`,
    roundLen: `Each round lasts ${C.roundDays} days. Unfinished rounds expire.`,
    roundDone: "",
    roundEnded: (d) => `Last round ended <b>${d}</b>`,
    nextIn: (t) => `Next round opens in <b>${t}</b>`,
    dhms: (d, h, m, s) => `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`,
    startRound: "Start a New Round",
    withdrawNow: "Withdraw Now",
    waitCycle: "Wait for Next Cycle",
    notAllowed: "Not Eligible",
    badgeExpired: "Round expired. No reward was issued.",
    badgeDone: "Round complete",
    badgePaid: (n) => `${n} ${cur} sent to your funding account`,
    badgeBlocked: "You're not eligible for this campaign",
    noteExpired: "You can start a new round right away.",
    noteCooldown: `You can complete one round every ${C.cycleDays} days. Please wait until the next cycle to start again.`,
    noteBlocked: "Users in restricted regions and senior agents (user agents, business agents, IB star agents) can't join.",
    blockedEntryTitle: "This campaign isn't available in your region",
    blockedEntryText: "This campaign is not available in your country or region. Visit the Campaign Center to explore other available campaigns.",
    viewOtherCampaigns: "View Other Campaigns",
    openingCampaignCenter: "Opening Campaign Center (demo)",
    kycNeed: "Pass KYC to withdraw",
    kycOk: "KYC passed. Ready to withdraw.",
    quick: ["My Invites", "Rewards", "Rules"],
    taskN: (i) => `Task ${i}: `,
    tag: "",
    tagDual: "",
    tagBig: "Unlocks 100% instantly",
    done: "Done",
    todo: "In progress",
    tasks: {
      deposit: {
        title: () => "Invite new friends to sign up and make a deposit",
        list: () => [
          `Invite friends to deposit and unlock the ${C.rewardCap} ${cur} reward proportionally under the campaign configuration.`,
        ],
        prog: "Friends deposited",
        unit: "",
      },
      trade: {
        title: () => "Invite new friends to trade",
        list: () => [
          `Invite friends to trade and unlock the ${C.rewardCap} ${cur} reward proportionally under the campaign configuration.`,
          "Two ways: cumulative trading, or a group of friends who each reach the trading target. The one you finish first counts. They don't stack.",
          "Forex and non-forex have different targets. Cent and Pro account volume doesn't count. Positions must be held for more than 1 minute.",
        ],
        prog: "Counted lots",
        progHeads: "Friends who qualified",
        unit: "lots",
        unitHeads: "",
      },
      bigTrade: {
        title: (task) => `Invite 1 friend to trade ${fmtLots(task.lots)} ${lotWord(task.lots)}`,
        list: (task) => [
          `Any single friend who reaches ${fmtLots(task.lots)} ${lotWord(task.lots)} unlocks 100% instantly.`,
          "This task adds nothing before the target. It is independent of Task 1 and Task 2, and each friend can boost it once.",
        ],
        prog: "Top friend's lots",
        unit: "lots",
      },
    },
    rewardHead: `Unlock ${C.rewardCap} ${cur}!`,
    rewardTag: `Once every ${C.cycleDays} days`,
    rewardList: [
      `Complete ${C.roundsPerCycle} round every ${C.cycleDays} days to receive ${C.rewardCap} ${cur}. Each round lasts ${C.roundDays} days.`,
      "Rewards are paid only when the round is full. KYC is required to claim.",
      "Rounds not completed in time expire.",
    ],
    rewardInfoTitle: "About rewards",
    rewardInfo: `<ol class="info-steps">
      <li><span>1</span><p>Each completed task unlocks part of your reward.</p></li>
      <li><span>2</span><p>You can complete one round every ${C.cycleDays} days and receive ${C.rewardCap} ${cur}.</p></li>
      <li><span>3</span><p>Each round lasts ${C.roundDays} days. If you do not unlock the full reward before the round ends, the round expires and no reward is paid.</p></li>
      <li><span>4</span><p>After a round expires, you can start a new round and try again.</p></li>
    </ol>`,
    tabs: ["My Invites", "My Rewards"],
    ledgerTotal: "Round total",
    ledgerGift: "TradeW new-user gift",
    ledgerDeposit: (name) => `Friend ${name} completed the deposit task`,
    ledgerTrade: (name) => `Friend ${name} completed the trading task`,
    ledgerTime: "Time",
    ledgerStatus: "Status",
    ledgerBalance: "Accumulated",
    ledgerEffective: "Effective",
    ledgerExpired: "Round expired",
    syncNotice: "Deposit verification and trading status may take up to 1 hour to update.",
    periodSelect: "Select round",
    from: "From",
    arrived: "Recorded",
    srcBonus: "Platform special boost",
    srcTask: { deposit: "Deposit", trade: "Trade", tradeHead: "Group target", bigTrade: "Big trade" },
    bonusHint: "The special boost isn't a received reward. Rewards are paid when the round is full.",
    noRound: "No active round",
    noInvitees: "No invited friends yet",
    noRewards: "No rewards yet",
    deposited: "Deposited",
    notDeposited: "Not deposited",
    validLots: "Valid trading volume (lots)",
    rewardNotice: `Rewards go to your funding account once the round reaches ${C.rewardCap} ${cur} and KYC is done.`,
    rewardRec: "Invite Boost reward",
    paidAt: "Paid at",
    completedAt: "Completed at",
    status: "Status",
    paid: "Paid",
    pendingClaim: "Ready to Claim",
    rewardRound: "Round",
    joined: (d) => `Registered on ${d}`,
    chips: { deposit: "Deposit", trade: () => "Trade", bigTrade: () => "Trade" },
    boosted: "Boosts",
    inviteId: "Referral code",
    inviteLink: "Referral link",
    posterTitle: "Join TradeW with my referral link!",
    posterSub: "Sign up, complete the required tasks, and start trading.",
    channels: [
      { id: "fb", name: "Facebook", mark: "f" },
      { id: "wa", name: "WhatsApp", mark: "W" },
      { id: "tg", name: "Telegram", mark: "T" },
      { id: "save", name: "Save image", mark: "↓" },
    ],
    welcomeKicker: "TradeW gives you a head start",
    welcomeGap: (n) => `Only <b>${n} ${cur}</b> left to unlock`,
    returnKicker: "Left to unlock",
    returnHint: "Invite friends to unlock your reward faster.",
    comebackKicker: "Your last round has ended",
    comebackMiss: "You did not complete the round, so no reward was issued.",
    comebackGap: (n) => `You had <b>${n} ${cur}</b> left to unlock.`,
    again: "Start another round",
    coachGap: (n) => `<b>${n} ${cur}</b> left to unlock this round`,
    coachHint: "Invite friends to unlock the rest of your reward.",
    shortTitle: (n) => `<b>${n} ${cur}</b> left to unlock`,
    shortHint: "Invite friends to unlock your reward faster.",
    decideLater: "Decide later",
    copied: "Copied",
    opened: (n) => `Opened ${n} (demo)`,
    saved: "Poster saved (demo)",
    service: "Customer service is coming soon",
    back: "Back",
    needRound: "Start a round first",
    cantInvite: "Inviting isn't available right now",
    lockedWithdraw: `Unlock the full ${C.rewardCap} ${cur} before withdrawing.`,
    started: (p) => `Your new round has started with a ${p} head start.`,
    fullTitle: "Round complete!",
    fullText: `You've unlocked ${C.rewardCap} ${cur}.`,
    goWithdraw: "Withdraw",
    kycTitle: "Identity verification required",
    kycText: "Complete KYC verification before withdrawing your reward.",
    later: "Later",
    goKyc: "Verify Now",
    kycPassed: "KYC verification completed",
    confirmTitle: "Confirm withdrawal",
    confirmText: `${C.rewardCap} ${cur} will be credited to your funding account.`,
    cancel: "Cancel",
    confirm: "Confirm",
    paidToast: `${C.rewardCap} ${cur} has been credited`,
    ok: "OK",
    v3Clock: (d, h, m) => (d > 0 ? `${d}d ${h}h left` : `${h}h ${m}m left`),
    v3Fast: "Fastest now",
    v3Higher: "Higher",
    v3LaneLots: "Counted lots",
    v3LaneHeads: "Each at target",
    v3Wait: "Not full",
    v3Ready: "Ready",
    v3Paid: "Paid",
    v3WaitNote: "Paid when full, after KYC",
    v3DepositStep: () => "1 more friend deposit raises your progress",
    v3DepositFinish: () => "1 more friend deposit finishes this round",
    v3LotStep: () => "1 more friend trade raises your progress",
    v3LotFinish: () => "1 more friend trade finishes this round",
    v3HeadStep: () => "More friends need to finish trading before this path counts",
    v3HeadFinish: () => "1 more friend trade finishes this round",
    v3BigFinish: () => "1 friend finishing the trade finishes this round",
    v3BigStep: () => "1 friend finishing the trade raises your progress",
    v3OutDeposit: () => "Invite a new friend to deposit",
    v3OutTrade: "Two ways. The one you finish first counts. They don't stack.",
    v3Coupon: (n) => `${n} ${cur} reward coupon`,
    v3NoFriends: "No invited friends yet",
    v3MoreFriends: (n) => `${n} more`,
    v3OutBig: (lots) => `1 friend at ${lots} unlocks 100%`,
    ticker: (u, n) => `${u} earned <b>${n} ${cur}</b>`,
    rules: () => `
        <h4>1. How to join</h4>
        <p>Step 1: Tap "Invite Friends" to get your referral link or code.</p>
        <p>Step 2: Share it with friends who haven't signed up for the app.</p>
        <p>Step 3: Your reward grows as invited friends finish tasks.</p>
        <p>Step 4: Keep inviting to collect ${cur} and unlock withdrawal.</p>
        <h4>2. Rounds and rewards</h4>
        <p>You can complete up to ${C.roundsPerCycle} round every ${C.cycleDays} days to receive ${C.rewardCap} ${cur}. Each round lasts ${C.roundDays} days. If you don't unlock the full reward, the round expires and nothing is paid. You can then start a new round.</p>
        <p class="num"><b>3.</b> After completing ${C.roundsPerCycle} round in ${C.cycleDays} days, wait for the next cycle to start again.</p>
        <p class="num"><b>4.</b> An invited friend can boost your progress only after finishing every required task in the same round.</p>
        <p class="num"><b>5.</b> Cent and Pro account volume isn't counted. Friends must hold a position for at least 1 minute.</p>
        <p class="num"><b>6.</b> New users can sign up with only one referral method. Users who sign up with this link can't claim other referral rewards. This reward can't be combined with other invite rewards. The $2 or $3 per-lot rebate can still apply.</p>
        <p class="num"><b>7.</b> Users in restricted countries or regions can't join as referrers or invitees.</p>
        <p class="num"><b>8.</b> The platform may adjust rewards, task requirements and campaign dates. Check this page regularly. Each user can join once a month.</p>
        <p class="num"><b>9.</b> The same device or user ID may not participate repeatedly. The platform may disqualify users and revoke rewards for multiple accounts from one IP or device, fraud, or other malicious conduct.</p>
        <p class="num"><b>10.</b> Senior agents can't join (user agents, business agents and IB star agents).</p>
        <p class="foot">The platform reserves the right of final interpretation.</p>`,
  },
};

const state = {
  lang: "zh",
  scene: "active",
  round: null,
  friends: [],
  events: [],
  kyc: false,
  paidAt: null,
  completedAt: null,
  cycleStart: null,
  tab: 0,
  nextId: 1,
  coachSeen: false,
  hasParticipated: false,
  welcomeSeen: false,
  dailyReturnSeen: false,
  comebackAction: null,
  v3Open: null,
  amountRevealed: true,
  entryTimer: null,
  entryPromptOpen: false,
  revealAfterShare: false,
  pendingRevealToast: "",
  suppressDeferredClose: false,
  amountAnimation: null,
};

const t = () => copy[state.lang];
const $ = (id) => document.getElementById(id);

function maskName(seed) {
  const a = (seed * 7 + 3) % 10;
  const b = (seed * 13 + 5) % 10;
  return `${a}*****${b}`;
}

function addFriend(at) {
  const id = state.nextId++;
  const friend = { id, name: maskName(id), joinedAt: at, deposited: false, lots: 0 };
  state.friends.push(friend);
  return friend;
}

function addEvent(friend, task, at, extra = {}) {
  state.events.push({ friendId: friend.id, task, at, seq: state.events.length, lots: 0, kind: "", ...extra });
}

function deposit(friend, at) {
  if (friend.deposited) return;
  friend.deposited = true;
  addEvent(friend, "deposit", at);
}

function trade(friend, lots, at) {
  const before = friend.lots;
  friend.lots += lots;
  const cap = TASK.trade.lotsPerFriend;
  const countedDelta = Math.min(friend.lots, cap) - Math.min(before, cap);
  if (countedDelta > 0.00001) addEvent(friend, "trade", at, { kind: "lots", lots: countedDelta });
  if (before < TASK.trade.lotsEach && friend.lots >= TASK.trade.lotsEach) {
    addEvent(friend, "trade", at, { kind: "head" });
  }
  if (before < TASK.bigTrade.lots && friend.lots >= TASK.bigTrade.lots) addEvent(friend, "bigTrade", at);
}

function progressFromCounts(counts, bonus, extraPct = 0) {
  const depositPct = TASK.deposit.enabled === false ? 0 : pctOf(counts.deposited, TASK.deposit.targetPeople);
  const cumPct = pctOf(counts.countedLots, TASK.trade.targetLots);
  const headPct = TASK.trade.headcount > 0 && counts.heads >= TASK.trade.headcount ? 100 : 0;
  const tradePct = Math.max(cumPct, headPct);
  const bigPct = counts.big ? 100 : 0;
  return {
    total: Math.min(100, bonus + extraPct + depositPct + tradePct + bigPct),
    depositPct,
    tradePct,
    bigPct,
  };
}

function progress() {
  if (!state.round) return { total: 0, bonus: 0, records: [], depositPct: 0, tradePct: 0, bigPct: 0 };
  const bonus = state.round.bonus;
  const extraPct = state.round.extraPct || 0;
  const counts = { deposited: 0, countedLots: 0, heads: 0, big: false };
  let total = bonus + extraPct;
  const records = [];
  [...state.events]
    .sort((a, b) => a.at - b.at || a.seq - b.seq)
    .forEach((ev) => {
      if (ev.task === "deposit") counts.deposited += 1;
      else if (ev.task === "trade" && ev.kind === "head") counts.heads += 1;
      else if (ev.task === "trade") counts.countedLots += ev.lots;
      else if (ev.task === "bigTrade") counts.big = true;
      const next = progressFromCounts(counts, bonus, extraPct).total;
      const gain = next - total;
      total = next;
      if (gain > 0.00001) records.push({ ...ev, gain });
    });
  return { ...progressFromCounts(counts, bonus, extraPct), bonus, extraPct, records };
}

function taskStats() {
  const deposited = state.friends.filter((f) => f.deposited).length;
  const cap = TASK.trade.lotsPerFriend;
  const lots = state.friends.reduce((s, f) => s + Math.min(f.lots, cap), 0);
  const heads = state.friends.filter((f) => f.lots >= TASK.trade.lotsEach).length;
  const topLots = state.friends.reduce((m, f) => Math.max(m, f.lots), 0);
  return {
    deposit: {
      done: TASK.deposit.targetPeople > 0 && deposited >= TASK.deposit.targetPeople,
      bars: [{ labelKey: "prog", value: deposited, target: TASK.deposit.targetPeople, ratio: pctOf(deposited, TASK.deposit.targetPeople) / 100 }],
    },
    trade: {
      done:
        (TASK.trade.targetLots > 0 && lots >= TASK.trade.targetLots) ||
        (TASK.trade.headcount > 0 && heads >= TASK.trade.headcount),
      bars: [
        { labelKey: "prog", value: lots, target: TASK.trade.targetLots, ratio: pctOf(lots, TASK.trade.targetLots) / 100, lots: true },
        { labelKey: "progHeads", value: heads, target: TASK.trade.headcount, ratio: pctOf(heads, TASK.trade.headcount) / 100, people: true },
      ],
    },
    bigTrade: {
      done: TASK.bigTrade.lots > 0 && topLots >= TASK.bigTrade.lots,
      bars: [{ labelKey: "prog", value: topLots, target: TASK.bigTrade.lots, ratio: pctOf(topLots, TASK.bigTrade.lots) / 100, lots: true }],
    },
  };
}

function boostsOf(friend) {
  return new Set(state.events.filter((e) => e.friendId === friend.id).map((e) => e.task)).size;
}

function dhms(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return t().dhms(Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60);
}

const scenes = {
  idle() {},
  active() {
    const start = nowMs() - 2 * DAY - 1.5 * HOUR;
    state.round = {
      start,
      bonus: C.specialBonusPct,
      ledger: [{ type: "gift", amount: openingGiftAmount, at: start }],
    };
    addFriend(start + 5 * HOUR);
    addFriend(start + 30 * HOUR);
  },
  near() {
    const start = nowMs() - C.roundDays * DAY + 20 * HOUR;
    const f1 = addFriend(start + DAY);
    const f2 = addFriend(start + 2 * DAY);
    f1.deposited = true;
    f2.lots = 3;
    addFriend(start + 3 * DAY);
    addFriend(start + 4 * DAY);
    state.round = {
      start,
      bonus: C.specialBonusPct,
      extraPct: 4.5,
      ledger: [
        { type: "gift", amount: openingGiftAmount, at: start },
        { type: "deposit", friendId: f1.id, amount: 1.25, at: start + DAY + HOUR },
        { type: "trade", friendId: f2.id, amount: 1, at: start + 2 * DAY + 2 * HOUR },
      ],
    };
  },
  done() {
    const start = nowMs() - 3 * DAY;
    const f1 = addFriend(start + 4 * HOUR);
    const f2 = addFriend(start + 10 * HOUR);
    f1.deposited = true;
    f2.lots = 5;
    state.round = {
      start,
      bonus: C.specialBonusPct,
      extraPct: 5,
      ledger: [
        { type: "gift", amount: openingGiftAmount, at: start },
        { type: "deposit", friendId: f1.id, amount: 1.25, at: start + 5 * HOUR },
        { type: "trade", friendId: f2.id, amount: 1.25, at: start + 11 * HOUR },
      ],
    };
    state.completedAt = start + 2 * DAY;
    addFriend(start + 18 * HOUR);
  },
  expired() {
    state.coachSeen = false;
    const start = nowMs() - C.roundDays * DAY - 2 * DAY;
    const f = addFriend(start + DAY);
    f.deposited = true;
    state.round = {
      start,
      bonus: C.specialBonusPct,
      extraPct: 2,
      expired: true,
      ledger: [
        { type: "gift", amount: openingGiftAmount, at: start },
        { type: "deposit", friendId: f.id, amount: 1, at: start + DAY + HOUR },
      ],
    };
  },
  cooldown() {
    const start = nowMs() - 9 * DAY;
    const f = addFriend(start + 4 * HOUR);
    f.deposited = true;
    f.lots = 5;
    state.round = {
      start,
      bonus: C.specialBonusPct,
      extraPct: 5,
      ledger: [
        { type: "gift", amount: openingGiftAmount, at: start },
        { type: "trade", friendId: f.id, amount: 2.5, at: start + DAY },
      ],
    };
    state.cycleStart = start;
    state.kyc = true;
    state.paidAt = start + 2 * DAY;
  },
  blocked() {},
};

function applyScene(id) {
  clearTimeout(state.entryTimer);
  cancelAnimationFrame(state.amountAnimation);
  state.suppressDeferredClose = true;
  closeAll();
  state.suppressDeferredClose = false;
  Object.assign(state, {
    scene: id,
    round: null,
    friends: [],
    events: [],
    kyc: false,
    paidAt: null,
    completedAt: null,
    cycleStart: null,
    nextId: 1,
    v3Open: null,
    amountRevealed: !usesDeferredEntry,
    entryPromptOpen: false,
    revealAfterShare: false,
    pendingRevealToast: "",
  });
  scenes[id]();
  document.querySelectorAll("[data-scene]").forEach((b) => b.classList.toggle("is-on", b.dataset.scene === id));
  render();
  if (usesDeferredEntry) beginEntryFlow();
}

function mainAction() {
  const s = state.scene;
  if (s === "idle" || s === "expired") return { label: t().startRound, fn: startRound };
  if (s === "done") return { label: t().withdrawNow, fn: withdrawFlow };
  if (s === "cooldown") return { label: t().waitCycle, disabled: true };
  if (s === "blocked") return { label: t().notAllowed, disabled: true };
  return { label: t().invite, fn: () => open("share") };
}

function startRound(options = {}) {
  hideComeback();
  Object.assign(state, { scene: "active", friends: [], events: [], nextId: 1, hasParticipated: true });
  const start = nowMs();
  state.round = {
    start,
    bonus: C.specialBonusPct,
    ledger: [{ type: "gift", amount: openingGiftAmount, at: start }],
  };
  document.querySelectorAll("[data-scene]").forEach((b) => b.classList.toggle("is-on", b.dataset.scene === "active"));
  render();
  bump();
  if (!state.coachSeen) showCoach();
  else if (options.deferToast) state.pendingRevealToast = t().started(fmtPct(C.specialBonusPct));
  else toast(t().started(fmtPct(C.specialBonusPct)));
}

function roundGap() {
  const amount = (progress().total / 100) * C.rewardCap;
  return C.rewardCap - amount;
}

function hideComeback() {
  const el = $("comeback");
  el.classList.remove("on");
  el.hidden = true;
}

function syncComeback() {
  const L = t();
  const isWelcome = state.scene === "idle" && !state.hasParticipated && !state.welcomeSeen;
  const isDailyReturn =
    (state.scene === "active" || state.scene === "near") &&
    state.round &&
    nowMs() - state.round.start >= DAY &&
    !state.dailyReturnSeen;
  const isExpired = state.scene === "expired";
  if (!isWelcome && !isDailyReturn && !isExpired) {
    hideComeback();
    return;
  }
  const gift = (C.specialBonusPct / 100) * C.rewardCap;
  const gap = C.rewardCap - gift;
  const hand = document.querySelector(".comeback-hand");
  if (isWelcome) {
    $("comeback-kicker").innerHTML = `
      <span class="welcome-logo" aria-hidden="true">
        <svg viewBox="0 0 180 180" role="img">
          <circle cx="90" cy="90" r="89" fill="#10C85B" stroke="#fff" stroke-width="2"/>
          <path d="M39 87 50 116 70 78c5-9 18-9 23 0l13 27 23-48" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="m119 57 22-9 6 24" fill="#fff" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span>${state.lang === "zh" ? "TradeW 送你" : "TradeW gives you a head start"}</span>`;
    $("comeback-amount").innerHTML = `${fmtAmt(gift)}<small>${cur}</small>`;
    $("comeback-miss").innerHTML = L.welcomeGap(fmtAmt(gap));
    $("comeback-gap").textContent =
      state.lang === "zh"
        ? "邀请好友更快解锁更多奖励。"
        : "Invite friends to unlock your reward faster.";
    $("comeback-cta").textContent = L.invite;
    state.comebackAction = () => {
      state.welcomeSeen = true;
      startRound();
      open("share");
    };
  } else if (isDailyReturn) {
    $("comeback-kicker").textContent = L.returnKicker;
    $("comeback-amount").innerHTML = `${fmtAmt(roundGap())}<small>${cur}</small>`;
    $("comeback-miss").textContent = L.returnHint;
    $("comeback-gap").textContent = "";
    $("comeback-cta").textContent = L.invite;
    state.comebackAction = () => {
      state.dailyReturnSeen = true;
      hideComeback();
      open("share");
    };
  } else {
    $("comeback-kicker").textContent = L.comebackKicker;
    $("comeback-amount").innerHTML = `${fmtAmt((progress().total / 100) * C.rewardCap)}<small>${cur}</small>`;
    $("comeback-miss").textContent = L.comebackMiss;
    $("comeback-gap").innerHTML = L.comebackGap(fmtAmt(roundGap()));
    $("comeback-cta").textContent = L.again;
    state.comebackAction = startRound;
  }
  if (hand) hand.hidden = !isDailyReturn;
  const el = $("comeback");
  el.hidden = false;
  el.classList.add("on");
}

function currentDisplayAmount() {
  if (state.scene === "idle" || state.scene === "blocked") return C.rewardCap;
  if (state.scene === "cooldown") return C.rewardCap;
  return (progress().total / 100) * C.rewardCap;
}

function revealAmount() {
  if (!usesDeferredEntry || state.amountRevealed) return;
  state.amountRevealed = true;
  $("device").classList.remove("entry-locked");
  const target = currentDisplayAmount();
  render();
  clearTimeout(tickerTimer);
  if (state.pendingRevealToast) {
    toast(state.pendingRevealToast);
    state.pendingRevealToast = "";
    scheduleTicker(TOAST_DURATION + 5000);
  } else {
    runTicker();
  }
  const amount = $("hero-amount");
  if (!amount) return;
  const started = performance.now();
  const duration = 900;
  const draw = (now) => {
    const ratio = Math.max(0, Math.min(1, (now - started) / duration));
    const eased = 1 - Math.pow(1 - ratio, 3);
    amount.innerHTML = `${fmtAmt(target * eased)}<small>${cur}</small>`;
    if (ratio < 1) state.amountAnimation = requestAnimationFrame(draw);
  };
  state.amountAnimation = requestAnimationFrame(draw);
}

function beginEntryFlow() {
  const L = t();
  $("device").classList.add("entry-locked");
  state.entryTimer = setTimeout(() => {
    $("device").classList.remove("entry-locked");
    const s = state.scene;
    if (s === "idle") {
      const gift = openingGiftAmount;
      const gap = C.rewardCap - gift;
      state.entryPromptOpen = true;
      dialog(
        `<span class="entry-gift-kicker">${state.lang === "zh" ? "TradeW 送你" : "TradeW gives you a head start"}</span>
         <strong class="entry-gift-amount">${fmtAmt(gift)} <small>${cur}</small></strong>`,
        state.lang === "zh"
          ? `<span class="entry-gift-gap">距离提现仅差 <b>${fmtAmt(gap)} ${cur}</b></span>
             <span class="entry-gift-hint">邀请好友更快解锁更多奖励。</span>`
          : `<span class="entry-gift-gap">Only <b>${fmtAmt(gap)} ${cur}</b> left to withdraw</span>
             <span class="entry-gift-hint">Invite friends to unlock your reward faster.</span>`,
        [{
          label: L.invite,
          fn: () => {
            state.coachSeen = true;
            startRound({ deferToast: true });
            state.revealAfterShare = true;
            open("share");
          },
        }],
        { html: true, htmlText: true, entryGift: true }
      );
      return;
    }
    if (s === "expired") {
      const amount = (progress().total / 100) * C.rewardCap;
      const gap = C.rewardCap - amount;
      state.entryPromptOpen = true;
      dialog(
        `<span class="entry-gift-kicker">${L.comebackKicker}</span>
         <strong class="entry-gift-amount">${fmtAmt(amount)} <small>${cur}</small></strong>`,
        `<span class="entry-expired-miss">${L.comebackMiss}</span>
         <span class="entry-gift-hint">${L.comebackGap(fmtAmt(gap))}</span>`,
        [{
          label: L.again,
          fn: () => {
            state.coachSeen = true;
            startRound({ deferToast: true });
            state.revealAfterShare = true;
            open("share");
          },
        }],
        { html: true, htmlText: true, entryGift: true, entryExpired: true }
      );
      return;
    }
    if (s === "active" || s === "near") {
      state.entryPromptOpen = true;
      dialog(L.shortTitle(fmtAmt(roundGap())), L.shortHint, [{
        label: L.invite,
        fn: () => {
          state.revealAfterShare = true;
          open("share");
        },
      }], { html: true });
      return;
    }
    if (s === "blocked") {
      state.entryPromptOpen = true;
      dialog(L.blockedEntryTitle, L.blockedEntryText, [{
        label: L.viewOtherCampaigns,
        keepOpen: true,
        fn: () => toast(L.openingCampaignCenter),
      }], { entryGift: true });
      return;
    }
    revealAmount();
  }, 1000);
}

function hideCoach(markSeen) {
  if (markSeen) state.coachSeen = true;
  const el = $("coach");
  el.classList.remove("on");
  el.hidden = true;
}

function placeCoach() {
  const device = $("device");
  const pop = $("coach-pop");
  const proxy = $("coach-btn");
  const hand = document.querySelector(".coach-hand");
  const dr = device.getBoundingClientRect();
  const main = $("cta-main");
  let left;
  let top;
  let width;
  if (isV3 && main.hidden) {
    const hero = $("hero").getBoundingClientRect();
    left = 16;
    width = dr.width - 32;
    top = hero.bottom - dr.top + 12;
  } else {
    const br = main.getBoundingClientRect();
    width = Math.min(br.width, dr.width - 32);
    left = br.left - dr.left;
    top = br.top - dr.top;
  }
  proxy.style.left = `${left}px`;
  proxy.style.width = `${width}px`;
  proxy.style.right = "auto";
  proxy.style.top = `${top}px`;
  const popHeight = pop.offsetHeight || 72;
  pop.style.top = `${Math.max(72, top - popHeight - 18)}px`;
  hand.style.left = `${Math.min(left + width - 34, dr.width - 56)}px`;
  hand.style.top = `${top + 14}px`;
}

function showCoach() {
  const L = t();
  $("coach-gap").innerHTML = L.coachGap(fmtAmt(roundGap()));
  $("coach-hint").textContent = L.coachHint;
  $("coach-btn").textContent = L.invite;
  const el = $("coach");
  el.hidden = false;
  el.classList.add("on");
  const screen = $("screen");
  if (isV3) screen.scrollTop = 0;
  else {
    const btn = $("cta-main");
    const visibleBottom = screen.scrollTop + screen.clientHeight - 80;
    if (btn.offsetTop > visibleBottom) screen.scrollTop = btn.offsetTop - 220;
  }
  requestAnimationFrame(placeCoach);
}

function syncCoach() {
  if (!$("coach").classList.contains("on")) return;
  const L = t();
  $("coach-gap").innerHTML = L.coachGap(fmtAmt(roundGap()));
  $("coach-hint").textContent = L.coachHint;
  $("coach-btn").textContent = L.invite;
  placeCoach();
}

function withdrawFlow() {
  const L = t();
  dialog(L.confirmTitle, L.confirmText, [
    { label: L.cancel, ghost: true },
    {
      label: L.confirm,
      fn: () => {
        if (!state.completedAt) state.completedAt = nowMs();
        state.paidAt = nowMs();
        state.cycleStart = state.round.start;
        state.scene = "cooldown";
        document.querySelectorAll("[data-scene]").forEach((b) => b.classList.toggle("is-on", b.dataset.scene === "cooldown"));
        render();
        toast(L.paidToast);
      },
    },
  ]);
}

function v3Clock() {
  if (!state.round) return "";
  const sec = Math.max(0, Math.floor((state.round.start + C.roundDays * DAY - nowMs()) / 1000));
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return t().v3Clock(d, h, m);
}

function v3Advice() {
  const L = t();
  const p = progress();
  const stats = taskStats();
  const room = Math.max(0, 100 - p.total);
  if (!state.round || room <= 0 || (state.scene !== "active" && state.scene !== "near")) return { best: null, text: "" };
  const dep = TASK.deposit;
  const tr = TASK.trade;
  const big = TASK.bigTrade;
  const lots = stats.trade.bars[0].value;
  const heads = stats.trade.bars[1].value;
  const cumPct = pctOf(lots, tr.targetLots);
  const headNow = heads >= tr.headcount ? 100 : 0;
  const tradeNow = Math.max(cumPct, headNow);
  const paths = [];
  const push = (item) => {
    if (item.gain > 0.00001) paths.push(item);
  };
  if (!stats.deposit.done && dep.targetPeople) {
    push({ id: "deposit", kind: "deposit", gain: Math.min(room, 100 / dep.targetPeople), now: p.depositPct });
  }
  if (lots < tr.targetLots) {
    const nextTrade = Math.max(pctOf(Math.min(tr.targetLots, lots + tr.lotsPerFriend), tr.targetLots), headNow);
    push({ id: "trade", kind: "lots", gain: Math.min(room, Math.max(0, nextTrade - tradeNow)), now: tradeNow });
  }
  if (heads < tr.headcount) {
    const nextHead = heads + 1 >= tr.headcount ? 100 : 0;
    const left = tr.headcount - heads;
    push({
      id: "trade",
      kind: "heads",
      gain: Math.min(room, Math.max(0, Math.max(cumPct, nextHead) - tradeNow)),
      now: tradeNow,
      left,
    });
  }
  if (!stats.bigTrade.done && TASK.bigTrade.public !== false) {
    const nextTotal = Math.min(100, p.bonus + p.depositPct + p.tradePct + 100);
    push({ id: "bigTrade", kind: "big", gain: Math.max(0, nextTotal - p.total), now: p.bigPct });
  }
  paths.sort((a, b) => b.gain - a.gain || b.now - a.now);
  const best = paths[0] || null;
  if (!best) return { best: null, text: "" };
  const finishes = p.total + best.gain >= 99.999;
  let text = "";
  if (best.kind === "deposit") text = finishes ? L.v3DepositFinish() : L.v3DepositStep();
  else if (best.kind === "lots") text = finishes ? L.v3LotFinish() : L.v3LotStep();
  else if (best.kind === "heads") text = finishes || best.left === 1 ? L.v3HeadFinish() : L.v3HeadStep();
  else text = finishes ? L.v3BigFinish() : L.v3BigStep();
  return { best, text };
}

function v3Person(friend) {
  return `<span class="person">
    <span class="face" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.2" fill="#12c65b"/><path d="M5.2 19.2c1.1-3.3 3.5-5 6.8-5s5.7 1.7 6.8 5" fill="#12c65b"/></svg></span>
    <span class="person-name">${friend.name}</span>
  </span>`;
}

function v3Faces() {
  const all = state.friends;
  if (!all.length) {
    return `<button type="button" class="faces is-none" id="face-row">${t().v3NoFriends}</button>`;
  }
  const shown = all.length > 4 ? all.slice(0, 4) : all;
  const extra = all.length - shown.length;
  const more = extra ? `<span class="person-more">${t().v3MoreFriends(extra)}</span>` : "";
  return `<button type="button" class="faces" id="face-row">${shown.map(v3Person).join("")}${more}</button>`;
}

function syncV3Action() {
  const action = mainAction();
  const dockOnly = state.scene === "active" || state.scene === "near";
  $("cta-main").hidden = dockOnly;
  [$("cta-main"), $("cta-dock")].forEach((btn) => {
    btn.textContent = action.label;
    btn.disabled = !!action.disabled;
    btn.onclick = action.fn || null;
  });
  $("dock").classList.toggle("on", dockOnly);
  const note = $("cta-note");
  const notes = { expired: t().noteExpired, cooldown: t().noteCooldown, blocked: t().noteBlocked };
  note.hidden = !notes[state.scene];
  note.textContent = notes[state.scene] || "";
}

function renderHeroV3() {
  const L = t();
  const s = state.scene;
  const p = progress();
  const amount = (p.total / 100) * C.rewardCap;
  const left = C.rewardCap - amount;
  const hero = $("hero");
  hero.classList.toggle("is-muted", s === "expired" || s === "blocked");
  const advice = v3Advice();
  let kicker = L.kickerEarned;
  let amt = fmtAmt(amount);
  let gap = "";
  let badge = "";
  let next = advice.text ? `<p class="hero-next">${advice.text}</p>` : "";
  let chip = "";
  if (s === "idle" || s === "blocked") {
    kicker = L.kickerMax;
    amt = String(C.rewardCap);
    next = s === "idle" ? `<p class="hero-next">${L.idleGap}</p>` : "";
    if (s === "blocked") badge = `<span class="hero-badge">${L.badgeBlocked}</span>`;
  } else if (s === "active" || s === "near" || s === "expired") {
    if (s !== "expired") gap = `<p class="hero-gap">${L.gap(fmtAmt(left))}<button type="button" class="link" id="gap-withdraw">${L.withdraw}</button></p>`;
    if (s === "active" || s === "near") chip = `<span class="time-chip" id="time-chip">${v3Clock()}</span>`;
    if (s === "expired") badge = `<span class="hero-badge">${L.badgeExpired}</span>`;
  } else if (s === "done") {
    kicker = L.kickerFull;
    gap = `<p class="hero-gap">${state.kyc ? L.kycOk : L.kycNeed}</p>`;
    badge = `<span class="hero-badge ok">${L.badgeDone}</span>`;
  } else if (s === "cooldown") {
    kicker = L.kickerPaid;
    amt = fmtAmt(C.rewardCap);
    badge = `<span class="hero-badge ok">${L.badgePaid(C.rewardCap)}</span>`;
  }
  const faces = s === "blocked" ? "" : v3Faces();
  hero.innerHTML = `
    <p class="hero-kicker">${kicker}</p>
    <div class="hero-row"><p class="hero-amount">${amt}<small>${cur}</small></p>${chip}</div>
    ${next}${gap}${badge}${faces}`;
  const gw = $("gap-withdraw");
  if (gw) {
    gw.addEventListener("click", () => {
      dialog(L.shortTitle(fmtAmt(roundGap())), L.shortHint, [
        { label: L.invite, fn: () => open("share") },
        { label: L.decideLater, later: true },
      ], { stack: true, html: true });
    });
  }
  const facesBtn = $("face-row");
  if (facesBtn) facesBtn.addEventListener("click", () => openMy(0));
  syncV3Action();
}

function renderHero() {
  if (isV3) return renderHeroV3();
  const L = t();
  const s = state.scene;
  const p = progress();
  const amount = (p.total / 100) * C.rewardCap;
  const left = C.rewardCap - amount;
  const hero = $("hero");
  hero.classList.toggle("is-muted", s === "expired" || s === "blocked");

  let kicker = L.kickerEarned;
  let amt = fmtAmt(amount);
  let gap = "";
  let badge = "";

  if (s === "idle" || s === "blocked") {
    kicker = L.kickerMax;
    amt = String(C.rewardCap);
    gap = s === "idle" ? `<p class="hero-gap">${L.idleGap}</p>` : "";
    if (s === "blocked") badge = `<span class="hero-badge">${L.badgeBlocked}</span>`;
  } else if (s === "active" || s === "near" || s === "expired") {
    gap =
      s === "expired"
        ? ""
        : `<p class="hero-gap">${L.gap(fmtAmt(left))}<button type="button" class="link" id="gap-withdraw">${L.withdraw}</button></p>`;
    if (s === "expired") badge = `<span class="hero-badge">${L.badgeExpired}</span>`;
  } else if (s === "done") {
    kicker = L.kickerFull;
    badge = `<span class="hero-badge ok">${L.badgeDone}</span>`;
  } else if (s === "cooldown") {
    kicker = L.kickerPaid;
    amt = fmtAmt(C.rewardCap);
    badge = `<span class="hero-badge ok">${L.badgePaid(C.rewardCap)}</span>`;
  }

  if (usesDeferredEntry && !state.amountRevealed) {
    kicker = L.kickerEarned;
    amt = fmtAmt(0);
    gap = "";
    badge = "";
  }

  hero.innerHTML = `
    <p class="hero-kicker">${kicker}</p>
    <p class="hero-amount" id="hero-amount">${amt}<small>${cur}</small></p>
    ${gap}${badge}`;

  const gw = $("gap-withdraw");
  if (gw) {
    gw.addEventListener("click", () => {
      dialog(L.shortTitle(fmtAmt(roundGap())), L.shortHint, [
        { label: L.invite, fn: () => open("share") },
        { label: L.decideLater, later: true },
      ], { stack: true, html: true });
    });
  }
  const action = mainAction();
  [$("cta-main"), $("cta-dock")].forEach((btn) => {
    btn.textContent = action.label;
    btn.disabled = !!action.disabled;
    btn.onclick = action.fn || null;
  });

  const note = $("cta-note");
  const notes = { expired: L.noteExpired, cooldown: L.noteCooldown, blocked: L.noteBlocked };
  note.hidden = !notes[s];
  note.textContent = notes[s] || "";
}

function renderTime() {
  const L = t();
  const s = state.scene;
  const el = $("round-time");
  const now = nowMs();
  if (isV3 && (s === "active" || s === "near")) {
    el.hidden = true;
    const chip = $("time-chip");
    if (chip) chip.textContent = v3Clock();
    return;
  }
  el.hidden = s === "done";
  if (s === "active" || s === "near") {
    el.innerHTML = L.roundLeft(dhms(state.round.start + C.roundDays * DAY - now));
  } else if (s === "done") {
    el.innerHTML = "";
  } else if (s === "expired") {
    el.innerHTML = L.roundEnded(fmtDate(state.round.start + C.roundDays * DAY));
  } else if (s === "cooldown") {
    el.innerHTML = L.nextIn(dhms(state.cycleStart + C.cycleDays * DAY - now));
  } else {
    el.innerHTML = L.roundLen;
  }
}

const quickIcons = [
  `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="6.5" r="3.2" stroke="${ink.stroke}" stroke-width="1.6"/><path d="M2.5 16.5c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" stroke="${ink.stroke}" stroke-width="1.6" stroke-linecap="round"/><path d="M15.5 6v5M13 8.5h5" stroke="${ink.stroke}" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="8" width="14" height="9" rx="1.5" stroke="${ink.stroke}" stroke-width="1.6"/><path d="M2 5.5h16V8H2zM10 5.5V17" stroke="${ink.stroke}" stroke-width="1.6"/><path d="M10 5.5C8.5 2.5 5.5 3 6.5 5.5M10 5.5c1.5-3 4.5-2.5 3.5 0" stroke="${ink.stroke}" stroke-width="1.6"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5c2.5-.8 4.8-.5 7 1 2.2-1.5 4.5-1.8 7-1v11c-2.5-.8-4.8-.5-7 1-2.2-1.5-4.5-1.8-7-1v-11Z" stroke="${ink.stroke}" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 5.5v11" stroke="${ink.stroke}" stroke-width="1.6"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 17.5V3" stroke="${ink.stroke}" stroke-width="1.6" stroke-linecap="round"/><path d="M5 3.5h10l-2.2 3.5L15 10.5H5" stroke="${ink.stroke}" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
];

function renderQuick() {
  const L = t();
  const count = state.friends.length;
  const targets = [
    () => openMy(0),
    () => openMy(1),
    () => open("rules"),
  ];
  $("quick").innerHTML = L.quick
    .map(
      (label, i) => `
      <button type="button" data-q="${i}">
        <span class="q-ico">${quickIcons[i]}${i === 0 && count ? `<span class="q-dot">${count}</span>` : ""}</span>
        ${label}
      </button>`
    )
    .join("");
  $("quick").querySelectorAll("[data-q]").forEach((b) => b.addEventListener("click", targets[b.dataset.q]));
}

function renderTasksV3() {
  const L = t();
  const stats = taskStats();
  const advice = v3Advice();
  const p = progress();
  const scoreOf = { deposit: p.depositPct, trade: p.tradePct, bigTrade: p.bigPct };
  const ranked = ["deposit", "trade", "bigTrade"]
    .filter((id) => state.round && !stats[id].done)
    .sort((a, b) => scoreOf[b] - scoreOf[a]);
  const fastId = ranked.length && scoreOf[ranked[0]] > 0 ? ranked[0] : advice.best && advice.best.id;
  const tr = TASK.trade;
  const lots = stats.trade.bars[0].value;
  const heads = stats.trade.bars[1].value;
  const cumPct = pctOf(lots, tr.targetLots);
  const headNow = heads >= tr.headcount ? 100 : 0;
  const higher = cumPct > headNow ? "lots" : headNow > cumPct ? "heads" : "";
  $("tasks-sub").textContent = L.tasksSub;
  const shownTasks = visibleTasks();
  $("task-track").innerHTML = shownTasks
    .map((task, i) => {
      const tc = L.tasks[task.id];
      const st = stats[task.id];
      const done = st.done && !!state.round;
      const fast = !done && fastId === task.id;
      const open = state.v3Open === task.id;
      const outcome =
        task.id === "deposit"
          ? L.v3OutDeposit()
          : task.id === "trade"
            ? L.v3OutTrade
            : L.v3OutBig(fmtLots(task.lots));
      let meters = "";
      if (task.id === "trade") {
        const lotRatio = Math.min(1, stats.trade.bars[0].ratio);
        const headRatio = Math.min(1, heads / tr.headcount);
        meters = `<div class="lanes">
          <div class="lane${higher === "lots" ? " is-higher" : ""}"><span>${L.v3LaneLots}${higher === "lots" ? ` <em>${L.v3Higher}</em>` : ""}</span><div class="track"><i style="width:${lotRatio * 100}%"></i></div></div>
          <div class="lane${higher === "heads" ? " is-higher" : ""}"><span>${L.v3LaneHeads}${higher === "heads" ? ` <em>${L.v3Higher}</em>` : ""}</span><div class="track"><i style="width:${headRatio * 100}%"></i></div></div>
        </div>`;
      } else {
        const bar = st.bars[0];
        const value = bar.lots ? fmtLots(bar.value) : String(bar.value);
        const target = bar.lots ? fmtLots(bar.target) : String(bar.target);
        meters = `<div class="mission-meter"><span>${tc[bar.labelKey]}</span><div class="track"><i style="width:${Math.min(1, bar.ratio) * 100}%"></i></div></div>`;
      }
      const mark = done ? `<span class="mission-done">${L.done}</span>` : fast ? `<span class="mission-fast">${L.v3Fast}</span>` : "";
      const prefix = shownTasks.length === 1 ? (state.lang === "zh" ? "任务：" : "Task: ") : L.taskN(i + 1);
      return `<article class="mission${fast ? " is-fast" : ""}${done ? " is-done" : ""}">
        <button type="button" class="mission-toggle" data-mission="${task.id}" aria-expanded="${open}">
          <div class="mission-top"><h3>${prefix}${tc.title(task)}</h3>${mark}</div>
          <p class="mission-outcome">${outcome}</p>
        </button>
        <div class="mission-meters">${meters}</div>
        <ul class="mission-detail"${open ? "" : " hidden"}>${tc.list(task).map((li) => `<li>${li}</li>`).join("")}</ul>
      </article>`;
    })
    .join("");
  $("task-dots").innerHTML = "";
  $("task-track").querySelectorAll("[data-mission]").forEach((btn) =>
    btn.addEventListener("click", () => {
      state.v3Open = state.v3Open === btn.dataset.mission ? null : btn.dataset.mission;
      renderTasks();
    })
  );
}

function renderTasks() {
  if (isV3) return renderTasksV3();
  const L = t();
  $("tasks-sub").textContent = L.tasksSub;
  const shownTasks = visibleTasks();
  $("task-track").classList.add("is-task-list");
  const rows = shownTasks
    .map((task, i) => {
      const tc = L.tasks[task.id];
      const taskNo = task.id === "deposit" ? 1 : 2;
      const label =
        shownTasks.length === 1
          ? state.lang === "zh" ? "方式" : "Option"
          : state.lang === "zh" ? `方式 ${taskNo}` : `Option ${taskNo}`;
      return `
        <div class="task-list-row">
          <span class="task-list-index">${label}</span>
          <h3>${tc.title(task)}</h3>
        </div>`;
    })
    .join("");
  $("task-track").innerHTML = `
    <article class="task-list-card">
      ${rows}
      <p class="task-list-note">${state.lang === "zh" ? `邀请更多好友加速解锁${C.rewardCap}${cur}` : `Invite more friends to unlock ${C.rewardCap} ${cur} faster.`}</p>
    </article>`;
  $("task-dots").innerHTML = "";
}

function renderRewardV3() {
  const L = t();
  const s = state.scene;
  let status = L.v3Wait;
  let note = L.v3WaitNote;
  let klass = "is-wait";
  if (state.paidAt || s === "cooldown") {
    status = L.v3Paid;
    note = L.badgePaid(C.rewardCap);
    klass = "is-paid";
  } else if (s === "done") {
    status = L.v3Ready;
    note = state.kyc ? L.kycOk : L.kycNeed;
    klass = "is-ready";
  }
  const ticket = `
    <svg class="coupon-art" viewBox="0 0 148 92" aria-hidden="true">
      <g transform="translate(18 14) rotate(8 55 34)">
        <path d="M22 6h74a8 8 0 0 1 8 8v10a9 9 0 0 0 0 18v10a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V42a9 9 0 0 0 0-18V14a8 8 0 0 1 8-8z" fill="#f7f7f7" stroke="#1a1a1a" stroke-width="2"/>
      </g>
      <g transform="translate(6 8) rotate(-7 55 36)">
        <path d="M22 8h74a8 8 0 0 1 8 8v10a9 9 0 0 0 0 18v10a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V44a9 9 0 0 0 0-18V16a8 8 0 0 1 8-8z" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
      </g>
      <path d="M34 22h80a8 8 0 0 1 8 8v8a10 10 0 0 0 0 20v8a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8V58a10 10 0 0 0 0-20v-8a8 8 0 0 1 8-8z" fill="#fff" stroke="#1a1a1a" stroke-width="2.2"/>
      <rect x="48" y="34" width="52" height="30" rx="2" fill="#f5c518" stroke="#1a1a1a" stroke-width="2"/>
      <path d="M74 38c1 6 4 8 10 10-6 1.2-9 4-10 10-1-6-4-8.8-10-10 6-2 9-4 10-10z" fill="#1a1a1a"/>
    </svg>`;
  $("reward-card").innerHTML = `
    <div class="coupon ${klass}">
      <button type="button" class="icon-btn info" id="reward-info" aria-label="Info">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.8" stroke="${ink.muted}" stroke-width="1.3"/><path d="M8 7.2v4" stroke="${ink.muted}" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5" r=".9" fill="${ink.muted}"/></svg>
      </button>
      <div class="coupon-art-wrap">${ticket}</div>
      <p class="coupon-title">${L.v3Coupon(C.rewardCap)}</p>
      <span class="coupon-pill">${status}</span>
      <p class="coupon-note">${note}</p>
    </div>`;
  $("reward-info").addEventListener("click", () => dialog(L.rewardInfoTitle, L.rewardInfo, [{ label: L.ok }], { htmlText: true }));
}

function renderReward() {
  if (isV3) return renderRewardV3();
  const L = t();
  $("reward-card").innerHTML = `
    <button type="button" class="icon-btn info" id="reward-info" aria-label="Info">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.8" stroke="${ink.muted}" stroke-width="1.3"/><path d="M8 7.2v4" stroke="${ink.muted}" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5" r=".9" fill="${ink.muted}"/></svg>
    </button>
    <svg class="reward-gift" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="8" y="20" width="24" height="18" rx="2" fill="${ink.goldDeep}"/><rect x="6" y="15" width="28" height="7" rx="1.5" fill="${ink.gold}"/>
      <rect x="18" y="15" width="4" height="23" fill="${ink.ribbon}"/>
      <path d="M20 15c-4-6-9-4-7 0M20 15c4-6 9-4 7 0" stroke="${ink.gold}" stroke-width="2"/>
      <circle cx="33" cy="12" r="7" fill="#2b6fd6"/><text x="33" y="15.5" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">$</text>
    </svg>
    <p class="reward-title">${L.rewardHead}<span>${L.rewardTag}</span></p>`;
  $("reward-info").addEventListener("click", () => dialog(L.rewardInfoTitle, L.rewardInfo, [{ label: L.ok }], { htmlText: true }));
}

function rotatorNotice() {
  const L = t();
  return `<div class="notice-rotator-wrap"><div class="notice"><span class="notice-line is-on">${L.syncNotice}</span></div></div>`;
}

let noticeTimer;
function startNoticeRotator() {
  clearInterval(noticeTimer);
  const box = document.querySelector("[data-rotator]");
  if (!box) return;
  const lines = [...box.querySelectorAll(".notice-line")];
  const dots = [...document.querySelectorAll("[data-notice-dots] i")];
  const scrollers = [box.closest(".sheet-body"), document.querySelector(".screen")].filter(Boolean);
  let index = 0;
  const pin = () => scrollers.map((el) => [el, el.scrollTop]);
  const restore = (saved) => saved.forEach(([el, top]) => {
    if (el.scrollTop !== top) el.scrollTop = top;
  });
  noticeTimer = setInterval(() => {
    const saved = pin();
    lines[index].classList.remove("is-on");
    dots[index].classList.remove("on");
    index = (index + 1) % lines.length;
    lines[index].classList.add("is-on");
    dots[index].classList.add("on");
    restore(saved);
    requestAnimationFrame(() => restore(saved));
  }, 2000);
}

function renderMy() {
  const L = t();
  $("my-tabs").innerHTML = L.tabs
    .map((label, i) => `<button type="button" role="tab" data-tab="${i}" class="${i === state.tab ? "on" : ""}" aria-selected="${i === state.tab}">${label}</button>`)
    .join("");
  $("my-tabs").querySelectorAll("[data-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      state.tab = Number(b.dataset.tab);
      renderMy();
    })
  );

  const body = $("my-body");
  const emptyIco =
    `<svg width="40" height="44" viewBox="0 0 40 44" fill="none"><rect x="7" y="4" width="26" height="34" rx="3" stroke="${ink.empty}" stroke-width="2"/><path d="M13 13h14M13 19h10" stroke="${ink.empty}" stroke-width="2" stroke-linecap="round"/><circle cx="29" cy="34" r="6" fill="${ink.emptyFill}" stroke="${ink.empty}" stroke-width="2"/><path d="M29 31.5v3" stroke="${ink.empty}" stroke-width="2" stroke-linecap="round"/></svg>`;
  const empty = (text, withBtn) =>
    `<div class="empty">${emptyIco}${text}${withBtn ? `<br /><button type="button" class="cta" data-open="share">${L.invite}</button>` : ""}</div>`;

  if (state.tab === 0) {
    const period = state.round
      ? `
      <label class="period-select">
        <span>${L.periodSelect}</span>
        <select aria-label="${L.periodSelect}">
          <option>${fmtDate(state.round.start)} – ${fmtDate(state.round.start + C.roundDays * DAY)}</option>
          <option>2026-09-22 10:11 – 2026-09-29 10:11</option>
        </select>
      </label>`
      : "";
    if (!state.friends.length) {
      body.innerHTML = `${period}${rotatorNotice()}${empty(L.noInvitees, true)}`;
      startNoticeRotator();
      return;
    }
    body.innerHTML =
      period +
      rotatorNotice() +
      [...state.friends]
        .reverse()
        .map((f) => {
          return `
            <div class="friend">
              <div class="friend-main">
                <p class="friend-name">${f.name}</p>
                <p class="friend-date">${L.joined(fmtDate(f.joinedAt))}</p>
                <div class="chips"><span class="${f.deposited ? "ok" : ""}">${f.deposited ? L.deposited : L.notDeposited}</span></div>
              </div>
              <div class="boost-count">${L.validLots}<b>${fmtLots(f.lots)}</b></div>
            </div>`;
        })
        .join("");
    startNoticeRotator();
    return;
  }

  const notice = rotatorNotice();
  const isCompleted = state.scene === "done" || !!state.completedAt;
  if (!state.paidAt && !isCompleted) {
    body.innerHTML = notice + empty(L.noRewards);
    startNoticeRotator();
    return;
  }
  const rewardTime = state.paidAt || state.completedAt || nowMs();
  const rewardStatus = state.paidAt ? L.paid : L.pendingClaim;
  const timeLabel = state.paidAt ? L.paidAt : L.completedAt;
  body.innerHTML = `${notice}
    <div class="rec">
      <div class="rec-row"><b>${L.rewardRec}</b><b class="up">+${fmtAmt(C.rewardCap)} ${cur}</b></div>
      <div class="rec-row"><span>${L.rewardRound}</span><b>${fmtDate(state.round.start)} – ${fmtDate(state.round.start + C.roundDays * DAY)}</b></div>
      <div class="rec-row"><span>${L.status}</span><b>${rewardStatus}</b></div>
      <div class="rec-row"><span>${timeLabel}</span><b>${fmtDate(rewardTime)}</b></div>
    </div>`;
  startNoticeRotator();
}

function qrSvg(text) {
  const n = 21;
  let seed = [...text].reduce((s, ch) => (s * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) >>> 16) & 1;
  const finder = (x, y) => {
    const inBox = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
      if (inBox(ox, oy)) {
        const dx = x - ox;
        const dy = y - oy;
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
      }
    }
    return -1;
  };
  let rects = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y);
      if (f === 1 || (f === -1 && rand())) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  }
  return `<svg class="qr" viewBox="0 0 ${n} ${n}" fill="${ink.ink}" shape-rendering="crispEdges">${rects}</svg>`;
}

function channelIcon(id) {
  const icons = {
    fb: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M14.2 8.2V6.6c0-.8.5-1 1-1h2.5V1.8L14.3 1.7c-3.4 0-5.1 2-5.1 5.3v1.2H6v4.3h3.2V22h5v-9.5h3.4l.6-4.3h-4Z"/></svg>`,
    wa: `<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="#25D366"/><path fill="#fff" d="M22 10.2a11.6 11.6 0 0 0-10 17.4l-1.6 5.8 6-1.6A11.6 11.6 0 1 0 22 10.2Zm6.6 16.3c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.2-4.3-1-3.6-1.5-5.9-5.2-6.1-5.4-.2-.3-1.5-2-1.5-3.8s.9-2.7 1.3-3.1.6-.5 1-.5h.7c.2 0 .5 0 .8.6.3.8 1 2.7 1.1 2.9.1.2.1.5 0 .8-.2.3-.3.5-.5.8l-.4.4c-.2.2-.3.4-.1.7.3.5 1.2 2 2.6 3.2 1.8 1.5 3.3 1.9 3.8 2.1.4.2.6.1.8-.2.3-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2l2.5 1.2c.3.1.5.3.6.5.1.4 0 1.1-.3 1.9Z"/></svg>`,
    tg: `<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="#2AABEE"/><path fill="#fff" d="M31.2 13.6 9.6 21.8c-1.5.6-1.5 1.4-.3 1.8l5.5 1.7 12.8-8.1c.6-.4 1.2-.2.7.3L16.8 26.6l-.4 5.6c.5 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .6 1.7.3 2-.9l3.8-17.8c.4-1.6-.6-2.3-1.9-1.9Z"/></svg>`,
    save: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5v9" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><path d="m8.2 10.2 3.8 3.8 3.8-3.8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 17.5h12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  };
  return icons[id] || "";
}

function renderShare() {
  const L = t();
  $("poster").innerHTML = `
    <h3>${L.posterTitle}</h3>
    <p>${L.posterSub}</p>
    <p class="tag">${C.hashtag}</p>
    <div class="poster-art">
      <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
        <circle cx="90" cy="62" r="52" stroke="${ink.line}" stroke-dasharray="3 5"/>
        <circle cx="90" cy="62" r="34" stroke="${ink.line2}"/>
        <circle cx="90" cy="62" r="22" fill="${ink.gold}"/>
        <circle cx="90" cy="56" r="6" fill="${ink.ink}"/>
        <path d="M79 72c2-5 6-7 11-7s9 2 11 7" fill="${ink.ink}"/>
        <path d="M150 20l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="${ink.gold}"/>
        <path d="M34 78l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="${ink.gold}"/>
        <circle cx="40" cy="30" r="2" fill="${ink.goldDeep}"/>
      </svg>
    </div>
    <div class="poster-foot">
      <span class="logo"><img src="img/tradew.png?v=26" alt="" />TradeW</span>
      ${qrSvg(C.inviteLink)}
    </div>`;

  const copyIco =
    `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8.5" height="8.5" rx="1.5" stroke="${ink.stroke}" stroke-width="1.3"/><path d="M10 4V2.8c0-.7-.6-1.3-1.3-1.3H2.8c-.7 0-1.3.6-1.3 1.3v5.9c0 .7.6 1.3 1.3 1.3H4" stroke="${ink.stroke}" stroke-width="1.3"/></svg>`;
  $("share-body").innerHTML = `
    <div class="share-field"><span>${L.inviteId}</span><button type="button" data-copy="${C.inviteCode}"><em>${C.inviteCode}</em>${copyIco}</button></div>
    <div class="share-field"><span>${L.inviteLink}</span><button type="button" data-copy="${C.inviteLink}"><em>${C.inviteLink}</em>${copyIco}</button></div>
    <div class="channels">${L.channels.map((c) => `<button type="button" data-ch="${c.id}"><i class="ch-${c.id}">${channelIcon(c.id)}</i>${c.name}</button>`).join("")}</div>`;

  $("share-body").querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => copyText(b.dataset.copy)));
  $("share-body").querySelectorAll("[data-ch]").forEach((b) =>
    b.addEventListener("click", () => {
      const channel = L.channels.find((c) => c.id === b.dataset.ch);
      if (!channel) return;
      if (channel.id === "copy") copyText(C.inviteLink);
      else if (channel.id === "save") toast(L.saved);
      else toast(L.opened(channel.name));
    })
  );
}

function copyText(text) {
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  toast(t().copied);
}

function renderStatic() {
  const L = t();
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = L[el.dataset.i18n];
  });
  $("rules-body").innerHTML = L.rules();
}

function render() {
  renderStatic();
  renderHero();
  renderTime();
  renderQuick();
  renderTasks();
  renderReward();
  renderMy();
  renderShare();
  if (usesDeferredEntry) hideComeback();
  else syncComeback();
  syncCoach();
  syncConfetti();
}

function syncConfetti() {
  const box = $("confetti");
  if (!box) return;
  if (state.scene !== "done") {
    box.hidden = true;
    box.innerHTML = "";
    state.confettiPlayed = false;
    return;
  }
  if (state.confettiPlayed) return;
  state.confettiPlayed = true;
  const colors = ["#f6d36a", "#fff4c8", "#12c65b", "#ffe08a", "#7dcea0"];
  box.innerHTML = Array.from({ length: 32 }, (_, i) => {
    const x = (i - 15.5) * 16;
    const y = 160 + (i % 7) * 52;
    const r = (i % 2 ? 1 : -1) * (40 + i * 9);
    return `<i style="--x:${x}px;--y:${y}px;--r:${r}deg;background:${colors[i % colors.length]};animation-delay:${(i % 8) * 0.035}s"></i>`;
  }).join("");
  box.hidden = false;
}

function bump() {
  const hero = $("hero");
  hero.classList.remove("bump");
  void hero.offsetWidth;
  hero.classList.add("bump");
}

// overlays
const overlay = $("overlay");
const sheets = { share: $("sheet-share"), my: $("sheet-my"), rules: $("sheet-rules") };

function closeAll() {
  const shareWasOpen = sheets.share.classList.contains("on");
  Object.values(sheets).forEach((s) => s.classList.remove("on"));
  $("poster").classList.remove("on");
  $("dialog").classList.remove("on");
  overlay.classList.remove("on");
  hideCoach(false);
  if (usesDeferredEntry && shareWasOpen && state.revealAfterShare && !state.suppressDeferredClose) {
    state.revealAfterShare = false;
    revealAmount();
  }
}

function open(name) {
  if (name === "share" && !(state.scene === "active" || state.scene === "near")) {
    toast(state.scene === "idle" || state.scene === "expired" ? t().needRound : t().cantInvite);
    return;
  }
  if (name === "share") hideCoach(true);
  closeAll();
  $("ticker").classList.remove("is-down");
  sheets[name].classList.add("on");
  if (name === "share") {
    $("poster").classList.add("on");
    placePoster();
  }
  overlay.classList.add("on");
}

function placePoster() {
  const poster = $("poster");
  const sheetH = $("sheet-share").offsetHeight;
  poster.style.top = "auto";
  poster.style.bottom = `${sheetH + 28}px`;
}

function openMy(tab) {
  state.tab = tab;
  renderMy();
  open("my");
}

function dialog(title, text, actions, opts = {}) {
  closeAll();
  $("dialog").classList.toggle("entry-gift", !!opts.entryGift);
  $("dialog").classList.toggle("entry-expired", !!opts.entryExpired);
  const titleEl = $("dialog-title");
  if (opts.html) titleEl.innerHTML = title || "";
  else titleEl.textContent = title || "";
  if (opts.htmlText) $("dialog-text").innerHTML = text || "";
  else $("dialog-text").textContent = text;
  const wrap = $("dialog-actions");
  wrap.classList.toggle("stack", !!opts.stack);
  wrap.innerHTML = actions
    .map((a, i) => `<button type="button" class="cta${a.ghost ? " ghost" : ""}${a.later ? " later" : ""}" data-act="${i}">${a.label}</button>`)
    .join("");
  wrap.querySelectorAll("[data-act]").forEach((b) =>
    b.addEventListener("click", () => {
      const action = actions[Number(b.dataset.act)];
      if (action.keepOpen) {
        if (action.fn) action.fn();
        return;
      }
      state.entryPromptOpen = false;
      state.suppressDeferredClose = true;
      closeAll();
      state.suppressDeferredClose = false;
      const fn = action.fn;
      if (fn) fn();
    })
  );
  $("dialog").classList.add("on");
  overlay.classList.add("on");
}

let toastTimer;
function toast(text) {
  const el = $("toast");
  el.textContent = text;
  el.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("on"), TOAST_DURATION);
}

// simulate friend activity
function simulate(kind) {
  if (!(state.scene === "active" || state.scene === "near")) {
    toast(t().needRound);
    return;
  }
  const now = nowMs();
  const cap = TASK.trade.lotsPerFriend;
  if (kind === "deposit") {
    deposit(addFriend(now - 20 * 60000), now);
  } else if (kind === "lot") {
    const f = state.friends.find((x) => x.lots < cap);
    if (f) trade(f, cap - f.lots, now);
    else trade(addFriend(now - 30 * 60000), cap, now);
  } else if (kind === "crew") {
    trade(addFriend(now - 35 * 60000), TASK.trade.lotsEach, now);
  } else {
    trade(addFriend(now - 40 * 60000), TASK.bigTrade.lots, now);
  }
  render();
  bump();
  if (progress().total >= 100) {
    state.scene = "done";
    state.completedAt = nowMs();
    document.querySelectorAll("[data-scene]").forEach((b) => b.classList.toggle("is-on", b.dataset.scene === "done"));
    render();
    const L = t();
    setTimeout(() => dialog(L.fullTitle, L.fullText, [{ label: L.goWithdraw, fn: withdrawFlow }]), 650);
  }
}

// ticker drops in briefly, then retracts so attention returns to the accumulated amount
const winners = [
  ["5*****4", C.rewardCap],
  ["1*****6", C.rewardCap],
  ["8*****2", C.rewardCap],
  ["3*****9", C.rewardCap],
];
const TICKER_FIRST = 1800;
const TICKER_HOLD = 4500;
const TICKER_GAP = 7600;
let tick = 0;
let tickerTimer;

function renderTicker() {
  const [u, n] = winners[tick % winners.length];
  $("ticker-text").innerHTML = t().ticker(u, n);
}

function tickerBlocked() {
  return overlay.classList.contains("on") ||
    $("comeback").classList.contains("on") ||
    $("coach").classList.contains("on") ||
    $("dialog").classList.contains("on");
}

function scheduleTicker(delay) {
  clearTimeout(tickerTimer);
  tickerTimer = setTimeout(runTicker, delay);
}

function runTicker() {
  if (tickerBlocked()) {
    scheduleTicker(900);
    return;
  }
  renderTicker();
  const el = $("ticker");
  const bell = el.querySelector(".ticker-bell");
  el.classList.add("is-down");
  bell.classList.remove("shake");
  void bell.offsetWidth;
  bell.classList.add("shake");
  scheduleTicker(TICKER_HOLD + TICKER_GAP);
  setTimeout(() => {
    el.classList.remove("is-down");
    tick++;
  }, TICKER_HOLD);
}

// task carousel dots
$("task-track").addEventListener("scroll", (e) => {
  const el = e.currentTarget;
  const i = Math.round(el.scrollLeft / (el.clientWidth - 22));
  $("task-dots").querySelectorAll("i").forEach((d, k) => d.classList.toggle("on", k === i));
});

// sticky dock when the main CTA scrolls out of view
new IntersectionObserver(
  ([entry]) => {
    if (isV3 && (state.scene === "active" || state.scene === "near")) {
      $("dock").classList.add("on");
      return;
    }
    $("dock").classList.toggle("on", !entry.isIntersecting);
  },
  { root: $("screen"), threshold: 0 }
).observe($("cta-main"));

document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) {
    if (openBtn.dataset.open === "rules") open("rules");
    else open(openBtn.dataset.open);
    return;
  }
  if (e.target.closest("[data-close]")) closeAll();
  const toastBtn = e.target.closest("[data-toast]");
  if (toastBtn) toast(t()[toastBtn.dataset.toast]);
});
overlay.addEventListener("click", () => {
  if (!state.entryPromptOpen) closeAll();
});

document.querySelectorAll("[data-scene]").forEach((b) => b.addEventListener("click", () => applyScene(b.dataset.scene)));
document.querySelectorAll("[data-toggle-entry-flow]").forEach((b) =>
  b.addEventListener("click", () => {
    usesDeferredEntry = !usesDeferredEntry;
    b.classList.toggle("is-on", usesDeferredEntry);
    b.textContent = usesDeferredEntry ? "非全屏弹窗" : "全屏弹窗";
    Object.assign(state, {
      hasParticipated: false,
      welcomeSeen: false,
      dailyReturnSeen: false,
      coachSeen: false,
    });
    applyScene(state.scene);
  })
);
document.querySelectorAll("[data-sim]").forEach((b) => b.addEventListener("click", () => simulate(b.dataset.sim)));
document.querySelectorAll("[data-toggle-deposit]").forEach((b) =>
  b.addEventListener("click", () => {
    TASK.deposit.enabled = !TASK.deposit.enabled;
    b.classList.toggle("is-on", TASK.deposit.enabled);
    b.textContent = TASK.deposit.enabled ? "任务1：开启" : "任务1：关闭";
    render();
  })
);
document.querySelectorAll("[data-lang]").forEach((b) =>
  b.addEventListener("click", () => {
    state.lang = b.dataset.lang;
    document.querySelectorAll("[data-lang]").forEach((x) => x.classList.toggle("is-on", x === b));
    render();
    renderTicker();
  })
);

function labelSims() {
  const lot = document.querySelector("[data-sim=lot]");
  const crew = document.querySelector("[data-sim=crew]");
  const big = document.querySelector("[data-sim=big]");
  if (lot) lot.textContent = `+ ${fmtLots(TASK.trade.lotsPerFriend)} 手`;
  if (crew) crew.textContent = `+ 各满 ${fmtLots(TASK.trade.lotsEach)} 手`;
  if (big) big.textContent = `+ ${fmtLots(TASK.bigTrade.lots)} 手`;
}

$("comeback-cta").addEventListener("click", () => {
  const fn = state.comebackAction || startRound;
  fn();
});
$("coach-btn").addEventListener("click", () => open("share"));
$("coach-scrim").addEventListener("click", () => hideCoach(true));

setInterval(renderTime, 1000);
labelSims();
if (isAttempt) state.dailyReturnSeen = true;
applyScene(isAttempt ? "active" : "expired");
renderTicker();
scheduleTicker(TICKER_FIRST);
