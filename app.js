/* =============================================
   LOVE APP v3 — живой стиль
   ============================================= */

const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#111118'); tg.setBackgroundColor('#111118'); }

// ---- TG Notifications ----
const BOT_TOKEN = '8983936573:AAEDgrsXK6LxOBBID8ZR0BE318Wm2a3s1QY';
const OWNER_ID = '1996701955';

function notifyOwner(text) {
  try {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: OWNER_ID, text, parse_mode: 'HTML' }),
    });
  } catch(e) {}
}

// ==================== DATA ====================

const LEVELS = [
  { n:'Искорка', xp:0 },
  { n:'Звёздочка', xp:500 },
  { n:'Лучик', xp:1200 },
  { n:'Солнышко', xp:2500 },
  { n:'Принцесса', xp:5000 },
  { n:'Королева', xp:9000 },
  { n:'Богиня', xp:15000 },
  { n:'Легенда любви', xp:25000 },
];

const QUOTES = [
  'я тебя любдюююю милая моя девочка сладкая!!!',
  'ты самая красивая на свете и даж не спорь со мной',
  'скучаюю по тебе прям щас.. вот прям ваще 😭',
  'мне так повезло с тобой что аж страшно иногда',
  'ты моя любимая вредина и это не лечится',
  'хочу обнять тебя крепко крепко и не отпускать',
  'каждый день с тобой это кайфффф',
  'ты лучшее что вообще случалось в моей жизни серьёзно',
  'если бы любовь была вайфай у нас был бы вечный сигнал',
  'ты такая классная что я до сих пор не верю',
  'обнимаю тебя мысленно крепкооо крепкоо',
  'с тобой даже просто валяться на диване это счастье',
  'ты мой любимый человечек на всей планете',
  'я бы выбрал тебя в любой вселенной без вариантов',
  'знаешь что?? ты невероятная. вот и всёёё.',
  'ты заряжаешь меня какой то безумной энергией',
  'хочу увидеть твою улыбочку прям сейчас 🥺',
  'наша любовь сильнее любого вайфая и это факт',
];

const QUESTS = [
  { id:'q1', icon:'💌', name:'напишии мне комплиментикк пжж 🥺', reward:50, cur:'h', bg:'pink-bg' },
  { id:'q2', icon:'🎬', name:'выбирай фильмец на вечерок', reward:60, cur:'h', bg:'purple-bg' },
  { id:'q3', icon:'🎵', name:'скинь нашу песенку мне', reward:40, cur:'h', bg:'blue-bg' },
  { id:'q4', icon:'📸', name:'сделай милое селфачо для меня', reward:70, cur:'h', bg:'pink-bg' },
  { id:'q5', icon:'⭐', name:'загадай желание и я попробую исполнить', reward:35, cur:'h', bg:'gold-bg' },
  { id:'q6', icon:'🍕', name:'чоо будем кушатьь?? выбирай', reward:30, cur:'h', bg:'orange-bg' },
  { id:'q7', icon:'💭', name:'расскажи чо классного было сегодня', reward:45, cur:'h', bg:'purple-bg' },
  { id:'q8', icon:'😘', name:'придумай нам новое прозвищее', reward:55, cur:'h', bg:'pink-bg' },
  { id:'q9', icon:'🎮', name:'во чо поиграем вечером?? давай', reward:50, cur:'h', bg:'green-bg' },
  { id:'q10', icon:'💋', name:'отправь мне 10 поцелуйчиков подряд мууу', reward:40, cur:'h', bg:'pink-bg' },
  { id:'q11', icon:'📝', name:'напиши 3 штуки за которые благодарна 💖', reward:45, cur:'h', bg:'blue-bg' },
  { id:'q12', icon:'🎨', name:'нарисуй нас двоих!! даже палка палка пойдёт', reward:80, cur:'h', bg:'purple-bg' },
  { id:'q13', icon:'🤳', name:'скинь фотку того что видишь прям щас', reward:35, cur:'h', bg:'green-bg' },
  { id:'q14', icon:'🗺️', name:'куда пойдём на свиданочку? выбирай', reward:65, cur:'h', bg:'blue-bg' },
  { id:'q15', icon:'🏖️', name:'придумай план на выхи!! хочу кайфовать', reward:60, cur:'h', bg:'orange-bg' },
  { id:'q16', icon:'🎤', name:'запиши голосовуху "люблююю тебя"', reward:75, cur:'h', bg:'pink-bg' },
  { id:'q17', icon:'📖', name:'вспомни наш самый угарный момент', reward:50, cur:'h', bg:'gold-bg' },
  { id:'q18', icon:'🌈', name:'какой цвет у твоего настроения щас?', reward:25, cur:'h', bg:'purple-bg' },
  { id:'q19', icon:'🧸', name:'скинь мемасик про нас 😂', reward:45, cur:'h', bg:'orange-bg' },
  { id:'q20', icon:'✍️', name:'напиши мне мини стишок (даже смешной)', reward:90, cur:'h', bg:'purple-bg' },
  { id:'q21', icon:'🔮', name:'предскажи какой у нас будет вечер', reward:35, cur:'h', bg:'blue-bg' },
  { id:'q22', icon:'🎭', name:'изобрази меня голосовухой хахах', reward:70, cur:'h', bg:'gold-bg' },
  { id:'q23', icon:'💐', name:'скажи 5 комплиментов без остановки гоу', reward:55, cur:'h', bg:'pink-bg' },
  { id:'q24', icon:'🌙', name:'пожелай мне спокойной ночки 💤', reward:30, cur:'h', bg:'blue-bg' },
  { id:'q25', icon:'☀️', name:'доброе утречко с фоточкой для меня', reward:40, cur:'h', bg:'gold-bg' },
];

const GIFTS_H = [
  { id:'gh1', icon:'🎬', name:'киновечерок на твой выбор', price:200, desc:'выбираешь фильм и мы смотрим вместеее!' },
  { id:'gh2', icon:'🎵', name:'плейлистик из 10 песенок', price:150, desc:'соберу треки специально для тебя кисулька' },
  { id:'gh3', icon:'💬', name:'комплиментикк от любимово', price:100, desc:'10 комплиментов подряд без остановки!!' },
  { id:'gh4', icon:'🍕', name:'закажу еду какую скажешь', price:300, desc:'хочешь пиццу? суши? тортик? всёё закажу' },
  { id:'gh5', icon:'🎮', name:'игровой вечерок вместе', price:250, desc:'весь вечер играем во что захочешь' },
  { id:'gh6', icon:'🧸', name:'обнимашечки 30 минуток', price:80, desc:'полчаса обнимаю и не отпускаюю' },
  { id:'gh7', icon:'💆', name:'массажик спинки', price:180, desc:'профессиональный массажик от любимово 😌' },
  { id:'gh8', icon:'👩‍🍳', name:'вместе чота приготовим', price:220, desc:'будем готовить вместе и кайфовать' },
  { id:'gh9', icon:'🚶', name:'прогулочка куда скажешь', price:160, desc:'идём куда покажешь пальчиком' },
  { id:'gh10', icon:'😂', name:'мемасики подборочка', price:90, desc:'20 отборных мемов специально для тебя' },
  { id:'gh11', icon:'🧁', name:'вкусняшка-сюрприз', price:200, desc:'куплю тебе что-нибудь вкусненькоеее' },
  { id:'gh12', icon:'📺', name:'сериальчик-марафон', price:350, desc:'целый день смотрим твой сериал и валяемся' },
  { id:'gh13', icon:'🛁', name:'вечерок релакса', price:280, desc:'ванна свечки музычка — всё устрою для тебя' },
  { id:'gh14', icon:'📱', name:'день без телефонов вместе', price:400, desc:'только мы двое никаких экранов целый день' },
];

const GIFTS_G = [
  { id:'gg1', icon:'💌', name:'длинное письмо любвии', price:5, desc:'напишу от всего сердечка для тебя' },
  { id:'gg2', icon:'📞', name:'спец звоночек по заказу', price:10, desc:'позвоню когда скажешь и буду говорить милости' },
  { id:'gg3', icon:'🌹', name:'сюрприз-свиданочка', price:15, desc:'организую свидание сюрприз!!' },
  { id:'gg4', icon:'📱', name:'сказочка на ночку', price:8, desc:'расскажу или прочитаю перед сном 🌙' },
  { id:'gg5', icon:'🎨', name:'цифровой портретик', price:12, desc:'закажу или нарисую тебяя' },
  { id:'gg6', icon:'🎤', name:'песенка в моём исполнении', price:7, desc:'спою для тебя (ну как могу хаха)' },
  { id:'gg7', icon:'⭐', name:'звёздное свиданьице', price:20, desc:'ночь под звёздами с тобой' },
  { id:'gg8', icon:'👑', name:'целый день по твоим правилам', price:25, desc:'24 часа делаю всё что скажешь!!' },
  { id:'gg9', icon:'🎥', name:'видео-признание в любвии', price:9, desc:'запишу видос специально для тебя' },
  { id:'gg10', icon:'💝', name:'секретная записочка', price:6, desc:'спрячу записку в неожиданном месте 🤫' },
  { id:'gg11', icon:'🎪', name:'квест-свиданочка', price:18, desc:'придумаю квест с сюрпризами по городу' },
  { id:'gg12', icon:'📸', name:'фотосессия для нас двоих', price:22, desc:'устроим мини фотосетик!!' },
];

const ACHIEVEMENTS = [
  { id:'a1', icon:'⚔️', name:'первый квестик', desc:'выполнить 1 квест', cond: s => s.totalQ >= 1 },
  { id:'a2', icon:'🗡️', name:'квестоманка', desc:'выполнить 10 квестов', cond: s => s.totalQ >= 10 },
  { id:'a3', icon:'⚔️', name:'квест-мастерица', desc:'выполнить 30 квестов', cond: s => s.totalQ >= 30 },
  { id:'a4', icon:'🏆', name:'квест-легенда', desc:'выполнить 100 квестов', cond: s => s.totalQ >= 100 },
  { id:'a5', icon:'❤️', name:'собирательница', desc:'накопить 1000 ❤️ всего', cond: s => s.totalH >= 1000 },
  { id:'a6', icon:'💖', name:'сердечный магнатка', desc:'накопить 5000 ❤️ всего', cond: s => s.totalH >= 5000 },
  { id:'a7', icon:'💎', name:'алмазикк', desc:'накопить 20 💎 всего', cond: s => s.totalG >= 20 },
  { id:'a8', icon:'💎', name:'алмазный фондик', desc:'накопить 100 💎 всего', cond: s => s.totalG >= 100 },
  { id:'a9', icon:'🛍️', name:'шопоголичка', desc:'купить 5 подарочков', cond: s => s.totalBuy >= 5 },
  { id:'a10', icon:'🎁', name:'королева подарков', desc:'купить 15 подарочков', cond: s => s.totalBuy >= 15 },
  { id:'a11', icon:'🔥', name:'горячий стрикк', desc:'streak 7 дней подряд', cond: s => s.maxStreak >= 7 },
  { id:'a12', icon:'👑', name:'принцессочка', desc:'достичь 5 уровня', cond: s => lvlInfo(s.xp).lvl >= 5 },
  { id:'a13', icon:'💰', name:'щедрая душенька', desc:'потратить 3000 ❤️', cond: s => s.totalSpentH >= 3000 },
  { id:'a14', icon:'✨', name:'звёздочка', desc:'собрать 5 достижений', cond: s => s.unlocked.length >= 5 },
  { id:'a15', icon:'🌟', name:'все звёздыы', desc:'собрать 10 достижений', cond: s => s.unlocked.length >= 10 },
];

const DAILY_REWARDS = [
  { h:30, g:0, t:'+30 ❤️ ураааа' },
  { h:50, g:0, t:'+50 ❤️ вооот так!!' },
  { h:40, g:1, t:'+40 ❤️ и +1 💎 кайфф' },
  { h:60, g:0, t:'+60 ❤️ огоо!!' },
  { h:35, g:2, t:'+35 ❤️ и +2 💎 красоткаа' },
  { h:80, g:0, t:'+80 ❤️ нифига себе!!' },
  { h:50, g:3, t:'+50 ❤️ и +3 💎 бонус неделькии!!' },
];

// ==================== STATE ====================

let S = {
  hearts:0, gems:0, xp:0,
  streak:0, maxStreak:0,
  totalH:0, totalG:0, totalQ:0, totalBuy:0, totalSpentH:0, totalSpentG:0,
  lastDate:null,
  giftClaimed:false, giftDate:null,
  todayQ:[], doneQ:{}, qDate:null,
  history:[], unlocked:[],
};

let curPage = 'home';
let curTab = 'hearts';

// ==================== STORAGE ====================

const today = () => new Date().toISOString().split('T')[0];

function save() {
  try {
    const d = JSON.stringify(S);
    localStorage.setItem('loveapp', d);
    if (tg?.CloudStorage) tg.CloudStorage.setItem('loveapp', d);
  } catch(e){}
}

function load() {
  return new Promise(r => {
    const apply = v => { try { Object.assign(S, JSON.parse(v)); } catch(e){} };
    if (tg?.CloudStorage) {
      tg.CloudStorage.getItem('loveapp', (e, v) => {
        if (v) apply(v);
        else { const l = localStorage.getItem('loveapp'); if(l) apply(l); }
        r();
      });
    } else {
      const l = localStorage.getItem('loveapp'); if(l) apply(l);
      r();
    }
  });
}

// ==================== LEVEL ====================

function lvlInfo(xp) {
  let lvl=1, rank=LEVELS[0].n, cur=0, next=LEVELS[1]?.xp||500;
  for (let i=LEVELS.length-1; i>=0; i--) {
    if (xp >= LEVELS[i].xp) {
      lvl = i+1;
      rank = LEVELS[i].n;
      cur = LEVELS[i].xp;
      next = LEVELS[i+1]?.xp || LEVELS[i].xp+5000;
      break;
    }
  }
  return { lvl, rank, pct: Math.min((xp-cur)/(next-cur), 1), cur, next };
}

function addXP(n) {
  const old = lvlInfo(S.xp).lvl;
  S.xp += n;
  const nw = lvlInfo(S.xp);
  if (nw.lvl > old) {
    popup('🎉', `уровень ${nw.lvl}!!`, `поздравляюю!! теперь ты «${nw.rank}» 🥳`);
    confetti();
  }
  save();
}

// ==================== DAILY ====================

function processDaily() {
  const t = today();
  if (S.lastDate !== t) {
    const y = new Date(); y.setDate(y.getDate()-1);
    const ys = y.toISOString().split('T')[0];
    S.streak = (S.lastDate === ys) ? S.streak + 1 : 1;
    S.maxStreak = Math.max(S.maxStreak, S.streak);
    S.lastDate = t;
  }
  if (S.giftDate !== t) { S.giftClaimed = false; S.giftDate = t; }
  if (S.qDate !== t) { genQuests(); S.qDate = t; S.doneQ = {}; }
  save();
}

function genQuests() {
  const seed = hashStr(today());
  const sorted = [...QUESTS].sort((a,b) => hashStr(a.id+seed) - hashStr(b.id+seed));
  S.todayQ = sorted.slice(0,5).map(q => q.id);
}

function hashStr(s) {
  let h=0;
  for(let i=0;i<s.length;i++) h=((h<<5)-h+s.charCodeAt(i))|0;
  return h;
}

// ==================== HEADER ====================

function updHeader() {
  const info = lvlInfo(S.xp);
  document.getElementById('hdr-lvl').textContent = `Lv. ${info.lvl}`;
  document.getElementById('d-hearts').textContent = fmtN(S.hearts);
  document.getElementById('d-gems').textContent = fmtN(S.gems);
}

function fmtN(n) { return n >= 10000 ? (n/1000).toFixed(1)+'k' : String(n); }

// ==================== NAVIGATION ====================

function nav(p) {
  if (p === curPage) return;
  haptic('selection');
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const pg = document.getElementById('p-'+p);
  pg.classList.add('active');
  document.querySelector(`.nav-item[data-p="${p}"]`).classList.add('active');
  document.getElementById('main-scroll').scrollTop = 0;
  curPage = p;
  render[p]();
}

document.querySelectorAll('.nav-item').forEach(b => b.addEventListener('click', () => nav(b.dataset.p)));

// ==================== RENDER ====================

const render = {
  home() {
    const info = lvlInfo(S.xp);
    const di = new Date().getDate();

    document.getElementById('home-quote').textContent = QUOTES[di % QUOTES.length];

    document.getElementById('streak-num').textContent = S.streak;
    const dots = document.getElementById('streak-dots');
    dots.innerHTML = '';
    for (let i=0; i<7; i++) {
      const d = document.createElement('div');
      d.className = 's-dot' + (i < (S.streak%7||(S.streak>0?7:0)) ? ' on' : '');
      dots.appendChild(d);
    }

    const banner = document.getElementById('daily-banner');
    const btn = document.getElementById('db-btn');
    const sub = document.getElementById('db-sub');
    if (S.giftClaimed) {
      banner.classList.add('claimed');
      btn.disabled = true;
      btn.textContent = 'ПОЛУЧЕНО ✓';
      sub.textContent = 'приходи завтрааа 💤';
    } else {
      banner.classList.remove('claimed');
      btn.disabled = false;
      btn.textContent = 'ОТКРЫТЬ';
      sub.textContent = 'тыкай скорее!! тут подарочек 🎁';
    }

    document.getElementById('xp-lvl-name').textContent = info.rank;
    document.getElementById('xp-nums').textContent = `${S.xp - info.cur} / ${info.next - info.cur} XP`;
    document.getElementById('xp-fill').style.width = (info.pct * 100) + '%';

    const hq = document.getElementById('home-quests');
    hq.innerHTML = '';
    (S.todayQ || []).slice(0, 2).forEach(qid => {
      const q = QUESTS.find(x => x.id === qid);
      if (!q) return;
      hq.appendChild(makeQCard(q, S.doneQ[qid]));
    });

    updHeader();
  },

  quests() {
    const list = document.getElementById('quests-list');
    list.innerHTML = '';
    let doneN = 0;
    (S.todayQ || []).forEach(qid => {
      const q = QUESTS.find(x => x.id === qid);
      if (!q) return;
      const done = S.doneQ[qid];
      if (done) doneN++;
      list.appendChild(makeQCard(q, done));
    });
    document.getElementById('q-counter').textContent = `${doneN}/${S.todayQ.length}`;

    const al = document.getElementById('achiev-list');
    al.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const ok = a.cond(S);
      if (ok && !S.unlocked.includes(a.id)) { S.unlocked.push(a.id); save(); }
      const d = document.createElement('div');
      d.className = 'ach-card ' + (ok ? 'unlocked' : 'locked');
      d.innerHTML = `
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-body">
          <div class="ach-name">${a.name}</div>
          <div class="ach-desc">${a.desc}</div>
        </div>
        ${ok ? '<div class="ach-check">✓</div>' : ''}
      `;
      al.appendChild(d);
    });

    updHeader();
  },

  gifts() {
    const grid = document.getElementById('gift-grid');
    grid.innerHTML = '';
    const items = curTab === 'hearts' ? GIFTS_H : GIFTS_G;
    const bal = curTab === 'hearts' ? S.hearts : S.gems;

    items.forEach(item => {
      const ok = bal >= item.price;
      const d = document.createElement('div');
      d.className = 'g-item' + (ok ? '' : ' poor');
      d.onclick = () => buyGift(item, curTab);
      d.innerHTML = `
        <span class="g-emoji">${item.icon}</span>
        <div class="g-name">${item.name}</div>
        <span class="g-price ${curTab==='hearts'?'hp':'gp'}">${item.price} ${curTab==='hearts'?'❤️':'💎'}</span>
      `;
      grid.appendChild(d);
    });

    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.t === curTab));
    updHeader();
  },

  profile() {
    const info = lvlInfo(S.xp);
    document.getElementById('prof-rank').textContent = info.rank;
    document.getElementById('prof-sub').textContent = `Level ${info.lvl} · ${S.xp} XP`;

    document.getElementById('s-streak').textContent = S.maxStreak;
    document.getElementById('s-quests').textContent = S.totalQ;
    document.getElementById('s-gifts').textContent = S.totalBuy;
    document.getElementById('s-hearts').textContent = S.totalH;

    const bg = document.getElementById('badge-grid');
    bg.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const ok = S.unlocked.includes(a.id) || a.cond(S);
      const d = document.createElement('div');
      d.className = 'badge' + (ok ? '' : ' locked');
      d.innerHTML = `<span class="badge-e">${a.icon}</span><div class="badge-n">${a.name}</div>`;
      bg.appendChild(d);
    });

    const hl = document.getElementById('history-list');
    hl.innerHTML = '';
    if (!S.history.length) {
      hl.innerHTML = '<div class="empty-msg">пока пусто — загляни в магазинчик! 🛍️</div>';
    } else {
      S.history.forEach(h => {
        const d = document.createElement('div');
        d.className = 'hist-item';
        d.innerHTML = `<span class="hist-e">${h.icon}</span><span class="hist-t">${h.name}</span><span class="hist-d">${fmtDate(h.date)}</span>`;
        hl.appendChild(d);
      });
    }

    updHeader();
  },
};

// ==================== QUEST CARD ====================

function makeQCard(q, done) {
  const colors = ['green','orange','blue'];
  const barColor = colors[Math.abs(hashStr(q.id)) % colors.length];
  const d = document.createElement('div');
  d.className = 'q-card' + (done ? ' done' : '');
  d.innerHTML = `
    <div class="q-icon ${q.bg}">${q.icon}</div>
    <div class="q-body">
      <div class="q-name">${q.name}</div>
      <div class="q-reward">
        <span class="${q.cur==='h'?'h-r':'g-r'}">+${q.reward} ${q.cur==='h'?'❤️':'💎'}</span>
      </div>
      <div class="q-bar"><div class="q-bar-fill ${barColor}" style="width:${done?100:0}%"></div></div>
    </div>
    <button class="q-btn ${done ? 'done-b' : 'go'}" ${done ? '' : `onclick="doQuest('${q.id}')"`}>
      ${done ? '✓' : 'ГОТОВО'}
    </button>
  `;
  return d;
}

// ==================== ACTIONS ====================

function claimDaily() {
  if (S.giftClaimed) return;
  haptic('heavy');

  const banner = document.getElementById('daily-banner');
  const emoji = banner.querySelector('.db-emoji');
  emoji.style.transform = 'scale(1.4) rotate(-10deg)';
  emoji.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';

  setTimeout(() => {
    emoji.style.transform = 'scale(1.6) rotate(10deg)';
    setTimeout(() => {
      emoji.style.transform = '';
      emoji.style.transition = '';

      const ri = ((S.streak-1) % DAILY_REWARDS.length + DAILY_REWARDS.length) % DAILY_REWARDS.length;
      const rw = DAILY_REWARDS[ri];

      S.hearts += rw.h;
      S.gems += rw.g;
      S.totalH += rw.h;
      S.totalG += rw.g;
      S.giftClaimed = true;
      addXP(25);
      save();

      popup('🎁', 'подарочек открыт!!', rw.t);
      confetti();
      render.home();
      checkAch();
    }, 200);
  }, 200);
}

document.getElementById('daily-banner').addEventListener('click', claimDaily);

function doQuest(qid) {
  if (S.doneQ[qid]) return;
  const q = QUESTS.find(x => x.id === qid);
  if (!q) return;
  haptic('success');

  if (q.cur === 'h') { S.hearts += q.reward; S.totalH += q.reward; }
  else { S.gems += q.reward; S.totalG += q.reward; }

  S.doneQ[qid] = true;
  S.totalQ++;
  addXP(50);
  save();

  showReward(`+${q.reward} ${q.cur==='h'?'❤️':'💎'}`);

  if (curPage === 'home') render.home();
  else if (curPage === 'quests') render.quests();

  const allDone = S.todayQ.every(id => S.doneQ[id]);
  if (allDone) {
    setTimeout(() => {
      S.gems += 3;
      S.totalG += 3;
      addXP(100);
      save();
      popup('⚔️', 'все квесты сделаныы!!', 'бонус: +3 💎 и +100 XP!! молодецц 🥳');
      confetti();
      updHeader();
    }, 500);
  }

  checkAch();
}

function buyGift(item, tab) {
  const key = tab === 'hearts' ? 'hearts' : 'gems';
  if (S[key] < item.price) {
    haptic('error');
    popup('😢', 'не хватаетт(', `нужно ещё ${item.price - S[key]} ${key==='hearts'?'❤️':'💎'} копи дальшее`);
    return;
  }
  haptic('success');
  S[key] -= item.price;
  if (key === 'hearts') S.totalSpentH += item.price;
  else S.totalSpentG += item.price;
  S.totalBuy++;

  S.history.unshift({ icon:item.icon, name:item.name, date:today() });
  if (S.history.length > 30) S.history = S.history.slice(0,30);

  addXP(75);
  save();

  popup('🎉', 'подарочек активирован!!', `${item.icon} ${item.name}\n\n${item.desc}`);
  confetti();
  render.gifts();
  checkAch();

  // уведомление тебе
  notifyOwner(`🎁 Мирямочка купила подарок!\n\n${item.icon} <b>${item.name}</b>\n💬 ${item.desc}\n\n${key==='hearts' ? '❤️' : '💎'} Цена: ${item.price}`);
}

// tabs
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  curTab = t.dataset.t;
  render.gifts();
}));

// ==================== ACHIEVEMENTS CHECK ====================

function checkAch() {
  ACHIEVEMENTS.forEach(a => {
    if (!S.unlocked.includes(a.id) && a.cond(S)) {
      S.unlocked.push(a.id);
      save();
      setTimeout(() => {
        popup('🏅', 'новое достижение!!', `${a.icon} ${a.name}\n${a.desc}`);
        confetti();
      }, 700);
    }
  });
}

// ==================== POPUP ====================

function popup(icon, title, text) {
  document.getElementById('pop-icon').textContent = icon;
  document.getElementById('pop-title').textContent = title;
  document.getElementById('pop-text').textContent = text;
  document.getElementById('overlay').classList.add('show');
}

function closePopup() {
  document.getElementById('overlay').classList.remove('show');
  haptic('selection');
}

document.getElementById('overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePopup();
});

// ==================== REWARD FLOAT ====================

function showReward(text) {
  const el = document.createElement('div');
  el.className = 'reward-float';
  el.textContent = text;
  document.getElementById('app').appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ==================== CONFETTI ====================

function confetti() {
  const c = document.getElementById('confetti');
  const ctx = c.getContext('2d');
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const P = [];
  const cols = ['#ff5c93','#a855f7','#fbbf24','#38bdf8','#22c55e','#fb923c','#ef4444'];
  for (let i=0; i<80; i++) {
    P.push({
      x: c.width/2 + (Math.random()-0.5)*120,
      y: c.height/2,
      vx: (Math.random()-0.5)*16,
      vy: Math.random()*-18 - 4,
      sz: Math.random()*7+3,
      col: cols[Math.floor(Math.random()*cols.length)],
      rot: Math.random()*360,
      rs: (Math.random()-0.5)*12,
      g: 0.3,
      op: 1,
    });
  }

  let f = 0;
  function draw() {
    ctx.clearRect(0,0,c.width,c.height);
    let alive = false;
    P.forEach(p => {
      p.x += p.vx; p.vy += p.g; p.y += p.vy;
      p.rot += p.rs; p.op -= 0.009;
      if (p.op > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI/180);
        ctx.globalAlpha = Math.max(0, p.op);
        ctx.fillStyle = p.col;
        ctx.fillRect(-p.sz/2, -p.sz/2, p.sz, p.sz*0.6);
        ctx.restore();
      }
    });
    f++;
    if (alive && f < 140) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,c.width,c.height);
  }
  draw();
}

// ==================== HAPTIC ====================

function haptic(type) {
  if (!tg?.HapticFeedback) return;
  if (type === 'selection') tg.HapticFeedback.selectionChanged();
  else if (type === 'heavy') tg.HapticFeedback.impactOccurred('heavy');
  else if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
  else if (type === 'error') tg.HapticFeedback.notificationOccurred('error');
}

// ==================== HELPERS ====================

function fmtDate(d) {
  const dt = new Date(d);
  const m = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
  return `${dt.getDate()} ${m[dt.getMonth()]}`;
}

// ==================== INIT ====================

async function init() {
  localStorage.removeItem('love_app_state');
  await load();
  processDaily();
  render.home();
  checkAch();
}

init();
