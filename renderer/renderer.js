const form = document.getElementById('entry-form');
const entriesList = document.getElementById('entries-list');
const todayDate = document.getElementById('today-date');
const conditionSelector = document.getElementById('condition-selector');

const conditionLabels = {
  great: '絶好調',
  good: '良い',
  normal: '普通',
  bad: 'いまいち',
};

let selectedCondition = 'normal';

// 今日の日付を表示
function showTodayDate() {
  const now = new Date();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const w = weekdays[now.getDay()];
  todayDate.textContent = `${y}年${m}月${d}日 (${w})`;
}

// 体調ボタンの選択
conditionSelector.addEventListener('click', (e) => {
  const btn = e.target.closest('.condition-btn');
  if (!btn) return;
  conditionSelector
    .querySelectorAll('.condition-btn')
    .forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedCondition = btn.dataset.value;
});

// エントリ一覧を描画
function renderEntries(entries) {
  if (!entries || entries.length === 0) {
    entriesList.innerHTML =
      '<p class="empty-message">まだ登録がありません</p>';
    return;
  }

  entriesList.innerHTML = entries
    .map((entry) => {
      const date = new Date(entry.createdAt);
      const timeStr = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

      const items = [];
      if (entry.yesterday) {
        items.push(
          `<div class="entry-item"><span class="entry-item-label">昨日:</span><span class="entry-item-text">${escapeHtml(entry.yesterday)}</span></div>`
        );
      }
      if (entry.today) {
        items.push(
          `<div class="entry-item"><span class="entry-item-label">今日:</span><span class="entry-item-text">${escapeHtml(entry.today)}</span></div>`
        );
      }
      if (entry.troubles) {
        items.push(
          `<div class="entry-item"><span class="entry-item-label">共有:</span><span class="entry-item-text">${escapeHtml(entry.troubles)}</span></div>`
        );
      }

      return `
        <div class="entry-card">
          <div class="entry-header">
            <span class="entry-name">${escapeHtml(entry.name)}</span>
            <div class="entry-meta">
              <span class="entry-condition ${entry.condition}">${conditionLabels[entry.condition] || '普通'}</span>
              <span class="entry-date">${timeStr}</span>
              <button class="delete-btn" data-id="${entry.id}" title="削除">&times;</button>
            </div>
          </div>
          <div class="entry-body">
            ${items.join('')}
          </div>
        </div>
      `;
    })
    .join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// フォーム送信
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const entry = {
    name: document.getElementById('name').value.trim(),
    yesterday: document.getElementById('yesterday').value.trim(),
    today: document.getElementById('today').value.trim(),
    troubles: document.getElementById('troubles').value.trim(),
    condition: selectedCondition,
  };

  if (!entry.name) return;

  const entries = await window.api.saveEntry(entry);
  renderEntries(entries);

  // フォームリセット（名前は保持）
  document.getElementById('yesterday').value = '';
  document.getElementById('today').value = '';
  document.getElementById('troubles').value = '';
});

// 削除ボタン
entriesList.addEventListener('click', async (e) => {
  const btn = e.target.closest('.delete-btn');
  if (!btn) return;

  const id = btn.dataset.id;
  const entries = await window.api.deleteEntry(id);
  renderEntries(entries);
});

// 初期化
async function init() {
  showTodayDate();
  const entries = await window.api.loadEntries();
  renderEntries(entries);
}

init();
