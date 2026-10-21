const PRODUCTS = [
  { id: "id-tel", country: "id", tab: "life", rank: 1, name: "Telkomsel 话费", brand: "Telkomsel", face: "10,000", coins: 800, kind: "phone", color: "#e2231a", ink: "#fff", stock: 86 },
  { id: "id-indosat", country: "id", tab: "life", rank: 1.1, name: "Indosat 话费", brand: "Indosat", face: "10,000", coins: 800, kind: "phone", color: "#ffcc00", ink: "#1a1a1a", stock: 42 },
  { id: "id-xl", country: "id", tab: "life", rank: 1.2, name: "XL 话费", brand: "XL", face: "10,000", coins: 800, kind: "phone", color: "#1b3c8c", ink: "#fff", stock: 27 },
  { id: "id-data", country: "id", tab: "life", rank: 1.3, name: "Telkomsel 流量", brand: "Telkomsel", face: "2GB", coins: 1200, kind: "phone", color: "#e2231a", ink: "#fff", stock: 18 },
  { id: "id-toko", country: "id", tab: "life", rank: 2, name: "Tokopedia 礼品卡", brand: "Tokopedia", face: "Rp50rb", coins: 2000, kind: "code", color: "#03ac0e", ink: "#fff", stock: 34 },
  { id: "id-shopee", country: "id", tab: "life", rank: 2.1, name: "ShopeePay 代金券", brand: "ShopeePay", face: "Rp50rb", coins: 2000, kind: "code", color: "#ee4d2d", ink: "#fff", stock: 21 },
  { id: "id-grab", country: "id", tab: "life", rank: 2.2, name: "GrabGifts", brand: "Grab", face: "Rp50rb", coins: 2000, kind: "code", color: "#00b14f", ink: "#fff", stock: 0 },
  { id: "id-ml", country: "id", tab: "fun", rank: 3, name: "Mobile Legends 钻石", brand: "ML", face: "50", coins: 1500, kind: "game", color: "#1a2744", ink: "#fff", stock: 64 },
  { id: "id-garena", country: "id", tab: "fun", rank: 4, name: "Garena Shell", brand: "Garena", face: "30", coins: 1500, kind: "game", color: "#e11d2e", ink: "#fff", stock: 15 },
  { id: "id-steam", country: "id", tab: "fun", rank: 5, name: "Steam 礼品卡", brand: "Steam", face: "$5", coins: 3000, kind: "code", color: "#1b2838", ink: "#fff", stock: 11 },
  { id: "id-apple", country: "id", tab: "fun", rank: 6, name: "Apple Gift", brand: "Apple", face: "$5", coins: 3000, kind: "code", color: "#111111", ink: "#fff", stock: 8 },
  { id: "id-google", country: "id", tab: "fun", rank: 7, name: "Google Play", brand: "Google", face: "$5", coins: 3000, kind: "code", color: "#1a73e8", ink: "#fff", stock: 9 },
  { id: "in-amazon", country: "in", tab: "life", rank: 1, name: "亚马逊购物卡", brand: "Amazon", face: "₹500", coins: 2000, kind: "code", color: "#232f3e", ink: "#fff", stock: 40 },
  { id: "in-flip", country: "in", tab: "life", rank: 2, name: "Flipkart 购物卡", brand: "Flipkart", face: "₹500", coins: 2000, kind: "code", color: "#2874f0", ink: "#fff", stock: 22 },
  { id: "in-google", country: "in", tab: "fun", rank: 3, name: "Google Play 礼品卡", brand: "Google", face: "₹200", coins: 1500, kind: "code", color: "#1a73e8", ink: "#fff", stock: 30 },
  { id: "in-bgmi", country: "in", tab: "fun", rank: 4, name: "BGMI 游戏币", brand: "BGMI", face: "60 UC", coins: 1500, kind: "game", color: "#f2a900", ink: "#1a1a1a", stock: 18 },
  { id: "in-ff", country: "in", tab: "fun", rank: 5, name: "Free Fire 钻石", brand: "Free Fire", face: "100", coins: 1500, kind: "game", color: "#ff4b00", ink: "#fff", stock: 16 },
  { id: "in-hotstar", country: "in", tab: "fun", rank: 6, name: "Hotstar 订阅券", brand: "Hotstar", face: "1 个月", coins: 3000, kind: "code", color: "#0c0c0c", ink: "#fff", stock: 7 },
  { id: "in-sony", country: "in", tab: "fun", rank: 7, name: "SonyLIV 订阅券", brand: "SonyLIV", face: "1 个月", coins: 3000, kind: "code", color: "#1a1a2e", ink: "#fff", stock: 6 },
  { id: "ng-itunes", country: "ng", tab: "fun", rank: 1, name: "iTunes 礼品卡", brand: "iTunes", face: "$5", coins: 2000, kind: "code", color: "#fc3c44", ink: "#fff", stock: 19 },
  { id: "ng-steam", country: "ng", tab: "fun", rank: 2, name: "Steam 礼品卡", brand: "Steam", face: "$5", coins: 2000, kind: "code", color: "#1b2838", ink: "#fff", stock: 14 },
  { id: "ng-razer", country: "ng", tab: "fun", rank: 2.1, name: "Razer Gold", brand: "Razer", face: "$5", coins: 1500, kind: "code", color: "#111111", ink: "#44d62c", stock: 12 },
  { id: "ng-amazon", country: "ng", tab: "life", rank: 3, name: "亚马逊购物卡", brand: "Amazon", face: "$10", coins: 2500, kind: "code", color: "#232f3e", ink: "#fff", stock: 9 },
  { id: "ng-airtel", country: "ng", tab: "life", rank: 4, name: "Airtel 话费", brand: "Airtel", face: "₦500", coins: 800, kind: "phone", color: "#ed1c24", ink: "#fff", stock: 40 },
  { id: "ng-mtn", country: "ng", tab: "life", rank: 5, name: "MTN 话费", brand: "MTN", face: "₦500", coins: 800, kind: "phone", color: "#ffcc00", ink: "#1a1a1a", stock: 33 },
  { id: "ng-glo", country: "ng", tab: "life", rank: 6, name: "Globacom 话费", brand: "Glo", face: "₦500", coins: 800, kind: "phone", color: "#1b8f3a", ink: "#fff", stock: 21 },
];

const COUPON = {
  id: "coupon",
  kind: "coupon",
  name: "入金抵扣券",
  brand: "入金券",
  face: "5 USD",
  coins: 10000,
  color: "#009b74",
  ink: "#fff",
};

const DEFAULT_TAB = { id: "life", in: "life", ng: "fun" };

const SEEDS = {
  id: ["8*****2 刚刚兑换了 Telkomsel 话费", "6*****1 刚刚兑换了 ShopeePay 代金券", "9*****4 刚刚兑换了 Mobile Legends 钻石"],
  in: ["7*****3 刚刚兑换了亚马逊购物卡", "5*****8 刚刚兑换了 Flipkart 购物卡", "4*****6 刚刚兑换了 Google Play 礼品卡"],
  ng: ["8*****0 刚刚兑换了 iTunes 礼品卡", "3*****5 刚刚兑换了 Steam 礼品卡", "6*****7 刚刚兑换了 Razer Gold"],
};

const ICON_BACK = '<svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M10 2 2 10l8 8" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_LIST = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 5h10M4 9h10M4 13h7" stroke="#000" stroke-width="1.6" stroke-linecap="round"/></svg>';
const ICON_SERVICE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 13v-2a8 8 0 0 1 16 0v2" stroke="#000" stroke-width="1.7" stroke-linecap="round"/><rect x="2.8" y="12" width="3.8" height="6.2" rx="1.6" stroke="#000" stroke-width="1.7"/><rect x="17.4" y="12" width="3.8" height="6.2" rx="1.6" stroke="#000" stroke-width="1.7"/></svg>';
const ICON_WALLET = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#000" stroke-width="1.7"/><path d="M3 10h18" stroke="#000" stroke-width="1.7"/><circle cx="16.5" cy="14.5" r="1" fill="#000"/></svg>';
const ICON_CHECK = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11.5 9 15.5 17 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const KIND_LABEL = { phone: "话费券", code: "礼品卡", game: "游戏直充", coupon: "抵扣券" };

let state = fresh();
let prevScreen = "";
let scrollY = 0;
let goalMotion = "";
let timers = [];
let codeSeq = 19;

const app = document.getElementById("app");

function fresh() {
  return {
    country: "id",
    screen: "shop",
    origin: "shop",
    returnScreen: "shop",
    tab: "life",
    ledgerTab: "earn",
    scenario: "new0",
    balance: 0,
    equity: 2480.2,
    todayPnl: 18.4,
    eligible: true,
    closedToday: false,
    weekLots: 0,
    monthLots: 0,
    firstClose: false,
    boost: false,
    kyc: true,
    coupon: null,
    useCoupon: true,
    depositAmount: 100,
    skuId: null,
    phone: "",
    gameId: "",
    formError: "",
    dialog: "goal",
    goalId: null,
    goalAsked: false,
    goalPhase: "ask",
    goalPicker: "featured",
    claims: [],
    bonusClaimed: { first: false, week: false, month: false, deposit: false },
    pending: false,
    receipt: { total: 100, bonus: 0, pnl: 18.4 },
    recent: "暂无",
    ledger: [],
    redeems: [],
    result: null,
    stocks: Object.fromEntries(PRODUCTS.map((item) => [item.id, item.stock])),
    tick: 0,
  };
}

function coins(n) {
  return Math.round(n).toLocaleString("en-US");
}

function coinPrice(amount) {
  return `<em><i class="coin-disc" aria-hidden="true"></i>${coins(amount)}<span class="sr-only">金币</span></em>`;
}

function money(n) {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

const STORIES = {
  new0: { balance: 0, closedToday: false, weekLots: 0, monthLots: 0, firstClose: false, ledger: [], claims: [] },
  first: {
    balance: 0,
    closedToday: true,
    weekLots: 0.1,
    monthLots: 0.1,
    firstClose: true,
    ledger: [],
    claims: [
      { source: "平仓", amount: 10, time: "10-21 10:18" },
    ],
  },
  mid: {
    balance: 320,
    closedToday: false,
    weekLots: 0,
    monthLots: 0,
    firstClose: false,
    firstDeposit: true,
    ledger: [{ source: "入金", amount: 320, time: "10-21 09:02" }],
    claims: [],
    bonusClaimed: { deposit: true },
  },
  ready: {
    balance: 800,
    closedToday: true,
    weekLots: 1,
    monthLots: 1,
    firstClose: true,
    ledger: [{ source: "平仓", amount: 100, time: "10-21 10:18" }],
    claims: [],
    bonusClaimed: { first: true },
  },
  rich: {
    balance: 10000,
    closedToday: true,
    weekLots: 5,
    monthLots: 12,
    firstClose: true,
    ledger: [{ source: "平仓", amount: 100, time: "10-21 10:18" }],
    claims: [],
    bonusClaimed: { first: true, week: true },
  },
};

function catalogStocks() {
  return Object.fromEntries(PRODUCTS.map((item) => [item.id, item.stock]));
}

function rankOne(country) {
  return PRODUCTS
    .filter((item) => item.country === country)
    .slice()
    .sort((a, b) => a.rank - b.rank)[0] || null;
}

function applyStocks() {
  state.stocks = catalogStocks();
  if (state.scenario !== "soldout") return;
  const top = rankOne(state.country);
  if (top) state.stocks[top.id] = 0;
}

function setStory(kind) {
  const base = kind === "soldout" ? "ready" : kind === "blocked" ? "new0" : (kind === "achieved" || kind === "nextgoal") ? "rich" : kind;
  const story = STORIES[base];
  if (!story) return;
  state.scenario = kind;
  state.eligible = kind !== "blocked";
  state.dialog = null;
  state.pending = false;
  state.screen = "shop";
  state.skuId = null;
  state.redeems = [];
  state.coupon = null;
  state.phone = "";
  state.gameId = "";
  state.formError = "";
  state.balance = story.balance;
  state.closedToday = story.closedToday;
  state.weekLots = story.weekLots;
  state.monthLots = story.monthLots;
  state.firstClose = story.firstClose;
  state.firstDeposit = Boolean(story.firstDeposit);
  state.ledger = story.ledger.map((row) => ({ ...row }));
  state.claims = (story.claims || []).map((row) => ({ ...row }));
  state.bonusClaimed = {
    first: false,
    week: false,
    month: false,
    deposit: false,
    ...(story.bonusClaimed || {}),
  };
  const askGoal = kind === "new0";
  state.goalPicker = "featured";
  state.goalAsked = !askGoal;
  state.goalPhase = askGoal ? "ask" : "active";
  state.goalId = askGoal ? null : (rankOne(state.country)?.id || null);
  state.dialog = askGoal ? "goal" : null;
  state.result = null;
  applyStocks();
  if (kind === "achieved" || kind === "nextgoal") {
    const sku = rankOne(state.country);
    state.goalPhase = "next";
    state.goalAsked = true;
    state.goalId = null;
    state.dialog = null;
    if (sku) {
      state.balance = Math.max(0, state.balance - sku.coins);
      state.stocks[sku.id] = Math.max(0, state.stocks[sku.id] - 1);
      const result = redeemedGoalResult(sku);
      state.result = result;
      state.redeems = [result];
    }
    state.screen = kind === "achieved" ? "result" : "shop";
  }
  state.recent = recentEarnText();
  prevScreen = "";
  render();
}

function stamp() {
  const date = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function plusDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function later(fn, ms) {
  const id = setTimeout(fn, ms);
  timers.push(id);
}

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function findSku(id) {
  if (id === "coupon") return COUPON;
  return PRODUCTS.find((item) => item.id === id) || null;
}

function shelf(country, tab) {
  return PRODUCTS
    .filter((item) => item.country === country && item.tab === tab)
    .slice()
    .sort((a, b) => a.rank - b.rank);
}

function targetSku() {
  return PRODUCTS
    .filter((item) => item.country === state.country)
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .find((item) => state.stocks[item.id] > 0) || null;
}

function hasCoupon() {
  return state.coupon && state.coupon.status === "unused";
}

function tickerLines() {
  const mine = state.redeems
    .filter((item) => item.kind !== "coupon")
    .slice(0, 3)
    .map((item) => `你刚刚兑换了 ${item.name}`);
  return mine.concat(SEEDS[state.country]);
}

function pageKey() {
  return "shop";
}

function showToast(text) {
  const toast = document.getElementById("toast");
  toast.hidden = false;
  toast.textContent = text;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 1600);
}

function render() {
  const scrolling = document.querySelector(".screen");
  if (scrolling && prevScreen === state.screen) scrollY = scrolling.scrollTop;
  const keep = prevScreen === state.screen ? scrollY : 0;
  try {
    app.innerHTML = view();
  } catch (error) {
    app.innerHTML = `<pre style="padding:16px;white-space:pre-wrap">${esc(error.stack)}</pre>`;
  }
  goalMotion = "";
  const next = document.querySelector(".screen");
  if (next) next.scrollTop = keep;
  prevScreen = state.screen;
  syncProto();
}

function syncProto() {
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.go === pageKey());
  });
  document.querySelectorAll("[data-country]").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.country === state.country);
  });
  document.querySelectorAll("[data-sim]").forEach((button) => {
    const kind = button.dataset.sim;
    const on = kind === state.scenario;
    button.classList.toggle("is-on", on);
  });
}

function nav(title, { back = true, right = "" } = {}) {
  const left = back
    ? `<button type="button" class="icon-btn" data-action="back" aria-label="返回">${ICON_BACK}</button>`
    : '<span class="icon-btn"></span>';
  return `<header class="nav">${left}<h1>${esc(title)}</h1><div class="nav-right">${right}</div></header>`;
}

function coinEntry() {
  const sku = targetSku();
  let side = "";
  if (sku && state.balance >= sku.coins) side = `兑换 ${sku.name}`;
  else if (sku) side = `还差 ${coins(sku.coins - state.balance)} 金币`;
  return `<button type="button" class="entry" data-action="shop">
    <span>金币</span>
    <strong>${coins(state.balance)}</strong>
    <span class="entry-go">${esc(side)}</span>
  </button>`;
}

function hintBlock() {
  const sku = targetSku();
  if (!sku) return "";
  if (state.balance >= sku.coins) return `<p class="hint-ok">可兑换 ${esc(sku.name)}</p>`;
  return `<p class="hint-gap">还差 ${coins(sku.coins - state.balance)} 金币可兑换 ${esc(sku.name)}</p>`;
}

function view() {
  const body = {
    receipt: viewReceipt,
    home: viewHome,
    assets: viewAssets,
    trade: viewTrade,
    shop: viewShop,
    shelf: viewShelf,
    detail: viewDetail,
    result: viewResult,
    ledger: viewLedger,
    rules: viewRules,
    vouchers: viewVouchers,
    deposit: viewDeposit,
    "deposit-ok": viewDepositOk,
  }[state.screen];
  return `${body()}${claimPill()}${dialog()}`;
}

function viewReceipt() {
  const bonus = state.receipt.bonus
    ? `<p class="bonus-line">含今日加成 ${coins(state.receipt.bonus)} 金币</p>`
    : "";
  const hint = hintBlock();
  const action = targetSku()
    ? `<button type="button" class="cta" data-action="shop">去兑换</button>`
    : "";
  return `${nav("平仓成功", { back: true })}
    <main class="screen">
      <div class="receipt-top">
        <div class="check">${ICON_CHECK}</div>
        <p class="pair">EURUSD</p>
        <p class="pair-sub">买入平仓 · 1.00 手</p>
        <p class="receipt-pnl">+${money(state.receipt.pnl)}</p>
        <p class="prices">开仓 1.08210 · 平仓 1.08394</p>
      </div>
      <section class="coin-card">
        <p class="label">本单获得</p>
        <div class="coin-got"><b>${coins(state.receipt.total)}</b><span>金币</span></div>
        ${bonus}
        ${hint}
        ${action}
      </section>
      <button type="button" class="ghost" data-action="home">完成</button>
    </main>`;
}

function viewHome() {
  const wallet = `<button type="button" class="icon-btn" data-action="assets" aria-label="资产">${ICON_WALLET}</button>`;
  return `${nav("交易", { back: false, right: wallet })}
    <main class="screen">
      <p class="k">净值</p>
      <p class="equity">${money(state.equity)}</p>
      <p class="pnl">今日 +${money(state.todayPnl)}</p>
      ${coinEntry()}
      <p class="k section">持仓</p>
      <button type="button" class="pos" data-action="trade">
        <span><b>EURUSD</b><small>买 · 1.00 手</small></span>
        <strong class="up">+${money(state.receipt.pnl)}</strong>
      </button>
    </main>`;
}

function viewAssets() {
  const coupon = hasCoupon()
    ? `<button type="button" class="asset-row" data-action="open-deposit">
        <span><b>入金抵扣券</b><small>${esc(state.coupon.until)}前</small></span>
        <strong>5 USD</strong>
      </button>`
    : "";
  return `${nav("资产")}
    <main class="screen">
      <p class="k">总资产</p>
      <p class="equity">${money(state.equity)}</p>
      <div class="group" style="margin-top:16px">
        <div class="asset-row"><span><b>可用余额</b></span><strong class="down-num">${money(state.equity)}</strong></div>
        <button type="button" class="asset-row" data-action="shop">
          <span><b>金币</b><small>${coins(state.balance)}</small></span>
          <span class="asset-go">兑换</span>
        </button>
        ${coupon}
      </div>
    </main>`;
}

function boostRow() {
  if (state.boost) {
    return `<div class="boost"><p>今日加成已开启</p><button type="button" disabled>已开启</button></div>`;
  }
  return `<div class="boost"><p>开启后，今天的平仓金币 ×1.2</p><button type="button" data-action="boost">开启</button></div>`;
}

function viewTrade() {
  return `${nav("EURUSD")}
    <main class="screen">
      <p class="k">卖价</p>
      <p class="trade-price">1.08394</p>
      ${boostRow()}
      <div class="lot-row"><span>手数</span><b>1.00</b></div>
      <p class="help">按 1.00 手有效平仓计算，持仓超过 1 分钟。</p>
    </main>
    <footer class="foot"><button type="button" class="cta" data-action="close">确认平仓</button></footer>`;
}

function skuStatus(item) {
  if (!state.eligible) return "";
  if (state.stocks[item.id] <= 0) return "已兑完";
  if (state.balance < item.coins) return "金币不足";
  return "可兑换";
}

function skuCard(item) {
  const left = state.stocks[item.id];
  const status = skuStatus(item);
  const sold = status === "已兑完";
  const tag = sold ? "div" : "button";
  const action = sold ? "" : ` type="button" data-action="open" data-id="${item.id}"`;
  const stockText = sold ? "" : `<small>剩余 ${left}</small>`;
  const stateText = status ? `<span class="sku-state${status === "可兑换" ? " is-ok" : ""}">${status}</span>` : "";
  return `<${tag} class="sku${sold ? " is-out" : ""}"${action}>
    <span class="ticket" style="background:${item.color};color:${item.ink}"><b>${esc(item.brand)}</b><small>${esc(item.face)}</small></span>
    <span class="sku-copy"><strong>${esc(item.name)}</strong>${coinPrice(item.coins)}${stockText}</span>
    ${stateText}
  </${tag}>`;
}

function couponCard() {
  let note = "兑换后到入金页使用";
  let disabled = false;
  if (hasCoupon()) {
    note = "已有未使用的券";
    disabled = true;
  }
  const action = disabled ? "" : ' type="button" data-action="open" data-id="coupon"';
  const tag = disabled ? "div" : "button";
  return `<${tag} class="sku${disabled ? " is-out" : ""}"${action}>
    <span class="ticket" style="background:${COUPON.color};color:${COUPON.ink}"><b>入金券</b><small>5 USD</small></span>
    <span class="sku-copy"><strong>入金抵扣券</strong>${coinPrice(COUPON.coins)}<small>${esc(note)}</small></span>
  </${tag}>`;
}

function lotsFor(coinsNeeded) {
  return Math.ceil(Math.max(coinsNeeded, 0) / 100);
}

function nextPrizeCopy(sku) {
  if (state.balance <= 0) return { text: `再 ${lotsFor(sku.coins)} 标准手`, ok: false };
  if (state.balance >= sku.coins) return { text: "可兑换", ok: true };
  return { text: `还差 ${coins(sku.coins - state.balance)} 金币`, ok: false };
}

function lotText(n) {
  const rounded = Math.round(n * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/0$/, "");
}

function recentSpend() {
  const item = state.redeems[0];
  if (!item) return "暂无";
  return `${item.name} -${coins(item.coins)}`;
}

function changeRow(label, value, action) {
  const linked = value !== "暂无";
  if (!linked) return `<div class="change-row"><span>${label}</span><b class="is-muted">${esc(value)}</b></div>`;
  return `<button type="button" class="change-row is-link" data-action="${action}"><span>${label}</span><b>${esc(value)}</b><i class="chev" aria-hidden="true"></i></button>`;
}

function earnLedgerRows() {
  const time = state.claims[0] ? state.claims[0].time : "";
  const pending = state.claims.map((row) => ({ ...row, pending: true })).concat(
    pendingBonuses().map((item) => ({ source: "额外", amount: item.reward, time, pending: true })),
  );
  return pending.concat(state.ledger.filter((row) => row.amount > 0));
}

function shopNav() {
  const right = `<button type="button" class="nav-text" data-action="ledger">明细</button>
    <button type="button" class="nav-text" data-action="rules">规则</button>`;
  return nav("金币", { back: true, right });
}

function shelfTabs() {
  return `<div class="tabs" role="tablist">
    <button type="button" role="tab" data-action="tab" data-tab="life" aria-selected="${state.tab === "life"}">生活</button>
    <button type="button" role="tab" data-action="tab" data-tab="fun" aria-selected="${state.tab === "fun"}">娱乐</button>
  </div>`;
}

function boostCard() {
  if (!state.eligible) return "";
  const on = state.closedToday;
  const sentence = on
    ? "今日平仓获得金币 <span>×1.2</span>"
    : "今日首笔交易平仓后，后续获得的金币 <span>×1.2</span>";
  return `<div class="head-row boost-title">
      <h2>今日金币加成<button type="button" class="info-btn" data-action="boost-info" aria-label="有效平仓说明"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 7.1V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="4.7" r=".75" fill="currentColor"/></svg></button></h2>
      <span class="boost-flag${on ? " is-on" : ""}">${on ? "生效中" : "未开始"}</span>
    </div>
    <section class="boost-card">
      <p>${sentence}</p>
      <small>生效后，每日 24:00 结束</small>
    </section>`;
}

function mileItem({ id, title, done, goal, unit, reward, current }) {
  const reached = done >= goal;
  const amount = lotText(Math.min(done, goal));
  const node = reached ? "img/node-done.png" : "img/node-wait.png";
  const action = reached
    ? `<span class="mile-done">已完成</span>`
    : `<button type="button" class="mile-go" data-action="bonus-go" data-id="${id}">去完成</button>`;
  return `<li class="mile${reached ? " is-done" : ""}${current ? " is-current" : ""}">
    <span class="mile-node"><img src="${node}" alt=""></span>
    <div class="mile-main">
      <div class="mile-top"><b>${title}</b>${action}</div>
      <p class="mile-frac"><span>${amount} ${unit}</span>/${lotText(goal)} ${unit}</p>
      <p class="mile-coin"><i class="coin-disc" aria-hidden="true"></i>额外 ${coins(reward)}</p>
    </div>
  </li>`;
}

function earnBlock() {
  const tradeNote = state.eligible
    ? "平仓产生的金币显示在右下角，14 天内领取。"
    : "美分账户和 Pro 账户的交易不发放金币。";
  const depositNote = state.eligible
    ? "每入金 1 USD 获得 2 金币，每一笔最多 500 金币。"
    : "这个账户的入金不发放金币。";
  const tradeStatus = grantStatus(["平仓"]);
  const depositStatus = state.eligible ? grantStatus(["入金"]) : "";
  const steps = [
    { id: "first", title: "首笔交易平仓", done: state.firstClose ? 1 : 0, goal: 1, unit: "笔", reward: 50 },
    { id: "week", title: "本周累计交易满 5 手", done: state.weekLots, goal: 5, unit: "手", reward: 30 },
    { id: "month", title: "本月累计交易满 20 手", done: state.monthLots, goal: 20, unit: "手", reward: 80 },
  ];
  let marked = false;
  const mileHtml = steps.map((step) => {
    const current = step.done < step.goal && !marked;
    if (current) marked = true;
    return mileItem({ ...step, current });
  }).join("");
  const miles = state.eligible
    ? `<h3 class="mile-label">交易里程碑</h3>
      <p class="mile-note">达标后的额外奖励，不计入每手获得的金币。</p>
      <ol class="miles">${mileHtml}</ol>`
    : "";
  const depositMile = state.eligible
    ? `<h3 class="mile-label">首次入金</h3>
      <p class="mile-note">额外奖励终身一次，不计入每笔入金金币。</p>
      <ol class="miles">${mileItem({
        id: "deposit",
        title: "首次入金",
        done: state.firstDeposit ? 1 : 0,
        goal: 1,
        unit: "笔",
        reward: 50,
        current: !state.firstDeposit,
      })}</ol>`
    : "";
  return `<section>
    <div class="head-row"><h2>如何获得金币</h2></div>
    <div class="earn">
      <div class="earn-row"><span><b>有效交易</b><small>${tradeNote}</small></span>${statusMark(tradeStatus)}</div>
      <div class="earn-row"><span><b>入金</b><small>${depositNote}</small></span>${statusMark(depositStatus)}</div>
      ${depositMile}
      ${miles}
    </div>
  </section>`;
}

function pendingBonuses() {
  const steps = [
    { id: "first", reward: 50, reached: state.firstClose },
    { id: "week", reward: 30, reached: state.weekLots >= 5 },
    { id: "month", reward: 80, reached: state.monthLots >= 20 },
    { id: "deposit", reward: 50, reached: state.firstDeposit },
  ];
  return steps.filter((item) => item.reached && !state.bonusClaimed[item.id]);
}

function grantStatus(sources) {
  if (!state.eligible) return "不计";
  if (state.claims.some((row) => sources.includes(row.source))) return "待领取";
  if (state.ledger.some((row) => sources.includes(row.source) && row.amount > 0)) return "已领取";
  return "";
}

function statusMark(status) {
  if (!status) return "";
  const hot = status === "待领取" ? " is-ok" : "";
  return `<em class="earn-status${hot}">${status}</em>`;
}

function claimTotal() {
  const bonus = pendingBonuses().reduce((sum, item) => sum + item.reward, 0);
  return state.claims.reduce((sum, row) => sum + row.amount, 0) + bonus;
}

function claimPill() {
  if (!state.eligible) return "";
  const total = claimTotal();
  if (!total) return "";
  return `<button type="button" class="claim-pill" data-action="claim"><i class="coin-disc" aria-hidden="true"></i>可领取 ${coins(total)} 金币</button>`;
}

function claimCoins() {
  const bonuses = pendingBonuses();
  const total = claimTotal();
  if (!total) return;
  const time = state.claims[0] ? state.claims[0].time : stamp();
  const bonusRows = bonuses.map((item) => ({ source: "额外", amount: item.reward, time }));
  bonuses.forEach((item) => {
    state.bonusClaimed[item.id] = true;
  });
  state.balance += total;
  state.ledger = state.claims.map((row) => ({ ...row })).concat(bonusRows, state.ledger);
  state.claims = [];
  state.recent = recentEarnText();
  showToast(`已领取 ${coins(total)} 金币`);
  render();
}

function prizeFace(sku, sold) {
  return `<span class="ticket" style="background:${sku.color};color:${sku.ink}"><b>${esc(sku.brand)}</b><small>${esc(sku.face)}</small></span>
    <span class="sku-copy"><strong>${esc(sku.name)}</strong>${coinPrice(sku.coins)}<small class="${sold ? "" : "is-ok"}">${sold ? "已兑完" : ""}</small></span>`;
}

function countryProducts() {
  return PRODUCTS
    .filter((item) => item.country === state.country)
    .slice()
    .sort((a, b) => a.rank - b.rank);
}

function goalTierPrice() {
  const products = countryProducts();
  const top = rankOne(state.country);
  if (top && products.some((item) => item.coins === top.coins && state.stocks[item.id] > 0)) return top.coins;
  const priced = products.filter((item) => state.stocks[item.id] > 0);
  if (!priced.length) return null;
  return Math.min(...priced.map((item) => item.coins));
}

function goalOptions() {
  const price = goalTierPrice();
  if (price == null) return [];
  return countryProducts()
    .filter((item) => item.coins === price && state.stocks[item.id] > 0)
    .slice(0, 4);
}

function chosenGoal() {
  if (state.goalPhase === "next" || state.goalPhase === "later" || state.goalPhase === "ask") return null;
  const picked = state.goalId ? findSku(state.goalId) : null;
  if (picked && picked.country === state.country && picked.kind !== "coupon") return picked;
  return rankOne(state.country);
}

function allGoalOptions() {
  return countryProducts().filter((item) => item.kind !== "coupon" && state.stocks[item.id] > 0);
}

function goalRedeemNote(sku) {
  const goal = state.goalPhase === "active" ? chosenGoal() : null;
  if (!goal || sku.id === "coupon") return "兑换后不可撤销";
  if (sku.id === goal.id) return "兑换后完成本次目标，可以再选一个奖励。";
  const left = state.balance - sku.coins;
  if (left >= goal.coins) return `兑换后，仍可兑换${goal.name}。`;
  return `兑换后，距离${goal.name}还差 ${coins(goal.coins - Math.max(left, 0))} 金币。`;
}

function redeemedGoalResult(sku) {
  return {
    name: sku.name,
    kind: sku.kind,
    coins: sku.coins,
    phone: sku.kind === "phone" ? "812345678" : "",
    gameId: sku.kind === "game" ? "88392011" : "",
    code: sku.kind === "code" ? "TW-8F2K-20" : "",
    until: "",
    time: "10-21 18:20",
    status: "已到账",
    goalDone: true,
  };
}

function goalChangeButton() {
  if (!goalOptions().length) return "";
  return `<button type="button" class="goal-change" data-action="goal">更换</button>`;
}

function goalCardClass() {
  return goalMotion === "swap" ? "goal-card is-goal-swap" : "goal-card";
}

function goalEmpty(title, note) {
  return `<button type="button" class="goal-empty" data-action="goal"><b>${title}</b><small>${note}</small></button>`;
}

function nextPrize() {
  if (state.goalPhase === "next") return goalEmpty("选择下一个奖励", "继续交易攒金币，目标可以随时更换。");
  if (state.goalPhase === "ask" || state.goalPhase === "later") return goalEmpty("选择一个兑换目标", "每次交易都会获得金币，目标可以随时更换。");
  const list = countryProducts();
  const primary = chosenGoal();
  const available = list.find((item) => item.id !== primary?.id && state.stocks[item.id] > 0)
    || list.find((item) => state.stocks[item.id] > 0);
  if (!primary || !available) return `<p class="nearest">暂时没有可兑换商品，金币保留</p>`;
  if (state.stocks[primary.id] <= 0) {
    const copy = nextPrizeCopy(available);
    const fallback = copy.ok ? `可改兑 ${available.name}` : `可改兑 ${available.name}，${copy.text}`;
    return `<div class="${goalCardClass()}">
      <div class="next-prize is-out">${prizeFace(primary, true)}</div>
      <div class="goal-sold-row">
        <button type="button" class="next-fallback" data-action="open" data-id="${available.id}">${esc(fallback)}</button>
        ${goalChangeButton()}
      </div>
    </div>`;
  }
  const copy = nextPrizeCopy(primary);
  return `<div class="${goalCardClass()}">
    <div class="next-prize">
      <button type="button" class="next-prize-hit" data-action="open" data-id="${primary.id}">
        <span class="ticket" style="background:${primary.color};color:${primary.ink}"><b>${esc(primary.brand)}</b><small>${esc(primary.face)}</small></span>
        <span class="sku-copy"><strong>${esc(primary.name)}</strong>${coinPrice(primary.coins)}<small class="${copy.ok ? "is-ok" : ""}">${esc(copy.text)}</small></span>
      </button>
      ${goalChangeButton()}
    </div>
  </div>`;
}

function recentEarnText() {
  if (!state.eligible) return "暂无";
  const time = state.claims[0] ? state.claims[0].time : "";
  const bonusRows = pendingBonuses().map((item) => ({ source: "额外", amount: item.reward, time }));
  const waiting = state.claims.length > 0 || bonusRows.length > 0;
  const rows = waiting ? state.claims.concat(bonusRows) : state.ledger.filter((row) => row.amount > 0);
  if (!rows.length) return "暂无";
  const stampTime = rows[0].time;
  const same = rows.filter((row) => row.time === stampTime);
  const body = same.length > 1
    ? `${same.map((row) => `${row.source} ${coins(row.amount)}`).join(" + ")} 金币`
    : `${rows[0].source}${waiting ? "" : "获得"} ${coins(rows[0].amount)} 金币`;
  return `${waiting ? "待领取 " : ""}${body} · ${stampTime}`;
}

function tickerBlock() {
  const lines = tickerLines();
  if (!lines.length) return "";
  const line = lines[state.tick % lines.length];
  return `<p class="ticker" aria-live="polite"><span id="ticker-text">${esc(line)}</span></p>`;
}

function mineRow() {
  const count = state.redeems.length;
  if (!count) return "";
  return `<button type="button" class="link-row" data-action="vouchers"><b>我的券</b><span>${count} 张</span></button>`;
}

function viewShop() {
  const preview = shelf(state.country, state.tab).slice(0, 3).map(skuCard).join("");
  return `${shopNav()}
    <main class="screen">
      <div class="balance-block">
        ${state.eligible
          ? `<p class="k">我的金币</p>
            <p class="balance-num"><i class="coin-disc" aria-hidden="true"></i>${coins(state.balance)}</p>
            <p class="rate-line">每交易 0.1 手即可获得金币</p>
            ${nextPrize()}`
          : `<p class="k">我的金币</p>
            <p class="ineligible-title">这个账户不计金币</p>
            <p class="nearest">美分账户和 Pro 账户的交易不发放金币。换到标准账户后，余额会出现在这里。</p>`}
      </div>
      <div class="changes">
        ${changeRow("最近获得", recentEarnText(), "ledger")}
        ${changeRow("最近兑换", recentSpend(), "ledger-redeem")}
      </div>
      ${tickerBlock()}
      <div class="head-row"><h2>可兑换</h2><button type="button" data-action="shelf">查看全部</button></div>
      ${shelfTabs()}
      ${preview}
      ${boostCard()}
      ${earnBlock()}
      ${mineRow()}
      <button type="button" class="link-row" data-action="rules"><b>金币规则</b><span>查看</span></button>
    </main>`;
}

function viewShelf() {
  const cards = shelf(state.country, state.tab).map(skuCard).join("");
  return `${nav("兑换")}
    <main class="screen">
      ${shelfTabs()}
      ${cards}
      ${couponCard()}
    </main>`;
}

function viewRules() {
  return `${nav("金币规则")}
    <main class="screen">
      <ol class="rule-list">
        <li>外汇 0.1 手 = 10 金币，非外汇 0.1 手 = 6 金币。持仓超过 1 分钟才计入，赠金部分不计。</li>
        <li>每入金 1 USD 获得 2 金币。不足 50 USD 的入金不发放，每一笔最多 500 金币。首次入金额外 50 金币，终身一次。</li>
        <li>平仓、入金和额外奖励先进入待领取。右下角领取后才计入余额。</li>
        <li>待领取的金币 14 天内不领则过期，过期后不能恢复。</li>
        <li>美分账户和 Pro 账户的交易不计金币。</li>
        <li>今日首笔交易平仓后，后续获得的金币 ×1.2，生效后每日 24:00 结束。今日第一笔不享受加成。</li>
        <li>未兑换的金币不过期。入金抵扣券兑换后 7 天内使用。</li>
        <li>兑换提交后不可撤销。到账失败时，金币退回。</li>
        <li>话费和流量包兑换后立即充值。礼品卡兑换后展示券码。</li>
        <li>无效平仓或入金被撤销时，已发金币会被扣回。</li>
        <li>存在待扣回时不能继续兑换。</li>
      </ol>
      <button type="button" class="link-row" data-action="service"><b>联系客服</b><span></span></button>
    </main>`;
}

function viewVouchers() {
  if (!state.redeems.length) {
    return `${nav("我的券")}<main class="screen"><p class="empty">暂无兑换</p></main>`;
  }
  const rows = state.redeems.map((item) => {
    const extra = item.kind === "coupon"
      ? `未使用 · ${esc(item.until)}前`
      : item.kind === "code"
        ? `${esc(item.status)} · ${esc(item.code)}`
        : esc(item.status);
    const action = item.kind === "code"
      ? `<button type="button" class="text-inline" data-action="copy" data-code="${esc(item.code)}">复制</button>`
      : item.kind === "coupon"
        ? `<span class="earn-status">入金时使用</span>`
        : "";
    return `<div class="line"><span><b>${esc(item.name)}</b><small>${extra}</small></span>${action}</div>`;
  }).join("");
  return `${nav("我的券")}<main class="screen"><div class="group">${rows}</div></main>`;
}

function ctaState(sku) {
  if (!state.eligible) return { text: "这个账户不能兑换", disabled: true };
  if (sku.kind === "coupon" && hasCoupon()) return { text: "已有未使用的券", disabled: true };
  if (sku.kind !== "coupon" && state.stocks[sku.id] <= 0) return { text: "已兑完", disabled: true };
  if (state.balance < sku.coins) return { text: "金币不足", disabled: true };
  return { text: "兑换", disabled: false };
}

function viewDetail() {
  const sku = findSku(state.skuId);
  if (!sku) return viewShop();
  const button = ctaState(sku);
  const stock = sku.kind === "coupon" ? "兑换后生成一张券" : (state.stocks[sku.id] > 0 ? `剩余 ${state.stocks[sku.id]}` : "已兑完");
  const face = sku.kind === "coupon" ? "5 USD" : sku.face;
  let field = "";
  if (sku.kind === "phone") {
    field = `<div class="field"><label for="phone">手机号</label><input id="phone" name="phone" inputmode="numeric" autocomplete="off" placeholder="填写当地手机号" value="${esc(state.phone)}" /></div>`;
  } else if (sku.kind === "game") {
    field = `<div class="field"><label for="game">游戏 ID</label><input id="game" name="game" autocomplete="off" placeholder="填写游戏 ID" value="${esc(state.gameId)}" /></div>`;
  }
  const error = state.formError ? `<p class="field-error">${esc(state.formError)}</p>` : "";
  return `${nav(sku.name)}
    <main class="screen">
      <div class="voucher" style="background:${sku.color};color:${sku.ink}">
        <span class="voucher-brand">${esc(sku.brand)}</span>
        <strong class="voucher-face">${esc(face)}</strong>
        <span class="voucher-kind">${KIND_LABEL[sku.kind]}</span>
      </div>
      <div class="info">
        <div><span>所需金币</span><b>${coins(sku.coins)}</b></div>
        <div><span>库存</span><b>${esc(stock)}</b></div>
        <div><span>到账</span><b>${sku.kind === "coupon" ? "兑换后到入金页使用" : "兑换后立即到账"}</b></div>
      </div>
      ${field}
      ${error}
    </main>
    <footer class="foot">
      <button type="button" class="cta" data-action="ask" ${button.disabled ? "disabled" : ""}>${button.text}</button>
    </footer>`;
}

function viewResult() {
  const result = state.result;
  if (!result) return viewShop();
  let extra = "<p>兑换后立即到账</p>";
  if (result.kind === "phone") extra = `<p>已充值至 ${esc(result.phone)}</p>`;
  if (result.kind === "game") extra = `<p>已充值至游戏 ID ${esc(result.gameId)}</p>`;
  if (result.kind === "code") {
    extra = `<div class="code">${esc(result.code)}</div><button type="button" class="text-btn" data-action="copy" data-code="${esc(result.code)}">复制券码</button>`;
  }
  if (result.kind === "coupon") extra = `<p>5 USD · 有效期至 ${esc(result.until)}</p>`;
  const primary = result.goalDone
    ? '<button type="button" class="cta" data-action="goal-next">选择下一个奖励</button><button type="button" class="text-btn" data-action="goal-later">暂时不选</button>'
    : result.kind === "coupon"
    ? '<button type="button" class="cta" data-action="vouchers">查看我的券</button><button type="button" class="text-btn" data-action="done">返回金币</button>'
    : '<button type="button" class="cta" data-action="done">返回金币</button>';
  return `${nav("兑换结果", { back: false })}
    <main class="screen">
      <div class="result-card">
        <div class="check" style="margin-bottom:14px">${ICON_CHECK}</div>
        <h2>${result.goalDone ? "目标已达成" : "已到账"}</h2>
        <p>${result.goalDone ? `已成功兑换 ${esc(result.name)}` : esc(result.name)}</p>
        ${extra}
      </div>
    </main>
    <footer class="foot">${primary}</footer>`;
}

function viewLedger() {
  const earn = state.ledgerTab === "earn";
  const rows = earn
    ? earnLedgerRows().map((item) => `<div class="line"><span><b>${esc(item.source)}</b><small>${item.pending ? "待领取 · " : ""}${esc(item.time)}</small></span><strong class="up">+${coins(item.amount)}</strong></div>`).join("")
    : state.redeems.map((item) => `<div class="line"><span><b>${esc(item.name)}</b><small>${esc(item.time)} · ${esc(item.status)}</small></span><strong class="down-num">-${coins(item.coins)}</strong></div>`).join("");
  let empty = "";
  if (!rows) {
    empty = earn && state.eligible
      ? `<div class="empty-guide"><p>完成一笔交易后，金币会出现在这里。</p><button type="button" class="cta" data-action="trade">去交易</button></div>`
      : earn
        ? `<div class="empty-guide"><p>这个账户的交易不计金币。</p></div>`
        : `<div class="empty-guide"><p>兑换奖励后，记录会出现在这里。</p></div>`;
  }
  return `${nav("金币明细")}
    <main class="screen" style="padding-top:8px">
      <div class="tabs" role="tablist">
        <button type="button" role="tab" data-action="ledger-tab" data-tab="earn" aria-selected="${earn}">获得</button>
        <button type="button" role="tab" data-action="ledger-tab" data-tab="redeem" aria-selected="${!earn}">兑换</button>
      </div>
      <div class="group">${rows}</div>
      ${empty}
    </main>`;
}

function viewDeposit() {
  const amounts = [50, 100, 200];
  const chips = amounts.map((amount) => `<button type="button" data-action="amount" data-amount="${amount}" class="${state.depositAmount === amount ? "is-on" : ""}">${amount} USD</button>`).join("");
  const selected = hasCoupon() && state.useCoupon;
  const pay = selected ? Math.max(0, state.depositAmount - 5) : state.depositAmount;
  const coupon = hasCoupon()
    ? `<button type="button" class="coupon-pick${selected ? " is-on" : ""}" data-action="toggle-coupon">
        <span><b>入金抵扣券</b><small>${selected ? "本次使用" : "本次不使用"} · ${esc(state.coupon.until)}前</small></span>
        <strong>5 USD</strong>
      </button>`
    : "";
  const payRows = selected
    ? `<div class="pay-block"><div><span>抵扣</span><b>-5.00 USD</b></div><div><span>实际支付</span><b>${money(pay)} USD</b></div><div><span>到账</span><b>${money(state.depositAmount)} USD</b></div></div>`
    : `<div class="pay-block"><div><span>到账</span><b>${money(state.depositAmount)} USD</b></div></div>`;
  return `${nav("入金")}
    <main class="screen">
      <p class="k">入金金额</p>
      <div class="chips">${chips}</div>
      ${coupon}
      ${payRows}
    </main>
    <footer class="foot"><button type="button" class="cta" data-action="pay">确认入金 ${money(pay)} USD</button></footer>`;
}

function viewDepositOk() {
  const used = state.depositUsed
    ? '<p class="recent">已使用入金抵扣券</p>'
    : "";
  return `${nav("入金", { back: false })}
    <main class="screen">
      <div class="receipt-top">
        <div class="check">${ICON_CHECK}</div>
        <p class="pair">入金成功</p>
        <p class="receipt-pnl">${money(state.depositAmount)}</p>
        <p class="prices">USD</p>
        ${used}
      </div>
    </main>
    <footer class="foot"><button type="button" class="cta" data-action="home">完成</button></footer>`;
}

function goalDialog() {
  const nextRound = state.goalPhase === "next";
  const showAll = state.goalPicker === "all" && state.goalPhase !== "ask" && state.goalPhase !== "later";
  const options = showAll ? allGoalOptions() : goalOptions();
  if (!options.length) return "";
  const rows = options.map((sku) => `<button type="button" class="goal-option${state.goalId === sku.id ? " is-on" : ""}" data-action="goal-pick" data-id="${sku.id}">
      <span class="ticket" style="background:${sku.color};color:${sku.ink}"><b>${esc(sku.brand)}</b><small>${esc(sku.face)}</small></span>
      <span class="sku-copy"><strong>${esc(sku.name)}</strong>${coinPrice(sku.coins)}</span>
    </button>`).join("");
  const title = nextRound ? "选择下一个奖励" : "选一个要兑换的奖励";
  const note = showAll
    ? "以下奖励都可以作为目标。"
    : nextRound
      ? "继续交易攒金币，目标可以随时更换。"
      : "每笔交易都会获得金币，攒够即可兑换。奖励可以更换。";
  const more = (state.goalPhase === "next" || state.goalPhase === "active") && !showAll
    ? '<button type="button" class="goal-more" data-action="goal-all">查看全部奖励</button>'
    : "";
  const back = showAll && goalOptions().length
    ? '<button type="button" class="goal-more" data-action="goal-featured">只看推荐</button>'
    : "";
  const dismiss = nextRound ? "暂时不选" : (state.goalAsked ? "取消" : "稍后选");
  return `<div class="mask" role="dialog" aria-modal="true">
    <div class="dialog goal-dialog">
      <p class="dialog-title">${title}</p>
      <p class="dialog-note">${note}</p>
      <div class="goal-list${showAll ? " is-all" : ""}">${rows}</div>
      ${more}${back}
      <button type="button" class="text-btn" data-action="goal-dismiss">${dismiss}</button>
    </div>
  </div>`;
}

function dialog() {
  if (state.dialog === "goal") return goalDialog();
  if (state.dialog === "boost") {
    return `<div class="mask" role="dialog" aria-modal="true">
      <div class="dialog">
        <p class="dialog-title">有效平仓</p>
        <p class="dialog-sub">持仓超过 1 分钟，并且使用自己的资金。赠金部分不计算。</p>
        <p class="dialog-note">今日第一笔平仓不享受加成。</p>
        <button type="button" class="cta" data-action="cancel">知道了</button>
      </div>
    </div>`;
  }
  if (state.dialog === "kyc") {
    return `<div class="mask" role="dialog" aria-modal="true">
      <div class="dialog">
        <p class="dialog-title">完成身份认证后即可兑换</p>
        <p class="dialog-note">认证通过后返回这里继续兑换。</p>
        <button type="button" class="cta" data-action="kyc-go">去认证</button>
        <button type="button" class="text-btn" data-action="cancel">稍后</button>
      </div>
    </div>`;
  }
  if (state.dialog !== "confirm") return "";
  const sku = findSku(state.skuId);
  if (!sku) return "";
  let sub = "";
  if (sku.kind === "phone") sub = `<p class="dialog-sub">${esc(state.phone)}</p>`;
  if (sku.kind === "game") sub = `<p class="dialog-sub">游戏 ID ${esc(state.gameId)}</p>`;
  return `<div class="mask" role="dialog" aria-modal="true">
    <div class="dialog">
      <p class="dialog-title">使用 ${coins(sku.coins)} 金币兑换 ${esc(sku.name)}</p>
      ${sub}
      <p class="dialog-note">${esc(goalRedeemNote(sku))}</p>
      <button type="button" class="cta" data-action="commit" ${state.pending ? "disabled" : ""}>${state.pending ? "兑换中" : "确认兑换"}</button>
      <button type="button" class="text-btn" data-action="cancel" ${state.pending ? "disabled" : ""}>取消</button>
    </div>
  </div>`;
}

function goShop() {
  state.origin = state.screen === "shop" ? state.origin : state.screen;
  state.screen = "shop";
  state.dialog = null;
  state.formError = "";
  render();
}

function openSku(id) {
  state.returnScreen = state.screen === "shelf" ? "shelf" : "shop";
  if (state.skuId !== id) {
    state.phone = "";
    state.gameId = "";
  }
  state.skuId = id;
  state.formError = "";
  state.dialog = null;
  state.screen = "detail";
  render();
}

function enableBoost() {
  if (state.boost) return;
  state.boost = true;
  render();
}

function closeLot() {
  const bonus = state.boost ? 20 : 0;
  const total = 100 + bonus;
  const time = stamp();
  state.balance += total;
  state.equity = Math.round((state.equity + 18.4) * 100) / 100;
  state.todayPnl = Math.round((state.todayPnl + 18.4) * 100) / 100;
  state.receipt = { total, bonus, pnl: 18.4 };
  state.recent = `平仓获得 ${coins(total)} 金币`;
  if (bonus) state.ledger.unshift({ source: "今日加成", amount: bonus, time });
  state.ledger.unshift({ source: "平仓", amount: 100, time });
  state.dialog = null;
  state.screen = "receipt";
  render();
}

function askRedeem() {
  const sku = findSku(state.skuId);
  if (!sku || ctaState(sku).disabled || state.pending) return;
  if (sku.kind === "phone" && state.phone.replace(/\D/g, "").length < 8) {
    state.formError = "请填写当地手机号";
    render();
    return;
  }
  if (sku.kind === "game" && state.gameId.trim().length < 3) {
    state.formError = "请填写游戏 ID";
    render();
    return;
  }
  state.formError = "";
  if (!state.kyc) {
    state.dialog = "kyc";
    render();
    return;
  }
  state.dialog = "confirm";
  render();
}

function commitRedeem() {
  const sku = findSku(state.skuId);
  if (!sku || state.pending) return;
  if (sku.kind !== "coupon" && state.stocks[sku.id] <= 0) {
    state.dialog = null;
    showToast("已兑完");
    render();
    return;
  }
  if (state.balance < sku.coins) return;
  state.pending = true;
  render();
  later(() => {
    state.pending = false;
    state.balance -= sku.coins;
    const time = stamp();
    const result = {
      name: sku.name,
      kind: sku.kind,
      coins: sku.coins,
      phone: state.phone,
      gameId: state.gameId.trim(),
      code: "",
      until: "",
      time,
      status: "已到账",
    };
    if (sku.kind === "coupon") {
      result.until = plusDays(7);
      state.coupon = { status: "unused", until: result.until };
      state.useCoupon = true;
    } else {
      state.stocks[sku.id] -= 1;
      if (sku.kind === "code") {
        codeSeq += 1;
        result.code = `TW-8F2K-${codeSeq}`;
      }
    }
    const goal = state.goalPhase === "active" ? chosenGoal() : null;
    if (goal && sku.id === goal.id) {
      state.goalPhase = "next";
      state.goalId = null;
      state.goalPicker = "featured";
      result.goalDone = true;
    }
    state.redeems.unshift(result);
    state.result = result;
    state.dialog = null;
    state.screen = "result";
    state.tick = 0;
    render();
  }, 700);
}

function payDeposit() {
  const used = hasCoupon() && state.useCoupon;
  if (used) state.coupon = { ...state.coupon, status: "used" };
  const grant = Math.min(500, state.depositAmount * 2);
  if (grant) {
    state.balance += grant;
    state.ledger.unshift({ source: "入金", amount: grant, time: stamp() });
    state.recent = `入金获得 ${coins(grant)} 金币`;
  }
  if (state.depositAmount >= 50) state.firstDeposit = true;
  state.depositUsed = used;
  state.equity = Math.round((state.equity + state.depositAmount) * 100) / 100;
  state.screen = "deposit-ok";
  state.dialog = null;
  render();
}

function back() {
  const from = state.screen;
  state.dialog = null;
  state.formError = "";
  if (from === "shop") {
    showToast("返回上一页");
    return;
  }
  if (from === "detail") state.screen = state.returnScreen || "shop";
  else state.screen = "shop";
  render();
}

function onAction(action, el) {
  if (action === "back") back();
  else if (action === "home") {
    state.screen = "home";
    state.dialog = null;
    render();
  } else if (action === "shop") goShop();
  else if (action === "assets") {
    state.screen = "assets";
    render();
  } else if (action === "trade") {
    state.screen = "trade";
    render();
  } else if (action === "open") openSku(el.dataset.id);
  else if (action === "tab") {
    state.tab = el.dataset.tab;
    render();
  }   else if (action === "claim") claimCoins();
  else if (action === "goal" || action === "goal-next") {
    const featured = goalOptions();
    const all = allGoalOptions();
    if (!featured.length && !all.length) return;
    state.goalPicker = featured.length ? "featured" : "all";
    if (action === "goal-next") state.screen = "shop";
    state.dialog = "goal";
    render();
  } else if (action === "goal-all") {
    state.goalPicker = "all";
    state.dialog = "goal";
    render();
  } else if (action === "goal-featured") {
    state.goalPicker = "featured";
    state.dialog = "goal";
    render();
  } else if (action === "goal-later") {
    state.goalPhase = "next";
    state.goalId = null;
    state.dialog = null;
    state.screen = "shop";
    render();
  } else if (action === "goal-pick") {
    const sku = findSku(el.dataset.id);
    const pool = state.goalPicker === "all" ? allGoalOptions() : goalOptions();
    if (!sku || !pool.some((item) => item.id === sku.id)) return;
    const previousId = chosenGoal()?.id || "";
    goalMotion = previousId !== sku.id ? "swap" : "";
    state.goalId = sku.id;
    state.goalAsked = true;
    state.goalPhase = "active";
    state.goalPicker = "featured";
    state.dialog = null;
    render();
  } else if (action === "goal-dismiss") {
    if (state.goalPhase === "ask") {
      state.goalPhase = "later";
      state.goalAsked = true;
      state.goalId = null;
    }
    state.dialog = null;
    state.screen = "shop";
    render();
  }
  else if (action === "bonus-go") {
    const text = el.dataset.id === "deposit" ? "去入金页完成首次入金" : "回到交易页，完成对应手数";
    showToast(text);
  }
  else if (action === "boost-info") {
    state.dialog = "boost";
    render();
  } else if (action === "boost") enableBoost();
  else if (action === "close") closeLot();
  else if (action === "ask") askRedeem();
  else if (action === "cancel") {
    if (state.pending) return;
    state.dialog = null;
    render();
  } else if (action === "commit") commitRedeem();
  else if (action === "kyc-go") {
    state.dialog = null;
    render();
    showToast("正在打开身份认证");
  } else if (action === "done") {
    state.screen = "shop";
    render();
  }   else if (action === "ledger" || action === "ledger-redeem") {
    state.ledgerTab = action === "ledger-redeem" ? "redeem" : "earn";
    state.screen = "ledger";
    render();
  } else if (action === "shelf") {
    state.screen = "shelf";
    render();
  } else if (action === "rules") {
    state.screen = "rules";
    render();
  } else if (action === "vouchers") {
    state.screen = "vouchers";
    render();
  } else if (action === "ledger-tab") {
    state.ledgerTab = el.dataset.tab;
    render();
  } else if (action === "service") showToast("正在打开客服");
  else if (action === "copy") {
    const code = el.dataset.code || "";
    const done = () => showToast("已复制");
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(done).catch(done);
    else done();
  } else if (action === "open-deposit") {
    state.origin = state.screen === "result" ? "shop" : state.screen;
    state.useCoupon = true;
    state.screen = "deposit";
    render();
  } else if (action === "amount") {
    state.depositAmount = Number(el.dataset.amount);
    render();
  } else if (action === "toggle-coupon") {
    state.useCoupon = !state.useCoupon;
    render();
  } else if (action === "pay") payDeposit();
}

app.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el || !app.contains(el)) return;
  onAction(el.dataset.action, el);
});

app.addEventListener("input", (event) => {
  if (event.target.name === "phone") state.phone = event.target.value;
  if (event.target.name === "game") state.gameId = event.target.value;
});

document.addEventListener("click", (event) => {
  const country = event.target.closest("[data-country]");
  if (country) {
    state.country = country.dataset.country;
    state.tab = DEFAULT_TAB[state.country];
    if (state.scenario === "achieved" || state.scenario === "nextgoal") {
      setStory(state.scenario);
      return;
    }
    if (["detail", "result"].includes(state.screen)) state.screen = "shop";
    const picked = state.goalId ? findSku(state.goalId) : null;
    if (picked && picked.country !== state.country) {
      state.goalId = state.goalAsked ? (rankOne(state.country)?.id || null) : null;
    }
    if (!state.goalAsked && state.eligible && state.screen === "shop") state.dialog = "goal";
    applyStocks();
    prevScreen = "";
    render();
    return;
  }
  const go = event.target.closest("[data-go]");
  if (go) {
    state.dialog = null;
    state.screen = go.dataset.go;
    if (go.dataset.go === "shop") state.origin = "home";
    if (go.dataset.go === "deposit") state.origin = "home";
    render();
    return;
  }
  const sim = event.target.closest("[data-sim]");
  if (!sim) return;
  const kind = sim.dataset.sim;
  if (kind === "close") closeLot();
  else if (kind === "boost") enableBoost();
  else if (STORIES[kind] || kind === "soldout" || kind === "blocked" || kind === "achieved" || kind === "nextgoal") setStory(kind);
  else if (kind === "kyc") {
    state.kyc = !state.kyc;
    render();
  } else if (kind === "reset") {
    clearTimers();
    state = fresh();
    prevScreen = "";
    render();
  }
});

setInterval(() => {
  const lines = tickerLines();
  if (!lines.length) return;
  state.tick = (state.tick + 1) % lines.length;
  const node = document.getElementById("ticker-text");
  if (!node) return;
  node.classList.add("is-swap");
  setTimeout(() => {
    node.textContent = lines[state.tick % lines.length];
    node.classList.remove("is-swap");
  }, 180);
}, 3000);

render();
