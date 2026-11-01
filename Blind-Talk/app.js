/*
 * BLIND TALK — V4
 * 1. موضوع عشوائي، بدون سؤال إجباري.
 * 2. بعد كل موضوع: تقييم اللاعب الأول -> تمرير الجهاز -> تقييم اللاعب الثاني.
 * 3. الدرجات تُحفظ في rounds وتظل مخفية أثناء اللعب.
 * 4. مشاركة النتائج وقائمتها متاحة فقط بعد إنهاء اللعبة؛ لا يوجد متوسط.
 */
'use strict';

const STORAGE_KEY = 'blindTalk_v4_per_topic_private_scores';
const MODES = ['all', 'love', 'friends', 'deep'];
const SCREENS = ['setup', 'topic', 'rating', 'handoff', 'between', 'summary'];

const byId = id => document.getElementById(id);
const getName = index => state.names[index]?.trim() || `اللاعب ${index + 1}`;
const allowedTopics = () => TOPICS.map((topic, index) => ({ topic, index }))
  .filter(({ topic }) => state.mode === 'all' || topic[2] === state.mode);

function newSession() {
  return {
    screen: 'setup', mode: 'all', names: ['', ''],
    seen: [], current: null, helpIndex: -1,
    ratingPlayer: 0, pendingRating: null, ratingDraft: 5,
    rounds: [], finished: false
  };
}

let state = newSession();
try {
  const previous = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const valid = previous && SCREENS.includes(previous.screen)
    && MODES.includes(previous.mode) && Array.isArray(previous.names)
    && Array.isArray(previous.seen) && Array.isArray(previous.rounds);
  if (valid) state = { ...newSession(), ...previous };
} catch { /* حفظ الجلسة اختياري حسب المتصفح */ }

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* التخزين قد لا يتوفر */ }
}

function show(screen) {
  state.screen = screen;
  SCREENS.forEach(name => { byId(`${name}-screen`).hidden = name !== screen; });
  save();
  window.scrollTo(0, 0);
}

function syncModeButtons() {
  document.querySelectorAll('[data-mode]').forEach(button => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle('is-selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function drawTopic() {
  if (state.finished) return;
  const remaining = allowedTopics()
    .map(({ index }) => index)
    .filter(index => !state.seen.includes(index));
  if (!remaining.length) return finishSession();

  state.current = remaining[Math.floor(Math.random() * remaining.length)];
  state.seen.push(state.current);
  state.helpIndex = -1;
  byId('help-button').textContent = 'سؤال مساعد';
  updateTopic();
  show('topic');
}

function updateTopic() {
  if (!Number.isInteger(state.current) || !TOPICS[state.current]) return;
  const number = state.seen.length;
  byId('topic-round-number').textContent = `الجولة ${String(number).padStart(2, '0')}`;
  byId('topic-progress').textContent = `${number} من ${allowedTopics().length} موضوع`;
  byId('topic-title').textContent = TOPICS[state.current][0];
  byId('topic-emoji').textContent = TOPICS[state.current][1];
  byId('topic-card').className = `topic-card palette-${state.current % 4}`;
  byId('topic-index').textContent = String(number).padStart(2, '0');
  updateHelp();
}

function updateHelp() {
  const visible = state.helpIndex >= 0;
  byId('help-panel').hidden = !visible;
  if (!visible || !TOPICS[state.current]) return;
  byId('help-count').textContent = `سؤال مساعد ${state.helpIndex + 1} من 3`;
  byId('help-text').textContent = TOPICS[state.current][state.helpIndex + 3];
  byId('help-button').textContent = state.helpIndex === 2 ? 'العودة للسؤال الأول' : 'سؤال مساعد آخر';
}

function beginRating() {
  if (state.current === null || state.finished) return;
  state.ratingPlayer = 0;
  state.pendingRating = null;
  state.ratingDraft = 5;
  displayRating();
}

function displayRating() {
  if (state.current === null || state.finished) return;
  byId('rating-round').textContent = `الجولة ${String(state.seen.length).padStart(2, '0')}`;
  byId('rating-step').textContent = state.ratingPlayer === 0 ? 'التقييم الأول من اثنين' : 'التقييم الثاني من اثنين';
  byId('rating-topic-name').textContent = TOPICS[state.current][0];
  byId('rating-title').textContent = getName(state.ratingPlayer);
  byId('score-input').value = String(state.ratingDraft);
  byId('score-number').textContent = String(state.ratingDraft);
  byId('save-score-button').textContent = 'حفظ تقييمي';
  show('rating');
}

function saveRating() {
  if (state.finished || state.current === null) return;
  const value = Number(byId('score-input').value);
  if (!Number.isInteger(value) || value < 0 || value > 10) return;

  if (state.ratingPlayer === 0) {
    // لا نعرض درجة الأول على شاشة تمرير الجهاز ولا على شاشة تقييم الثاني.
    state.pendingRating = value;
    state.ratingPlayer = 1;
    state.ratingDraft = 5;
    byId('handoff-player').textContent = getName(1);
    show('handoff');
  } else {
    if (!Number.isInteger(state.pendingRating)) return;
    // يتم حفظ التقييمين لكل موضوع، بدون حساب المتوسط.
    state.rounds.push({ topicIndex: state.current, a: state.pendingRating, b: value });
    state.current = null;
    state.pendingRating = null;
    state.ratingPlayer = 0;
    state.ratingDraft = 5;
    const allUsed = allowedTopics().every(({ index }) => state.seen.includes(index));
    if (allUsed) return finishSession();
    displayBetween();
  }
}

function displayBetween() {
  byId('between-count').textContent = `${state.rounds.length} ${state.rounds.length === 1 ? 'موضوع تم تقييمه' : 'مواضيع تم تقييمها'}`;
  show('between');
}

function finishSession() {
  // لا تنتهي الجلسة في منتصف تقييم موضوع.
  if (state.current !== null || !state.rounds.length) return;
  state.finished = true;
  displaySummary();
}

function displaySummary() {
  if (!state.finished) return;
  byId('summary-players').textContent = `${getName(0)} × ${getName(1)}`;
  byId('share-button').textContent = 'نسخ أو مشاركة القائمة';
  const list = byId('rounds-list');
  list.replaceChildren();
  state.rounds.forEach((round, i) => {
    const item = document.createElement('li');
    const title = document.createElement('span');
    title.className = 'round-topic';
    title.textContent = `${i + 1}. ${TOPICS[round.topicIndex][0]}`;
    const ratings = document.createElement('div');
    ratings.className = 'round-scores';
    [round.a, round.b].forEach((value, person) => {
      const card = document.createElement('div');
      card.className = 'round-player';
      const name = document.createElement('span');
      name.className = 'player-name';
      name.textContent = getName(person);
      const score = document.createElement('strong');
      score.className = 'player-rating';
      score.textContent = `${value}/10`;
      card.append(name, score);
      ratings.append(card);
    });
    item.append(title, ratings);
    list.append(item);
  });
  show('summary');
}

function summaryText() {
  return [
    'BLIND TALK — نتائج الجلسة',
    `${getName(0)} × ${getName(1)}`,
    ...state.rounds.map((round, i) =>
      `${i + 1}. ${TOPICS[round.topicIndex][0]} — ${getName(0)} ${round.a}/10، ${getName(1)} ${round.b}/10`
    )
  ].join('\n');
}

async function shareResults() {
  if (!state.finished) return; // النتائج غير قابلة للمشاركة قبل إنهاء اللعب.
  const output = summaryText();
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Blind Talk', text: output });
      return;
    }
  } catch (error) {
    if (error.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(output);
    byId('share-button').textContent = 'تم نسخ القائمة';
    return;
  } catch { /* بعض المتصفحات تمنع clipboard في الملفات المحلية */ }
  const temporary = document.createElement('textarea');
  temporary.value = output;
  document.body.append(temporary);
  temporary.select();
  const succeeded = document.execCommand('copy');
  temporary.remove();
  byId('share-button').textContent = succeeded ? 'تم نسخ القائمة' : 'لم ينجح النسخ من هذا المتصفح';
}

// أحداث عناصر HTML
byId('total-topics').textContent = String(TOPICS.length);
byId('name1').value = state.names[0] || '';
byId('name2').value = state.names[1] || '';
for (const input of [byId('name1'), byId('name2')]) {
  input.addEventListener('input', () => {
    state.names = [byId('name1').value, byId('name2').value];
    save();
  });
}
document.querySelectorAll('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    state.mode = button.dataset.mode;
    syncModeButtons();
    save();
  });
});
byId('setup-form').addEventListener('submit', event => { event.preventDefault(); drawTopic(); });
byId('help-button').addEventListener('click', () => {
  state.helpIndex = (state.helpIndex + 1) % 3;
  updateHelp();
  save();
});
byId('rate-topic-button').addEventListener('click', beginRating);
byId('score-input').addEventListener('input', event => {
  byId('score-number').textContent = event.target.value;
  state.ratingDraft = Number(event.target.value);
  save();
});
byId('save-score-button').addEventListener('click', saveRating);
byId('handoff-button').addEventListener('click', displayRating);
byId('next-button').addEventListener('click', drawTopic);
byId('finish-button').addEventListener('click', finishSession);
byId('share-button').addEventListener('click', shareResults);
byId('restart-button').addEventListener('click', () => {
  if (!window.confirm('بدء جلسة جديدة؟ ستُحذف تقييمات هذه الجلسة من الجهاز.')) return;
  state = newSession();
  byId('name1').value = '';
  byId('name2').value = '';
  syncModeButtons();
  show('setup');
});

// استرجاع اللعبة إذا أُغلقت الصفحة وعاد اللاعبان لاحقًا.
function restore() {
  syncModeButtons();
  if (state.finished) return displaySummary();
  if (state.screen === 'topic' && Number.isInteger(state.current) && TOPICS[state.current]) {
    updateTopic();
    return show('topic');
  }
  if (state.screen === 'rating' && state.current !== null) return displayRating();
  if (state.screen === 'handoff' && state.current !== null) {
    byId('handoff-player').textContent = getName(1);
    return show('handoff');
  }
  if (state.screen === 'between' && state.rounds.length) return displayBetween();
  show('setup');
}
restore();
