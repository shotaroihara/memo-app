//         <!-- 要件定義-->
//  学習用にvanilla-jsでメモアプリを作成する。
// <!-- 仕様 -->
//     ・メモの追加、編集、削除ができる。
//     ・メモはローカルストレージに保存され、ページをリロードしても内容が保持される。
//     ・シンプルなUIで、メモの一覧表示と入力フォームを含む。
//     ・リアルタイム検索機能（タイトル、本文で）を実装し、メモの内容をフィルタリングできる。
//     ・カテゴリでメモを分類できる機能を追加する。
// <!-- 設計    -->
//     ・HTMLで基本的な構造を作成し、CSSでスタイリングを行う。
//     ・JavaScriptでメモの追加、編集、削除、ローカルストレージへの保存、検索機能を実装する。
//     ・カテゴリ機能はドロップダウンメニューで選択できるようにする。
// 　　・ダミーデータを100件jsで作る。
//     ・idは重複しないようにランダムで生成する。
//      ・作成されたときの時間も記録する
//     ・編集はモーダルで行えるようにする
//     ・memoをクリックすると編集,削除モーダルが表示されるようにする
//      ・memoにdelete,editボタンを追加する。

const addBtn = document.getElementById("add-memo-btn");
const memoForm = document.getElementById("memo-form");
const memoTitleInput = document.getElementById("memo-title");
const memoContentInput = document.getElementById("memo-content");
const memoCategorySelect = document.getElementById("memo-category");
const searchInput = document.getElementById("search-input");

const categories = ["General", "Work", "Personal"];

// クリア
// localStorage.clear();
dummyNotes = [];
for (let i = 1; i <= 10; i++) {
  dummyNotes.push({
    id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), // 重複しないランダムID
    title: `ダミーメモタイトル ${i}`,
    content: `これはダミーメモの内容です。メモ番号は ${i} です。aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
    category: categories[(i - 1) % 3], // 3つのカテゴリに分類,
    createdAt: Date.now() - i * 1000 * 60, // 作成時間をi分少しずつずらす
  });
}

// ローカルストレージに保存（初回のみ）
if (!localStorage.getItem("memos")) {
  localStorage.setItem("memos", JSON.stringify(dummyNotes));
}
// dummyNotesをhtmlに描画する関数を呼び出す
function renderMemos(memos) {
  const memoList = document.getElementById("memo-list");
  memoList.innerHTML = "";
  memos.forEach((memo) => {
    const memoElement = document.createElement("div");
    memoElement.className = "memo-card";
    memoElement.innerHTML = `
            <h3 class="memo-title">${memo.title}</h3>
            <p class="memo-body">${memo.content}</p>
            <div class="memo-meta">
              <div class="meta-top">
                <p class="category">${memo.category}</p>
                <small class="memo-time">${new Date(
                  memo.createdAt
                ).toLocaleString()}</small>
              </div>
              <div class="meta-actions">
                <button class="btn edit-btn" onclick="editMemo('${
                  memo.id
                }')" aria-label="Edit ${memo.title}">Edit</button>
                  <button class="btn delete-btn" onclick="showDeleteModal('${memo.id}')" aria-label="Delete ${memo.title}">Delete</button>
              </div>
            </div>
        `;
    memoList.appendChild(memoElement);
  });
}
renderMemos(getMemos());

// ローカルストレージからメモを取得
function getMemos() {
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  return memos;
}

// ローカルストレージにメモを保存
function saveMemos(memos) {
  localStorage.setItem("memos", JSON.stringify(memos));
}

function resetForm() {
  memoTitleInput.value = "";
  memoContentInput.value = "";
  memoCategorySelect.value = "General";
}

function searchMemos(query) {
  const memos = getMemos();
  return memos.filter(
    (memo) =>
      memo.title.toLowerCase().includes(query.toLowerCase()) ||
      memo.content.toLowerCase().includes(query.toLowerCase())
  );
}

function deleteMemo(id) {
  let memos = getMemos();
  memos = memos.filter((memo) => memo.id !== id);
  saveMemos(memos);
  renderMemos(memos);
}

function editMemo(id, newTitle, newContent, newCategory) {
  let memos = getMemos();
  memos = memos.map((memo) => {
    if (memo.id === id) {
      return {
        ...memo,
        title: newTitle,
        content: newContent,
        category: newCategory,
      };
    }
    return memo;
  });
  saveMemos(memos);
  renderMemos(memos);
}

// Delete modal handling
let _pendingDeleteId = null;
function showDeleteModal(id) {
  _pendingDeleteId = id;
  const memos = getMemos();
  const memo = memos.find(m => m.id === id) || { title: '' };
  const modal = document.getElementById('delete-modal');
  const modalMsg = document.getElementById('delete-modal-msg');
  modalMsg.textContent = `Delete "${memo.title}"? This cannot be undone.`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  // focus confirm button
  const confirmBtn = document.getElementById('delete-confirm');
  if (confirmBtn) confirmBtn.focus();
}

function hideDeleteModal() {
  const modal = document.getElementById('delete-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  _pendingDeleteId = null;
}

function confirmDelete() {
  if (!_pendingDeleteId) return hideDeleteModal();
  deleteMemo(_pendingDeleteId);
  hideDeleteModal();
}

// 編集モーダルを作成


  // モーダルの要素を作成



addBtn.addEventListener("click", () => {
  const title = memoTitleInput.value.trim();
  const content = memoContentInput.value.trim();
  const category = memoCategorySelect.value;
  if (title && content) {
    const newMemo = {
      id:
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), // 重複しないランダムID
      title,
      content,
      category,
      createdAt: Date.now(),
    };
    const memos = getMemos();
    memos.unshift(newMemo);
    saveMemos(memos);
    renderMemos(memos);
    resetForm();
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  const filteredMemos = searchMemos(query);
  renderMemos(filteredMemos);
});
