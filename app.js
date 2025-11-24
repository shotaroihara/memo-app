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

const addBtn = document.getElementById("add-memo-btn");
const memoForm = document.getElementById("memo-form");
const memoTitleInput = document.getElementById("memo-title");
const memoContentInput = document.getElementById("memo-content");
const memoCategorySelect = document.getElementById("memo-category");
const searchInput = document.getElementById("search-input"); 

const categories = ["General", "Work", "Personal"];


// <!-- テスト -->
localStorage.clear();
dummyNotes = [];
for (let i = 1; i <= 3; i++) {
  dummyNotes.push({
    id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), // 重複しないランダムID
    title: `ダミーメモタイトル ${i}`,
    content: `これはダミーメモの内容です。メモ番号は ${i} です。あああああああああああああああああああああああああああああああああああああああああああああああ`,
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
              <p class="category">${memo.category}</p>
              <small>${new Date(memo.createdAt).toLocaleString()}</small>
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

addBtn.addEventListener("click", () => {
    const title = memoTitleInput.value.trim();
    const content = memoContentInput.value.trim();
    const category = memoCategorySelect.value;  
    if (title && content) {
      const newMemo = {
        id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), // 重複しないランダムID
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
})
