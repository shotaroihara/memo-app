// <!-- Requirements -->
// Create a memo app using vanilla JavaScript for learning purposes.
// <!-- Specifications -->
//     • Add, edit, and delete memos.
//     • Memos are saved to local storage and persist after page reload.
//     • Simple UI with memo list display and input form.
//     • Real-time search functionality (by title and content) to filter memos.
//     • Add category feature to classify memos.
// <!-- Design -->
//     • Create basic structure with HTML and style with CSS.
//     • Implement memo add, edit, delete, local storage saving, and search with JavaScript.
//     • Category selection via dropdown menu.
//     • Generate 100 dummy data items with JavaScript.
//     • Generate unique random IDs to avoid duplicates.
//     • Record creation timestamp.
//     • Enable editing via modal.
//     • Display edit/delete modal when clicking memo buttons.
//     • Add delete and edit buttons to memo cards.
//     • Clear button added for debugging
let dummyNotes = [];

const addBtn = document.getElementById("add-memo-btn");
const memoForm = document.getElementById("memo-form");
const memoTitleInput = document.getElementById("memo-title");
const memoContentInput = document.getElementById("memo-content");
const memoCategorySelect = document.getElementById("memo-category");
const searchInput = document.getElementById("search-input");

const categories = ["General", "Work", "Personal"];

function init() {
  dummyNotes = [];
  for (let i = 1; i <= 100; i++) {
    dummyNotes.push({
      id:
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), // Unique random ID
      title: `Dummy Memo Title ${i}`,
      content: `This is dummy memo content. Memo number is ${i}.`,
      category: categories[(i - 1) % 3], // Classify into 3 categories
      createdAt: Date.now() - i * 1000 * 60, // Offset creation time by i minutes
    });
  }

  // Save to local storage (first time only)
  if (!localStorage.getItem("memos")) {
    localStorage.setItem("memos", JSON.stringify(dummyNotes));
  }
  renderMemos(getMemos());
}

function renderMemos(memos) {
  const memoList = document.getElementById("memo-list");
  memoList.innerHTML = "";
  memos.forEach((memo) => {
    const memoElement = document.createElement("div");
    memoElement.className = "memo-card";
    memoElement.innerHTML = `
            <div class="memo-content-block">
              <h3 class="memo-title">${memo.title}</h3>
              <p class="memo-body">${memo.content}</p>
            </div>
            <div class="memo-meta">
              <div class="meta-top">
                <p class="category">${memo.category}</p>
                <small class="memo-time">${new Date(
                  memo.createdAt
                ).toLocaleString()}</small>
              </div>
              <div class="meta-actions">
                <button class="btn edit-btn" onclick="showEditModal('${
                  memo.id
                }')" aria-label="Edit ${memo.title}">Edit</button>
                  <button class="btn delete-btn" onclick="showDeleteModal('${
                    memo.id
                  }')" aria-label="Delete ${memo.title}">Delete</button>
              </div>
            </div>
        `;
    memoList.appendChild(memoElement);
  });
}

// Get memos from local storage
function getMemos() {
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  return memos;
}

// Save memos to local storage
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
  const memo = memos.find((m) => m.id === id) || { title: "" };
  const modal = document.getElementById("delete-modal");
  const modalMsg = document.getElementById("delete-modal-msg");
  modalMsg.textContent = `Delete "${memo.title}"? This cannot be undone.`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  // Focus confirm button
  const confirmBtn = document.getElementById("delete-confirm");
  if (confirmBtn) confirmBtn.focus();
}

function hideDeleteModal() {
  const modal = document.getElementById("delete-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  _pendingDeleteId = null;
}

function confirmDelete() {
  if (!_pendingDeleteId) return hideDeleteModal();
  deleteMemo(_pendingDeleteId);
  hideDeleteModal();
}

// Edit modal handling
let _pendingEditId = null;
function showEditModal(id) {
  _pendingEditId = id;
  const memos = getMemos();
  const memo = memos.find((m) => m.id === id);
  if (!memo) return;

  const modal = document.getElementById("edit-modal");
  const titleInput = document.getElementById("edit-title");
  const contentInput = document.getElementById("edit-content");
  const categorySelect = document.getElementById("edit-category");

  titleInput.value = memo.title;
  contentInput.value = memo.content;
  categorySelect.value = memo.category;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // Focus title input
  if (titleInput) titleInput.focus();
}

function hideEditModal() {
  const modal = document.getElementById("edit-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  _pendingEditId = null;
}

function saveEdit() {
  if (!_pendingEditId) return hideEditModal();

  const titleInput = document.getElementById("edit-title");
  const contentInput = document.getElementById("edit-content");
  const categorySelect = document.getElementById("edit-category");

  const newTitle = titleInput.value.trim();
  const newContent = contentInput.value.trim();
  const newCategory = categorySelect.value;

  if (!newTitle || !newContent) {
    alert("Title and content are required");
    return;
  }

  editMemo(_pendingEditId, newTitle, newContent, newCategory);
  hideEditModal();
}

function clearAllMemos() {
  localStorage.removeItem("memos");
  renderMemos([]);
}

addBtn.addEventListener("click", () => {
  const title = memoTitleInput.value.trim();
  const content = memoContentInput.value.trim();
  const category = memoCategorySelect.value;
  if (title && content) {
    const newMemo = {
      id:
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), // Unique random ID
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

// init
init();
