// ========================================
//  ハレタス - app.js
//  v2.0: PWA対応版
//  機能追加: カレンダーUI, 日跨ぎタラレバ, 通知
// ========================================

'use strict';

// ======== データ定義 ========

const TODAY_WORDS = [
  "今日の5分が半年後を変える","未来の自分が応援している","やる気は行動の後から来る",
  "まずは1分だけやってみよう","完璧より継続","小さな一歩も前進",
  "昨日の自分より少しだけ前へ","続けることが才能になる","未来は今日作られる",
  "コツコツは最強の近道","今日も未来を晴らそう","ハレタスへようこそ、今日も未来を育てよう",
  "一歩踏み出した勇気が明日につながる","やらない後悔より、やった後悔","積み重ねは裏切らない",
  "今日の努力は未来への贈り物","小さな習慣が大きな変化を生む","焦らなくていい、続けることが大事",
  "今日もよく来たね","未来の自分はきっと喜んでいる","行動した分だけ前に進む",
  "諦めない心が未来を切り開く","今日の選択が明日を作る","一日一歩、千里の道も",
  "努力は静かに積み上がっている","今日できることを今日やろう","未来は行動した人のもの",
  "続けることが最高の才能","今日もまず一歩","小さな積み重ねが人生を変える",
  "今日の行動が三ヶ月後を変える","未来の景色は今日作られる","夢は諦めない人に近づいてくる",
  "今日も自分を褒めていい","完璧でなくていい、続けることが大事","行動する人に未来は開ける",
  "今日も一緒に頑張ろう","小さな勝利を積み重ねよう","未来の自分への手紙を今日書こう",
  "今日の一歩が百歩分の価値がある","継続は力なり","今日の努力を信じよう",
  "明日になれば後悔するかもしれない、でも今日なら間に合う","未来は変えられる",
  "今日も新しいページを開こう","一日一日が大切な積み重ね","今日の自分を大切に",
  "未来の笑顔のために今日も頑張る","行動すれば何かが変わる","今日も前を向いて進もう",
  "コツコツが最強の戦略","今日の選択を信じよう","未来は今日の行動の積み重ね",
  "焦らず、でも止まらず","今日も成長した自分に乾杯","小さな習慣が大きな夢を叶える",
  "今日の努力は消えない","未来の自分がここにいる","行動した記録は一生残る",
  "今日も種をまこう","未来の花は今日咲き始める","一歩でも前に進めば十分",
  "今日も未来を育てよう","昨日より少しだけ前進","今日の自分に感謝しよう",
  "未来は積み重ねの先にある","諦めなければいつか必ず届く","今日も自分らしく",
  "小さな行動が大きな流れを作る","未来の自分はもっと輝いている","今日も一歩一歩",
  "積み重ねた日々は宝物","行動の先に答えがある","今日も前進あるのみ",
  "未来への種まき完了","今日の努力は未来の余裕になる","小さな習慣を大切に",
  "行動した人だけが見える景色がある","今日も自分を信じよう","コツコツが花を咲かせる",
  "今日の積み重ねが未来の自信になる","未来は今日作られる、必ず","一歩一歩が最速の近道",
  "今日も未来を信じて進もう","行動は最高の答え","今日もよく頑張った",
  "小さな一歩も立派な前進","未来の自分から「ありがとう」をもらおう","今日の行動に意味がある",
  "積み重ねが人生を豊かにする","今日も新しい自分へ","行動すれば道は開ける",
  "未来の笑顔が今日を応援している","今日も着実に前進","コツコツが最高の近道",
  "一日一日を大切に積み重ねよう","未来の自分が今日の努力に感謝する","今日も一緒に未来を育てよう"
];

const CATEGORIES = ["ダイエット","筋トレ","貯金・節約","NISA","勉強","家族・未来","開業・副業","健康","その他"];

const TARA_MESSAGES = {
  "ダイエット": [
    "ワンサイズ下の服が着られていたかも","体が軽くなっていたかも","写真写りが変わっていたかも",
    "あの時サラダチキンを選んでいタラ体が軽くなっていたかも","階段が楽になっていたかも",
    "お気に入りの服がもう少し似合っていたかも"
  ],
  "筋トレ": [
    "腕が太くなっていたかも","腹筋が見えていたかも","自信がついていたかも",
    "Tシャツ姿が変わっていたかも","姿勢が良くなっていたかも"
  ],
  "貯金・節約": [
    "旅行資金が貯まっていたかも","欲しかった物が買えていたかも",
    "将来の安心につながっていたかも","外食を減らしていタラ目標に近づいていたかも"
  ],
  "NISA": [
    "複利の力で資産が育っていたかも","将来の安心が近づいていたかも","未来の自分が感謝していたかも"
  ],
  "勉強": [
    "知識が積み重なっていたかも","試験に近づいていたかも",
    "未来の選択肢が広がっていたかも","昨日より少し賢くなっていたかも"
  ],
  "家族・未来": [
    "大切な人が喜んでいたかも","未来の安心が育っていたかも","家族の笑顔が増えていたかも"
  ],
  "開業・副業": [
    "開業に一歩近づいていたかも","未来のお客様が増えていたかも","夢が少し近づいていたかも"
  ],
  "健康": [
    "体が喜んでいたかも","将来の医療費が減っていたかも","毎日が少し楽になっていたかも"
  ],
  "その他": [
    "続けていタラ何かが変わっていたかも","未来の自分が喜んでいたかも",
    "小さな積み重ねが大きな変化になっていたかも"
  ]
};

const REBA_MESSAGES = {
  "ダイエット": [
    "この調子で続けれバ理想の体型に近づく","未来の自分が鏡の前で微笑んでいる",
    "継続が成果になっていく","ワンサイズ下の服が少し近づいた"
  ],
  "筋トレ": [
    "体は確実に変わり始めている","続ければ結果はついてくる",
    "未来の筋肉貯金が増えた","あと少しで理想の体型が見えてくる"
  ],
  "貯金・節約": [
    "未来の自由が増えている","目標に一歩近づいた",
    "コツコツが大きな成果になる","未来の旅行資金が着実に育っている"
  ],
  "NISA": [
    "複利が静かに働き始めている","未来の安心に着実に近づいている","今日の積立が未来を変える"
  ],
  "勉強": [
    "知識は誰にも奪われない財産になった","未来の選択肢が一つ増えた",
    "継続が最大の才能を証明している","脳が静かに成長している"
  ],
  "家族・未来": [
    "大切な人への積立が増えた","未来の笑顔が近づいている","コツコツが家族の安心になる"
  ],
  "開業・副業": [
    "未来のお客様が待っている","夢は行動した分だけ近づく","開業資金にまた一歩近づいた"
  ],
  "健康": [
    "体は今日の努力を覚えている","健康な未来に近づいた","毎日の積み重ねが最高の投資"
  ],
  "その他": [
    "続けることが最強の才能","未来の自分が感謝している","小さな積み重ねが大きな変化になる"
  ]
};

const PLANT_TYPES = [
  { id: "sunflower", name: "ひまわり", stages: ["🌱","🌿","🌻","🌻","🌻🌟"] },
  { id: "leaf",      name: "観葉植物", stages: ["🌱","🪴","🪴","🌿","🌿✨"] },
  { id: "sakura",    name: "桜",       stages: ["🌱","🌿","🌸","🌸","🌸🎉"] },
  { id: "veggie",    name: "野菜",     stages: ["🌱","🌿","🥕","🥦","🥗✨"] },
  { id: "cactus",    name: "サボテン", stages: ["🌵","🌵","🌵🌸","🌵🌺","🌵🌺✨"] }
];

const PLANT_STAGE_LABELS = ["種🌱","芽吹き🌿","葉が育つ🍃","花が咲く🌸","満開🎉"];

// ======== State ========

let state = loadState();

function defaultState() {
  return {
    tasks: [],
    habits: [],
    goal: { text: "", category: "" },
    plantId: "sunflower",
    harePoints: 0,
    streak: 0,
    lastDate: "",
    totalCompleted: 0,
    growthHistory: [],
    userTara: [],
    userReba: [],
    // 前日の達成状況を保存するためのフィールド
    yesterdayStatus: null,  // { date, allDone, total, completed }
    notifDismissed: false,
    scheduledNotifications: {}  // taskId -> { time, timerId }
  };
}

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem("haretasu_state") || "null");
    if (!s) return defaultState();
    const merged = Object.assign(defaultState(), s);
    if (!Array.isArray(merged.habits)) merged.habits = [];
    if (!merged.scheduledNotifications) merged.scheduledNotifications = {};
    return merged;
  } catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem("haretasu_state", JSON.stringify(state));
}

// ======== Date utilities ========

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(str) {
  if (!str) return "";
  const d = new Date(str + "T00:00:00");
  const days = ["日","月","火","水","木","金","土"];
  return `${d.getMonth()+1}/${d.getDate()}(${days[d.getDay()]})`;
}

function fmtDateTime(dateStr, timeStr) {
  if (!dateStr) return "";
  let s = fmtDate(dateStr);
  if (timeStr) s += " " + timeStr;
  return s;
}

function isOverdue(task) {
  if (!task.dueDate || task.done) return false;
  return task.dueDate < todayStr();
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function dayDiff(a, b) {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.abs(Math.round((da - db) / 86400000));
}

// ======== Task filters ========

function getTodayTasks() {
  const t = todayStr();
  return state.tasks.filter(tk => !tk.done && (tk.dueDate === t || !tk.dueDate));
}
function getOverdueTasks() {
  const t = todayStr();
  return state.tasks.filter(tk => !tk.done && tk.dueDate && tk.dueDate < t);
}
function getFutureTasks() {
  const t = todayStr();
  return state.tasks.filter(tk => tk.dueDate && tk.dueDate > t);
}
function getDoneTasks() {
  const t = todayStr();
  return state.tasks.filter(tk => tk.done && tk.completedDate === t);
}

// ======== Progress / sky ========

function calcProgress() {
  const todayTasks = getTodayTasks().concat(getDoneTasks());
  if (!todayTasks.length) {
    // 習慣のみで計算
    if (!state.habits.length) return 0;
    const done = state.habits.filter(h => isHabitDoneToday(h)).length;
    return done / state.habits.length;
  }
  const done = todayTasks.filter(t => t.done).length;
  return done / todayTasks.length;
}

function getPlant() {
  return PLANT_TYPES.find(p => p.id === state.plantId) || PLANT_TYPES[0];
}
function getPlantStage() {
  const pts = state.harePoints;
  if (pts < 50)  return 0;
  if (pts < 150) return 1;
  if (pts < 300) return 2;
  if (pts < 500) return 3;
  return 4;
}
function getSkyClass() {
  const p = calcProgress();
  if (p === 0)    return "cloudy";
  if (p < 0.33)  return "partly-cloudy";
  if (p < 0.66)  return "clear";
  return "sunny";
}
function getSkyLabel() {
  const p = calcProgress();
  if (p === 0)   return "☁️ くもり空 — タスクをやってみよう";
  if (p < 0.33)  return "⛅ 少し晴れてきた！";
  if (p < 0.66)  return "🌤️ いい調子！空が明るくなってきた";
  if (p < 1)     return "☀️ もうすぐ快晴！あと少し！";
  return "🌞 快晴！すばらしい！全タスク達成！";
}

// ======== Daily check & 日跨ぎタラレバ ========

function dailyCheck() {
  const today = todayStr();
  if (state.lastDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // 前日のデータがあれば達成状況を記録
  if (state.lastDate) {
    const prevDate = state.lastDate;
    const completedYesterday = state.tasks.filter(t => t.completedDate === prevDate).length;
    const totalYesterday = state.tasks.filter(t => {
      if (t.completedDate === prevDate) return true;
      if (!t.done && (t.dueDate === prevDate || !t.dueDate)) return true;
      return false;
    }).length;

    // 習慣も含める
    const habitsDoneYesterday = state.habits.filter(h => h.logs && h.logs[prevDate]).length;
    const totalItems = totalYesterday + state.habits.length;
    const doneItems = completedYesterday + habitsDoneYesterday;

    state.yesterdayStatus = {
      date: prevDate,
      total: totalItems,
      completed: doneItems,
      allDone: totalItems > 0 && doneItems >= totalItems
    };
  }

  if (state.lastDate && state.lastDate < yesterday) {
    state.streak = 0;
  }

  state.lastDate = today;
  saveState();

  // 翌日の日跨ぎ時にタラレバを表示
  if (state.yesterdayStatus && state.yesterdayStatus.total > 0) {
    setTimeout(() => showDailyTarareba(), 800);
  }
}

function showDailyTarareba() {
  const ys = state.yesterdayStatus;
  if (!ys) return;

  const cat = state.goal.category || "その他";
  const type = ys.allDone ? "reba" : "tara";

  // メッセージプール
  const pool = type === "reba"
    ? [...(REBA_MESSAGES[cat] || REBA_MESSAGES["その他"]), ...state.userReba.map(m => m.text)]
    : [...(TARA_MESSAGES[cat] || TARA_MESSAGES["その他"]), ...state.userTara.map(m => m.text)];
  const msg = pool[Math.floor(Math.random() * pool.length)];

  const overlay = document.getElementById("daily-tarareba-overlay");
  const card = document.getElementById("daily-tarareba-card");
  if (!overlay || !card) return;

  const d = new Date(ys.date + "T00:00:00");
  const dateLabel = `${d.getMonth()+1}月${d.getDate()}日の振り返り`;

  card.querySelector(".dtr-date").textContent = dateLabel;
  const badge = card.querySelector(".dtr-type-badge");
  badge.textContent = type === "reba" ? "レバ" : "タラ";
  badge.className = `dtr-type-badge ${type}`;
  card.querySelector(".dtr-emoji").textContent = type === "reba" ? "🌟" : "🌧️";
  card.querySelector(".dtr-title").textContent = type === "reba"
    ? "昨日は全タスク達成！すごい！"
    : `昨日のタスク、${ys.completed}/${ys.total}件でした`;
  card.querySelector(".dtr-message").textContent = msg;

  const closeBtn = card.querySelector(".dtr-close");
  closeBtn.textContent = type === "reba" ? "よっしゃー！今日も頑張る！" : "今日は頑張るぞ！";
  closeBtn.className = `dtr-close ${type === "reba" ? "reba-style" : "tara-style"}`;

  overlay.classList.add("open");

  // 表示済みフラグ（今日は二度表示しない）
  state.yesterdayStatus = null;
  saveState();
}

// ======== Web Notifications ========

let notifPermission = Notification.permission;

function requestNotificationPermission() {
  if (!("Notification" in window)) return;
  Notification.requestPermission().then(result => {
    notifPermission = result;
    if (result === "granted") {
      hideBanner();
      scheduleAllNotifications();
    }
  });
}

function showNotifBanner() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") return;
  if (Notification.permission === "denied") return;
  if (state.notifDismissed) return;
  const banner = document.getElementById("notif-banner");
  if (banner) banner.classList.add("show");
}

function hideBanner() {
  const banner = document.getElementById("notif-banner");
  if (banner) banner.classList.remove("show");
}

// タスクの通知をスケジュール（ページ開いている間のみ有効）
function scheduleNotification(task) {
  if (!task.notifEnabled || !task.dueDate || !task.notifTime) return;
  if (Notification.permission !== "granted") return;
  if (task.done) return;

  const now = new Date();
  const targetTime = new Date(task.dueDate + "T" + task.notifTime + ":00");
  const msUntil = targetTime - now;

  if (msUntil <= 0) return; // 過去の時間は無視

  // 既存のタイマーをクリア
  if (window._notifTimers && window._notifTimers[task.id]) {
    clearTimeout(window._notifTimers[task.id]);
  }
  if (!window._notifTimers) window._notifTimers = {};

  window._notifTimers[task.id] = setTimeout(() => {
    new Notification("ハレタス ⏰", {
      body: `📋 ${task.name}`,
      icon: "./manifest.json",
      tag: "haretasu-task-" + task.id,
      requireInteraction: false
    });
  }, msUntil);
}

function scheduleAllNotifications() {
  if (Notification.permission !== "granted") return;
  state.tasks.forEach(t => scheduleNotification(t));
}

// ======== Complete task ========

function completeTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task || task.done) return;

  task.done = true;
  task.completedDate = todayStr();
  state.harePoints += 10;
  state.totalCompleted++;

  const todayAll = getTodayTasks().concat(getDoneTasks());
  const allDone = todayAll.every(t => t.done);
  if (allDone && todayAll.length > 0) {
    state.harePoints += 20;
    state.streak++;
    state.harePoints += 5;
  }

  saveState();
  renderAll();
  spawnConfetti();

  const cat = state.goal.category || "その他";
  showTarareba("reba", cat);
}

// ======== Habit Logic ========

function calcHabitStreak(habit) {
  const logs = habit.logs || {};
  const today = todayStr();
  let streak = 0;

  if (habit.mode === "strict") {
    let d = new Date(today + "T00:00:00");
    while (true) {
      const ds = d.toISOString().slice(0,10);
      if (logs[ds]) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
  } else {
    const sortedDays = Object.keys(logs).filter(d => logs[d]).sort().reverse();
    if (!sortedDays.length) return 0;
    const latestDone = sortedDays[0];
    const diffFromToday = dayDiff(today, latestDone);
    if (diffFromToday > 3) return 0;
    streak = 1;
    let prevDone = latestDone;
    for (let i = 1; i < sortedDays.length; i++) {
      const cur = sortedDays[i];
      const gap = dayDiff(prevDone, cur);
      if (gap <= 3) { streak++; prevDone = cur; }
      else break;
    }
  }
  return streak;
}

function isHabitDoneToday(habit) {
  const today = todayStr();
  return !!(habit.logs && habit.logs[today]);
}

function completeHabit(id) {
  const habit = state.habits.find(h => h.id === id);
  if (!habit) return;

  const today = todayStr();
  if (!habit.logs) habit.logs = {};

  if (habit.logs[today]) {
    delete habit.logs[today];
    state.harePoints = Math.max(0, state.harePoints - 5);
    state.totalCompleted = Math.max(0, state.totalCompleted - 1);
  } else {
    habit.logs[today] = true;
    state.harePoints += 5;
    state.totalCompleted++;
    const streak = calcHabitStreak(habit);
    if (streak > 0 && streak % 7 === 0) state.harePoints += 15;
    spawnConfetti();
    const cat = state.goal.category || "その他";
    showTarareba("reba", cat);
  }

  saveState();
  renderAll();
}

function saveHabit() {
  const name = document.getElementById("habit-name-input").value.trim();
  if (!name) { alert("習慣名を入力してね！"); return; }
  const mode = document.getElementById("habit-mode-input").value;

  if (editingHabitId) {
    const h = state.habits.find(h => h.id === editingHabitId);
    if (h) { h.name = name; h.mode = mode; }
  } else {
    state.habits.push({ id: Date.now().toString(), name, mode, logs: {}, createdAt: todayStr() });
  }

  saveState();
  closeModal("habit-modal");
  renderHabits();
}

function deleteHabit(id) {
  if (!confirm("この習慣を削除する？")) return;
  state.habits = state.habits.filter(h => h.id !== id);
  saveState();
  renderHabits();
}

function openEditHabit(id) {
  const h = state.habits.find(h => h.id === id);
  if (!h) return;
  editingHabitId = id;
  document.getElementById("habit-modal-title").textContent = "習慣を編集する 🔥";
  document.getElementById("habit-name-input").value = h.name;
  document.getElementById("habit-mode-input").value = h.mode;
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.mode === h.mode);
  });
  openModal("habit-modal");
}

// ======== Habit Render ========

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";

  if (!state.habits.length) {
    list.innerHTML = '<div class="empty-tasks">習慣を追加して毎日コツコツ続けよう🔥</div>';
    return;
  }

  const today = todayStr();
  const days7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days7.push(d.toISOString().slice(0,10));
  }
  const dayLabels = ["日","月","火","水","木","金","土"];

  state.habits.forEach(habit => {
    const streak = calcHabitStreak(habit);
    const doneToday = isHabitDoneToday(habit);
    const modeLabel = habit.mode === "strict" ? "🔥 頑張る" : "🌱 ゆるく";

    let dotsHtml = '<div class="habit-dots">';
    days7.forEach(d => {
      const done = !!(habit.logs && habit.logs[d]);
      const isToday = d === today;
      const dow = new Date(d + "T00:00:00").getDay();
      let cls = "habit-dot";
      if (isToday) cls += " today-dot";
      if (done) cls += " done-dot";
      else if (!isToday) cls += " missed-dot";
      dotsHtml += `<div class="${cls}" title="${d}">${dayLabels[dow]}</div>`;
    });
    dotsHtml += '<span class="habit-dot-label">直近7日</span></div>';

    const div = document.createElement("div");
    div.className = "habit-item" + (doneToday ? " done-today" : "");
    div.innerHTML = `
      <div class="habit-item-top">
        <button class="habit-check" data-habit-id="${habit.id}">${doneToday ? "✓" : ""}</button>
        <div class="habit-info">
          <div class="habit-name">${escHtml(habit.name)}</div>
          <div class="habit-streak-row">
            <span class="habit-streak-badge ${habit.mode === 'strict' ? 'fire' : 'leaf'}">
              ${habit.mode === 'strict' ? '🔥' : '🌱'} ${streak}日継続
            </span>
            <span class="habit-mode-badge">${modeLabel}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn" data-habit-edit="${habit.id}" title="編集">✏️</button>
          <button class="task-btn" data-habit-del="${habit.id}" title="削除">🗑️</button>
        </div>
      </div>
      ${dotsHtml}
    `;
    list.appendChild(div);
  });
}

// ======== Tarareba ========

function showTarareba(type, category) {
  const pool = type === "reba"
    ? [...(REBA_MESSAGES[category] || REBA_MESSAGES["その他"]), ...state.userReba.map(m => m.text)]
    : [...(TARA_MESSAGES[category] || TARA_MESSAGES["その他"]), ...state.userTara.map(m => m.text)];
  const msg = pool[Math.floor(Math.random() * pool.length)];

  const overlay = document.getElementById("tarareba-overlay");
  const card = document.getElementById("tarareba-card");
  const typeEl = card.querySelector(".tr-type");
  const emojiEl = card.querySelector(".tr-emoji");
  const msgEl = card.querySelector(".tr-message");
  const closeBtn = card.querySelector(".tr-close");

  if (type === "reba") {
    typeEl.textContent = "レバ"; typeEl.className = "tr-type reba";
    emojiEl.textContent = "🌟";
    closeBtn.className = "tr-close reba-btn"; closeBtn.textContent = "やったー！";
  } else {
    typeEl.textContent = "タラ"; typeEl.className = "tr-type tara";
    emojiEl.textContent = "🌧️";
    closeBtn.className = "tr-close tara-btn"; closeBtn.textContent = "よし、やろう！";
  }
  msgEl.textContent = msg;
  overlay.classList.add("open");
}

// ======== Confetti ========

function spawnConfetti() {
  const colors = ["#FFB347","#FFE066","#6DBF6D","#FF8FAB","#87CEEB","#FFD700"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.left = (20 + Math.random() * 60) + "vw";
    el.style.top = "60px";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (8 + Math.random() * 8) + "px";
    el.style.height = (8 + Math.random() * 8) + "px";
    el.style.animationDelay = (Math.random() * 0.4) + "s";
    el.style.animationDuration = (0.9 + Math.random() * 0.6) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

// ======== Render ========

function renderAll() {
  renderSky();
  renderPoints();
  renderPlant();
  renderTasks();
  renderReport();
}

function renderSky() {
  const sky = document.getElementById("sky-area");
  const sun = document.getElementById("sun");
  const clouds = document.querySelectorAll(".cloud");
  const label = document.getElementById("sky-label");

  sky.className = getSkyClass();
  label.textContent = getSkyLabel();

  const p = calcProgress();
  if (p === 0) {
    sun.className = "hidden";
    clouds.forEach(c => c.classList.remove("faded","gone"));
  } else if (p < 0.33) {
    sun.className = "dim";
    clouds.forEach(c => { c.classList.remove("gone"); c.classList.add("faded"); });
  } else if (p < 0.66) {
    sun.className = "bright";
    clouds.forEach((c, i) => {
      if (i === 0) c.classList.add("faded");
      else { c.classList.remove("faded"); c.classList.add("gone"); }
    });
  } else {
    sun.className = "glow";
    clouds.forEach(c => c.classList.add("gone"));
  }
}

function renderPoints() {
  document.getElementById("pb-value").textContent = state.harePoints + " pt";
  document.getElementById("pb-streak").textContent = `🔥 ${state.streak}日連続達成`;
  const p = calcProgress();
  document.getElementById("progress-fill").style.width = Math.round(p * 100) + "%";
}

function renderPlant() {
  const plant = getPlant();
  const stage = getPlantStage();
  const emoji = plant.stages[stage];

  document.getElementById("plant-emoji").textContent = emoji;
  document.getElementById("plant-stage-label").textContent = PLANT_STAGE_LABELS[stage];
  document.getElementById("plant-select-btn").textContent = plant.name + " 🌱";

  const pct = Math.min(100, (state.harePoints / 500) * 100);
  document.getElementById("plant-progress-fill").style.width = pct + "%";
}

let currentTab = "today";

function renderTasks() {
  const list = document.getElementById("task-list");
  const habitList = document.getElementById("habit-list");
  const btnAdd = document.getElementById("btn-add-task");
  const btnAddHabit = document.getElementById("btn-add-habit");

  if (currentTab === "habit") {
    list.style.display = "none";
    habitList.style.display = "flex";
    btnAdd.style.display = "none";
    btnAddHabit.style.display = "block";
    renderHabits();
    return;
  }

  list.style.display = "flex";
  habitList.style.display = "none";
  btnAdd.style.display = "block";
  btnAddHabit.style.display = "none";
  list.innerHTML = "";

  let tasks = [];
  if (currentTab === "today") {
    tasks = getTodayTasks().concat(getDoneTasks());
  } else if (currentTab === "overdue") {
    tasks = getOverdueTasks();
  } else {
    tasks = getFutureTasks();
  }

  if (!tasks.length) {
    list.innerHTML = `<div class="empty-tasks">${
      currentTab === "today" ? "今日のタスクを追加しよう✨" :
      currentTab === "overdue" ? "やり残しなし！いい調子🌟" :
      "今後の予定はまだないよ📅"
    }</div>`;
    return;
  }

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-item" + (task.done ? " done" : "") + (isOverdue(task) ? " overdue" : "");
    const dtLabel = fmtDateTime(task.dueDate, task.notifTime);
    div.innerHTML = `
      <button class="task-check" data-id="${task.id}" title="完了">${task.done ? "✓" : ""}</button>
      <div class="task-info">
        <div class="task-name">${escHtml(task.name)}</div>
        ${task.dueDate ? `<div class="task-due">${isOverdue(task) ? "⚠️ " : "📅 "}${dtLabel}${task.notifEnabled ? " 🔔" : ""}</div>` : ""}
      </div>
      <div class="task-actions">
        <button class="task-btn" data-edit="${task.id}" title="編集">✏️</button>
        <button class="task-btn" data-del="${task.id}" title="削除">🗑️</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function renderReport() {
  document.getElementById("rep-streak").textContent = state.streak;
  document.getElementById("rep-total").textContent = state.totalCompleted;
  document.getElementById("rep-points").textContent = state.harePoints;

  const allDone = state.tasks.filter(t => t.done).length;
  const allTotal = state.tasks.length;
  const rate = allTotal > 0 ? Math.round(allDone / allTotal * 100) : 0;
  document.getElementById("rep-rate").textContent = rate + "%";

  const plant = getPlant();
  const stage = getPlantStage();
  document.getElementById("rep-plant").textContent = plant.stages[stage] + " " + plant.name + "（" + PLANT_STAGE_LABELS[stage] + "）";

  const repHabits = document.getElementById("rep-habits");
  if (!state.habits.length) {
    repHabits.innerHTML = '<div style="color:#aaa;font-size:13px;padding:8px 0">習慣がまだありません</div>';
  } else {
    repHabits.innerHTML = state.habits.map(h => {
      const streak = calcHabitStreak(h);
      const modeIcon = h.mode === "strict" ? "🔥" : "🌱";
      const totalDays = Object.keys(h.logs || {}).filter(d => h.logs[d]).length;
      return `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #F0E6D3;">
          <span style="font-size:22px">${modeIcon}</span>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:700;color:#3A3A3A">${escHtml(h.name)}</div>
            <div style="font-size:11px;color:#9E9E9E;margin-top:2px">${h.mode === "strict" ? "頑張るモード" : "ゆるく頑張るモード"} · 累計${totalDays}日達成</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:20px;font-weight:800;color:#FFB347">${streak}</div>
            <div style="font-size:10px;color:#9E9E9E">日継続</div>
          </div>
        </div>
      `;
    }).join("");
  }
}

function escHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ======== Modals ========

function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

// ======== Calendar UI ========

let calYear = 0;
let calMonth = 0;
let calSelectedDate = "";
let calTargetInput = ""; // どのモーダルで使うか

function openCalendar(inputId) {
  calTargetInput = inputId;
  const existing = document.getElementById(inputId).value;
  const ref = existing ? new Date(existing + "T00:00:00") : new Date();
  calYear = ref.getFullYear();
  calMonth = ref.getMonth();
  calSelectedDate = existing;
  renderCalendar();
  openModal("calendar-modal");
}

function renderCalendar() {
  const label = document.getElementById("cal-month-label");
  const grid = document.getElementById("cal-grid-body");
  if (!label || !grid) return;

  const monthNames = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  label.textContent = `${calYear}年 ${monthNames[calMonth]}`;

  // first day of month
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = todayStr();

  grid.innerHTML = "";

  // padding
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-day other-month";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const btn = document.createElement("button");
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const dow = new Date(calYear, calMonth, day).getDay();

    let cls = "cal-day";
    if (dateStr === today) cls += " today";
    if (dateStr === calSelectedDate) cls += " selected";
    if (dow === 0) cls += " sun-col";
    if (dow === 6) cls += " sat-col";

    btn.className = cls;
    btn.textContent = day;
    btn.addEventListener("click", () => {
      calSelectedDate = dateStr;
      document.getElementById(calTargetInput).value = dateStr;
      // display update
      const disp = document.getElementById("cal-selected-display");
      if (disp) disp.textContent = "選択中: " + fmtDate(dateStr);
      closeModal("calendar-modal");
    });
    grid.appendChild(btn);
  }

  const disp = document.getElementById("cal-selected-display");
  if (disp) {
    disp.textContent = calSelectedDate ? "選択中: " + fmtDate(calSelectedDate) : "日付を選んでください";
  }
}

// ======== Task Modal ========

let editingTaskId = null;
let editingHabitId = null;

function openAddTask() {
  editingTaskId = null;
  document.getElementById("task-modal-title").textContent = "タスクを追加";
  document.getElementById("task-name-input").value = "";
  document.getElementById("task-due-input").value = "";
  document.getElementById("task-time-input").value = "";
  // 通知トグルリセット
  const toggle = document.getElementById("task-notif-toggle");
  toggle.classList.remove("on");
  toggle.dataset.on = "0";
  openModal("task-modal");
}

function openEditTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  editingTaskId = id;
  document.getElementById("task-modal-title").textContent = "タスクを編集";
  document.getElementById("task-name-input").value = task.name;
  document.getElementById("task-due-input").value = task.dueDate || "";
  document.getElementById("task-time-input").value = task.notifTime || "";
  const toggle = document.getElementById("task-notif-toggle");
  const on = !!task.notifEnabled;
  toggle.classList.toggle("on", on);
  toggle.dataset.on = on ? "1" : "0";
  openModal("task-modal");
}

function saveTask() {
  const name = document.getElementById("task-name-input").value.trim();
  if (!name) { alert("タスク名を入力してね！"); return; }
  const dueDate = document.getElementById("task-due-input").value;
  const notifTime = document.getElementById("task-time-input").value;
  const notifEnabled = document.getElementById("task-notif-toggle").dataset.on === "1";

  if (editingTaskId) {
    const task = state.tasks.find(t => t.id === editingTaskId);
    if (task) {
      task.name = name;
      task.dueDate = dueDate;
      task.notifTime = notifTime;
      task.notifEnabled = notifEnabled;
      scheduleNotification(task);
    }
  } else {
    const task = {
      id: Date.now().toString(),
      name, dueDate,
      notifTime, notifEnabled,
      done: false, completedDate: null
    };
    state.tasks.push(task);
    scheduleNotification(task);
  }
  saveState();
  closeModal("task-modal");
  renderAll();
}

function deleteTask(id) {
  if (!confirm("このタスクを削除する？")) return;
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  renderAll();
}

// ======== Habit Modal ========

function openAddHabit() {
  editingHabitId = null;
  document.getElementById("habit-modal-title").textContent = "習慣を追加する 🔥";
  document.getElementById("habit-name-input").value = "";
  document.getElementById("habit-mode-input").value = "strict";
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.mode === "strict");
  });
  openModal("habit-modal");
}

// ======== Goal Modal ========

function openGoalModal() {
  document.getElementById("goal-text-input").value = state.goal.text;
  document.querySelectorAll("#goal-modal .chip").forEach(c => {
    c.classList.toggle("selected", c.dataset.cat === state.goal.category);
  });
  openModal("goal-modal");
}

function saveGoal() {
  const text = document.getElementById("goal-text-input").value.trim();
  const catEl = document.querySelector("#goal-modal .chip.selected");
  state.goal.text = text;
  state.goal.category = catEl ? catEl.dataset.cat : "";
  saveState();
  closeModal("goal-modal");
  renderGoalDisplay();
  renderAll();
}

function renderGoalDisplay() {
  const el = document.getElementById("goal-display");
  const cat = document.getElementById("goal-category");
  const txt = document.getElementById("goal-text");
  if (state.goal.text) {
    el.classList.remove("empty");
    cat.textContent = state.goal.category || "目標";
    txt.textContent = state.goal.text;
  } else {
    el.classList.add("empty");
    cat.textContent = "目標";
    txt.textContent = "目標を設定しよう！";
  }
}

// ======== Plant Modal ========

function openPlantModal() {
  renderPlantOptions();
  openModal("plant-modal");
}

function renderPlantOptions() {
  const grid = document.getElementById("plant-grid");
  grid.innerHTML = "";
  PLANT_TYPES.forEach(p => {
    const div = document.createElement("div");
    div.className = "plant-opt" + (state.plantId === p.id ? " selected" : "");
    div.innerHTML = `<div class="po-emoji">${p.stages[getPlantStageFor(p)]}</div><div class="po-name">${p.name}</div>`;
    div.onclick = () => {
      state.plantId = p.id;
      saveState();
      closeModal("plant-modal");
      renderPlant();
    };
    grid.appendChild(div);
  });
}

function getPlantStageFor(plant) {
  const pts = state.harePoints;
  if (pts < 50)  return 0;
  if (pts < 150) return 1;
  if (pts < 300) return 2;
  if (pts < 500) return 3;
  return 4;
}

// ======== Tarareba User Messages ========

function renderUserTarareba() {
  const list = document.getElementById("user-tr-list");
  list.innerHTML = "";
  const all = [
    ...state.userTara.map(m => ({ ...m, type: "tara" })),
    ...state.userReba.map(m => ({ ...m, type: "reba" }))
  ];
  if (!all.length) {
    list.innerHTML = '<p style="color:#aaa;font-size:13px;text-align:center;padding:12px">まだ登録されていません</p>';
    return;
  }
  all.forEach(m => {
    const div = document.createElement("div");
    div.className = "tr-user-item";
    div.innerHTML = `
      <span class="tui-type ${m.type}">${m.type === "tara" ? "タラ" : "レバ"}</span>
      <span class="tui-text">${escHtml(m.text)}</span>
      <button class="tui-del" data-type="${m.type}" data-id="${m.id}">✕</button>
    `;
    list.appendChild(div);
  });
}

function addUserTarareba() {
  const type = document.getElementById("tr-type-select").value;
  const text = document.getElementById("tr-text-input").value.trim();
  if (!text) { alert("メッセージを入力してね！"); return; }
  const msg = { id: Date.now().toString(), text };
  if (type === "tara") state.userTara.push(msg);
  else state.userReba.push(msg);
  document.getElementById("tr-text-input").value = "";
  saveState();
  renderUserTarareba();
}

function deleteUserTarareba(type, id) {
  if (type === "tara") state.userTara = state.userTara.filter(m => m.id !== id);
  else state.userReba = state.userReba.filter(m => m.id !== id);
  saveState();
  renderUserTarareba();
}

// ======== View switching ========

let currentView = "home";

function switchView(view) {
  currentView = view;
  document.getElementById("home-view").style.display = view === "home" ? "block" : "none";
  document.getElementById("report-view").classList.toggle("visible", view === "report");
  document.getElementById("settings-view").classList.toggle("visible", view === "settings");
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.view === view);
  });
  if (view === "report") renderReport();
}

// ======== Init ========

document.addEventListener("DOMContentLoaded", () => {
  // PWA service worker 登録
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(console.error);
  }

  dailyCheck();

  const word = TODAY_WORDS[Math.floor(Math.random() * TODAY_WORDS.length)];
  document.getElementById("word-today").textContent = word;

  const now = new Date();
  const days = ["日","月","火","水","木","金","土"];
  document.getElementById("date-display").textContent =
    `${now.getMonth()+1}月${now.getDate()}日（${days[now.getDay()]}）`;

  renderGoalDisplay();

  // 通知バナー
  showNotifBanner();

  // 通知済みタスクを再スケジュール
  scheduleAllNotifications();

  // タブ切り替え
  document.querySelectorAll(".task-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab;
      document.querySelectorAll(".task-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTasks();
    });
  });

  document.getElementById("btn-add-task").addEventListener("click", openAddTask);
  document.getElementById("btn-add-habit").addEventListener("click", openAddHabit);
  document.getElementById("btn-set-goal").addEventListener("click", openGoalModal);
  document.getElementById("goal-display").addEventListener("click", openGoalModal);
  document.getElementById("plant-select-btn").addEventListener("click", openPlantModal);

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  document.getElementById("menu-btn").addEventListener("click", () => openModal("menu-modal"));

  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.getElementById("btn-save-task").addEventListener("click", saveTask);
  document.getElementById("btn-save-habit").addEventListener("click", saveHabit);

  // カレンダーボタン
  document.getElementById("btn-open-cal-task").addEventListener("click", () => {
    openCalendar("task-due-input");
  });

  // カレンダーナビ
  document.getElementById("cal-prev-btn").addEventListener("click", () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });
  document.getElementById("cal-next-btn").addEventListener("click", () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });

  // 通知トグル
  document.getElementById("task-notif-toggle").addEventListener("click", function() {
    const on = this.dataset.on === "1";
    if (!on && Notification.permission !== "granted") {
      requestNotificationPermission();
    }
    this.classList.toggle("on", !on);
    this.dataset.on = on ? "0" : "1";
  });

  // 通知バナーボタン
  document.getElementById("notif-allow-btn")?.addEventListener("click", () => {
    requestNotificationPermission();
  });
  document.getElementById("notif-dismiss-btn")?.addEventListener("click", () => {
    state.notifDismissed = true;
    saveState();
    hideBanner();
  });

  // 習慣モードボタン
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      document.getElementById("habit-mode-input").value = btn.dataset.mode;
    });
  });

  // 目標カテゴリチップ
  document.querySelectorAll("#goal-modal .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#goal-modal .chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
    });
  });

  document.getElementById("btn-save-goal").addEventListener("click", saveGoal);

  // タラレバカード閉じる
  document.querySelector("#tarareba-card .tr-close").addEventListener("click", () => {
    document.getElementById("tarareba-overlay").classList.remove("open");
  });
  document.getElementById("tarareba-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("tarareba-overlay")) {
      document.getElementById("tarareba-overlay").classList.remove("open");
    }
  });

  // 日跨ぎタラレバ閉じる
  document.querySelector("#daily-tarareba-card .dtr-close").addEventListener("click", () => {
    document.getElementById("daily-tarareba-overlay").classList.remove("open");
  });
  document.getElementById("daily-tarareba-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("daily-tarareba-overlay")) {
      document.getElementById("daily-tarareba-overlay").classList.remove("open");
    }
  });

  document.getElementById("btn-add-tr").addEventListener("click", addUserTarareba);

  document.getElementById("settings-tr-btn").addEventListener("click", () => {
    renderUserTarareba();
    openModal("tr-modal");
  });
  document.getElementById("settings-plant-btn").addEventListener("click", openPlantModal);
  document.getElementById("settings-goal-btn").addEventListener("click", openGoalModal);
  document.getElementById("settings-notif-btn").addEventListener("click", () => {
    requestNotificationPermission();
  });
  document.getElementById("settings-reset-btn").addEventListener("click", () => {
    if (confirm("すべてのデータをリセットしますか？")) {
      localStorage.removeItem("haretasu_state");
      state = defaultState();
      renderAll();
      renderGoalDisplay();
      alert("リセットしました！");
    }
  });

  document.getElementById("menu-tara-btn")?.addEventListener("click", () => {
    closeModal("menu-modal");
    showTarareba("tara", state.goal.category || "その他");
  });
  document.getElementById("menu-reba-btn")?.addEventListener("click", () => {
    closeModal("menu-modal");
    showTarareba("reba", state.goal.category || "その他");
  });

  renderAll();
});

// ======== Event delegation ========

document.addEventListener("click", e => {
  const checkBtn = e.target.closest("[data-id]");
  if (checkBtn && checkBtn.classList.contains("task-check")) {
    completeTask(checkBtn.dataset.id);
    return;
  }
  const editBtn = e.target.closest("[data-edit]");
  if (editBtn && !editBtn.dataset.habitEdit) {
    openEditTask(editBtn.dataset.edit);
    return;
  }
  const delBtn = e.target.closest("[data-del]");
  if (delBtn && !delBtn.dataset.habitDel) {
    deleteTask(delBtn.dataset.del);
    return;
  }
  const habitCheck = e.target.closest("[data-habit-id]");
  if (habitCheck) {
    completeHabit(habitCheck.dataset.habitId);
    return;
  }
  const habitEdit = e.target.closest("[data-habit-edit]");
  if (habitEdit) {
    openEditHabit(habitEdit.dataset.habitEdit);
    return;
  }
  const habitDel = e.target.closest("[data-habit-del]");
  if (habitDel) {
    deleteHabit(habitDel.dataset.habitDel);
    return;
  }
  const trDel = e.target.closest("[data-type][data-id]");
  if (trDel && trDel.classList.contains("tui-del")) {
    deleteUserTarareba(trDel.dataset.type, trDel.dataset.id);
    return;
  }
});
