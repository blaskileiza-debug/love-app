/* =============================================
   LOVE APP v2 — Full logic
   ============================================= */

const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#111118'); tg.setBackgroundColor('#111118'); }

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
  'Ты самая красивая на свете, и это не обсуждается!',
  'Каждый день с тобой — маленькое чудо',
  'Улыбнись — ты же знаешь, что ты моя слабость',
  'Если бы любовь была Wi-Fi, у нас был бы вечный сигнал',
  'Ты делаешь мой мир ярче просто тем, что ты есть',
  'Скучаю. Прямо сейчас. Вот так вот.',
  'Ты заслуживаешь всего самого лучшего. Серьёзно.',
  'Обнимаю мысленно крепко-крепко-крепко',
  'Ты лучшее, что случилось в моей жизни',
  'Мне повезло больше, чем я заслуживаю',
  'Хочу увидеть твою улыбку прямо сейчас',
  'С тобой даже ничего не делать — это приключение',
  'Ты мой любимый человек на этой планете',
  'Я бы выбрал тебя в любой вселенной',
  'Ты такая классная, что я до сих пор не верю своему счастью',
  'Наша любовь сильнее любого Wi-Fi',
  'Ты — моя самая красивая мысль',
  'Знаешь что? Ты невероятная. Вот и всё.',
];

const QUESTS = [
  { id:'q1', icon:'💌', name:'Напиши мне комплимент', reward:50, cur:'h', bg:'pink-bg' },
  { id:'q2', icon:'🎬', name:'Выбери фильм на вечер', reward:60, cur:'h', bg:'purple-bg' },
  { id:'q3', icon:'🎵', name:'Отправь нашу песню', reward:40, cur:'h', bg:'blue-bg' },
  { id:'q4', icon:'📸', name:'Сделай милое селфи', reward:70, cur:'h', bg:'pink-bg' },
  { id:'q5', icon:'⭐', name:'Загадай желание', reward:35, cur:'h', bg:'gold-bg' },
  { id:'q6', icon:'🍕', name:'Реши что будем кушать', reward:30, cur:'h', bg:'orange-bg' },
  { id:'q7', icon:'💭', name:'Расскажи лучший момент дня', reward:45, cur:'h', bg:'purple-bg' },
  { id:'q8', icon:'😘', name:'Придумай нам новое прозвище', reward:55, cur:'h', bg:'pink-bg' },
  { id:'q9', icon:'🎮', name:'Выбери игру на вечер', reward:50, cur:'h', bg:'green-bg' },
  { id:'q10', icon:'💋', name:'Отправь 10 поцелуев подряд', reward:40, cur:'h', bg:'pink-bg' },
  { id:'q11', icon:'📝', name:'3 вещи за которые благодарна', reward:45, cur:'h', bg:'blue-bg' },
  { id:'q12', icon:'🎨', name:'Нарисуй нас двоих', reward:80, cur:'h', bg:'purple-bg' },
  { id:'q13', icon:'🤳', name:'Фото того что видишь сейчас', reward:35, cur:'h', bg:'green-bg' },
  { id:'q14', icon:'🗺️', name:'Выбери место для свидания', reward:65, cur:'h', bg:'blue-bg' },
  { id:'q15', icon:'🏖️', name:'Придумай план на выходные', reward:60, cur:'h', bg:'orange-bg' },
  { id:'q16', icon:'🎤', name:'Запиши голосовое "люблю"', reward:75, cur:'h', bg:'pink-bg' },
  { id:'q17', icon:'📖', name:'Расскажи наш смешной момент', reward:50, cur:'h', bg:'gold-bg' },
  { id:'q18', icon:'🌈', name:'Выбери цвет настроения', reward:25, cur:'h', bg:'purple-bg' },
  { id:'q19', icon:'🧸', name:'Отправь мем про нас', reward:45, cur:'h', bg:'orange-bg' },
  { id:'q20', icon:'✍️', name:'Напиши мини-стихотворение', reward:90, cur:'h', bg:'purple-bg' },
  { id:'q21', icon:'🔮', name:'Предскажи наш вечер', reward:35, cur:'h', bg:'blue-bg' },
  { id:'q22', icon:'🎭', name:'Изобрази меня голосовым', reward:70, cur:'h', bg:'gold-bg' },
  { id:'q23', icon:'💐', name:'Скажи 5 комплиментов подряд', reward:55, cur:'h', bg:'pink-bg' },
  { id:'q24', icon:'🌙', name:'Пожелай спокойной ночи', reward:30, cur:'h', bg:'blue-bg' },
  { id:'q25', icon:'☀️', name:'Доброе утро с фоткой', reward:40, cur:'h', bg:'gold-bg' },
];

const GIFTS_H = [
  { id:'gh1', icon:'🎬', name:'Киновечер на твой выбор', price:200, desc:'Выбираешь фильм — смотрим вместе!' },
  { id:'gh2', icon:'🎵', name:'Плейлист 10 песен', price:150, desc:'Соберу песни специально для тебя' },
  { id:'gh3', icon:'💬', name:'Комплимент-бомба', price:100, desc:'10 комплиментов без остановки!' },
  { id:'gh4', icon:'🍕', name:'Заказ еды на твой вкус', price:300, desc:'Закажу всё что захочешь' },
  { id:'gh5', icon:'🎮', name:'Игровой вечер', price:250, desc:'Весь вечер играем вместе' },
  { id:'gh6', icon:'🧸', name:'Обнимашки 30 минут', price:80, desc:'Полчаса обнимашек без перерыва' },
  { id:'gh7', icon:'💆', name:'Массаж спины', price:180, desc:'Профессиональный массажик' },
  { id:'gh8', icon:'👩‍🍳', name:'Совместная готовка', price:220, desc:'Готовим вместе что-то вкусное' },
  { id:'gh9', icon:'🚶', name:'Прогулка где скажешь', price:160, desc:'Идём куда покажешь пальцем' },
  { id:'gh10', icon:'😂', name:'Мем-подборка', price:90, desc:'20 мемов специально для тебя' },
  { id:'gh11', icon:'🧁', name:'Десерт-сюрприз', price:200, desc:'Куплю вкусняшку!' },
  { id:'gh12', icon:'📺', name:'Сериал-марафон', price:350, desc:'Целый день смотрим твой сериал' },
  { id:'gh13', icon:'🛁', name:'Вечер релакса', price:280, desc:'Ванна, свечи, музыка — всё устрою' },
  { id:'gh14', icon:'📱', name:'День без телефона вместе', price:400, desc:'Только мы двое, никаких экранов' },
];

const GIFTS_G = [
  { id:'gg1', icon:'💌', name:'Длинное письмо любви', price:5, desc:'Напишу от всего сердца' },
  { id:'gg2', icon:'📞', name:'Спец звонок по заказу', price:10, desc:'Позвоню когда и где захочешь' },
  { id:'gg3', icon:'🌹', name:'Сюрприз-свидание', price:15, desc:'Организую свидание-сюрприз' },
  { id:'gg4', icon:'📱', name:'Сказка на ночь', price:8, desc:'Расскажу или прочитаю перед сном' },
  { id:'gg5', icon:'🎨', name:'Цифровой портрет', price:12, desc:'Закажу или нарисую тебя' },
  { id:'gg6', icon:'🎤', name:'Песня в моём исполнении', price:7, desc:'Спою для тебя (без гарантий качества)' },
  { id:'gg7', icon:'⭐', name:'Звёздное свидание', price:20, desc:'Ночь под звёздами' },
  { id:'gg8', icon:'👑', name:'Целый день по твоему плану', price:25, desc:'24 часа по твоим правилам' },
  { id:'gg9', icon:'🎥', name:'Видео-признание в любви', price:9, desc:'Запишу видео специально для тебя' },
  { id:'gg10', icon:'💝', name:'Секретное послание', price:6, desc:'Спрячу записку в неожиданном месте' },
  { id:'gg11', icon:'🎪', name:'Квест-свидание', price:18, desc:'Придумаю квест с сюрпризами' },
  { id:'gg12', icon:'📸', name:'Фотосессия для двоих', price:22, desc:'Устроим мини-фотосет' },
];

const ACHIEVEMENTS = [
  { id:'a1', icon:'⚔️', name:'Первый квест', desc:'Выполнить 1 квест', cond: s => s.totalQ >= 1 },
  { id:'a2', icon:'🗡️', name:'Квестоман', desc:'Выполнить 10 квестов', cond: s => s.totalQ >= 10 },
  { id:'a3', icon:'⚔️', name:'Квест-мастер', desc:'Выполнить 30 квестов', cond: s => s.totalQ >= 30 },
  { id:'a4', icon:'🏆', name:'Квест-легенда', desc:'Выполнить 100 квестов', cond: s => s.totalQ >= 100 },
  { id:'a5', icon:'❤️', name:'Собиратель', desc:'Накопить 1000 ❤️ всего', cond: s => s.totalH >= 1000 },
  { id:'a6', icon:'💖', name:'Сердечный магнат', desc:'Накопить 5000 ❤️ всего', cond: s => s.totalH >= 5000 },
  { id:'a7', icon:'💎', name:'Алмазик', desc:'Накопить 20 💎 всего', cond: s => s.totalG >= 20 },
  { id:'a8', icon:'💎', name:'Алмазный фонд', desc:'Накопить 100 💎 всего', cond: s => s.totalG >= 100 },
  { id:'a9', icon:'🛍️', name:'Шопоголик', desc:'Купить 5 подарков', cond: s => s.totalBuy >= 5 },
  { id:'a10', icon:'🎁', name:'Королева подарков', desc:'Купить 15 подарков', cond: s => s.totalBuy >= 15 },
  { id:'a11', icon:'🔥', name:'Горячий streak', desc:'Streak 7 дней', cond: s => s.maxStreak >= 7 },
  { id:'a12', icon:'👑', name:'Принцесса', desc:'Достичь 5 уровня', cond: s => lvlInfo(s.xp).lvl >= 5 },
  { id:'a13', icon:'💰', name:'Щедрая душа', desc:'Потратить 3000 ❤️', cond: s => s.totalSpentH >= 3000 },
  { id:'a14', icon:'✨', name:'Звезда', desc:'Собрать 5 достижений', cond: s => s.unlocked.length >= 5 },
  { id:'a15', icon:'🌟', name:'Все звёзды', desc:'Собрать 10 достижений', cond: s => s.unlocked.length >= 10 },
];

const DAILY_REWARDS = [
  { h:30, g:0, t:'+30 ❤️' },
  { h:50, g:0, t:'+50 ❤️' },
  { h:40, g:1, t:'+40 ❤️ и +1 💎' },
  { h:60, g:0, t:'+60 ❤️' },
  { h:35, g:2, t:'+35 ❤️ и +2 💎' },
  { h:80, g:0, t:'+80 ❤️' },
  { h:50, g:3, t:'+50 ❤️ и +3 💎 — бонус недели!' },
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
    popup('🎉', `Уровень ${nw.lvl}!`, `Теперь ты «${nw.rank}»!`);
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

    // quote
    document.getElementById('home-quote').textContent = QUOTES[di % QUOTES.length];

    // streak
    document.getElementById('streak-num').textContent = S.streak;
    const dots = document.getElementById('streak-dots');
    dots.innerHTML = '';
    for (let i=0; i<7; i++) {
      const d = document.createElement('div');
      d.className = 's-dot' + (i < (S.streak%7||(S.streak>0?7:0)) ? ' on' : '');
      dots.appendChild(d);
    }

    // daily banner
    const banner = document.getElementById('daily-banner');
    const btn = document.getElementById('db-btn');
    const sub = document.getElementById('db-sub');
    if (S.giftClaimed) {
      banner.classList.add('claimed');
      btn.disabled = true;
      btn.textContent = 'ПОЛУЧЕНО ✓';
      sub.textContent = 'Возвращайся завтра!';
    } else {
      banner.classList.remove('claimed');
      btn.disabled = false;
      btn.textContent = 'ОТКРЫТЬ';
      sub.textContent = 'Нажми чтобы получить награду!';
    }

    // xp
    document.getElementById('xp-lvl-name').textContent = info.rank;
    document.getElementById('xp-nums').textContent = `${S.xp - info.cur} / ${info.next - info.cur} XP`;
    document.getElementById('xp-fill').style.width = (info.pct * 100) + '%';

    // mini quests on home (first 2)
    const hq = document.getElementById('home-quests');
    hq.innerHTML = '';
    (S.todayQ || []).slice(0, 2).forEach(qid => {
      const q = QUESTS.find(x => x.id === qid);
      if (!q) return;
      const done = S.doneQ[qid];
      hq.appendChild(makeQCard(q, done));
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

    // achievements
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
      hl.innerHTML = '<div class="empty-msg">Пока пусто — загляни в магазин!</div>';
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
  const barColor = colors[hashStr(q.id) % colors.length + colors.length % colors.length] || 'green';
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

  const ri = ((S.streak-1) % DAILY_REWARDS.length + DAILY_REWARDS.length) % DAILY_REWARDS.length;
  const rw = DAILY_REWARDS[ri];

  S.hearts += rw.h;
  S.gems += rw.g;
  S.totalH += rw.h;
  S.totalG += rw.g;
  S.giftClaimed = true;
  addXP(25);
  save();

  popup('🎁', 'Подарок открыт!', rw.t);
  confetti();
  render.home();
  checkAch();
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

  // re-render current page
  if (curPage === 'home') render.home();
  else if (curPage === 'quests') render.quests();

  // all done bonus
  const allDone = S.todayQ.every(id => S.doneQ[id]);
  if (allDone) {
    setTimeout(() => {
      S.gems += 3;
      S.totalG += 3;
      addXP(100);
      save();
      popup('⚔️', 'Все квесты выполнены!', 'Бонус: +3 💎 и +100 XP!');
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
    popup('😢', 'Не хватает!', `Нужно ещё ${item.price - S[key]} ${key==='hearts'?'❤️':'💎'}`);
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

  popup('🎉', 'Подарок активирован!', `${item.icon} ${item.name}\n\n${item.desc}`);
  confetti();
  render.gifts();
  checkAch();
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
        popup('🏅', 'Новое достижение!', `${a.icon} ${a.name}\n${a.desc}`);
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
  await load();
  processDaily();
  render.home();
  checkAch();
}

init();
