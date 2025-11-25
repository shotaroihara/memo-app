# Memo App

[![Live Demo](https://img.shields.io/badge/Live_Demo-👀_Click_here!-blue?style=for-the-badge&logo=github)](https://shotaro-dev.github.io/memo-app/)

A modern, lightweight note-taking application built with vanilla JavaScript. Features a clean UI with dark/light mode support and local-first data storage.

## How this project was built

This is learning project.
From the AI-generated HTML and CSS drafts,
I wrote the specs and JS within Copilot'.
Afterward, I made some fixes and add features using AI bug checking and auditing.
Every line was **reviewed, tested, and either kept with confidence or rewritten/deleted by me**  
  → The final code contains only what I'm confident in and take responsibility for

## ✨ Features

### Core Functionality

- **Create Memos**: Add notes with title, content, and category
- **Edit Memos**: Update existing memos via modal dialog
- **Delete Memos**: Remove individual memos with confirmation
- **Real-time Search**: Filter memos by title or content as you type
- **Category Organization**: Classify memos into General, Work, or Personal categories
- **Persistent Storage**: All memos are saved to browser localStorage and persist across sessions

### User Interface

- **Modern Design**: Clean, minimalist interface with smooth animations
- **Dark/Light Mode**: Automatic theme switching based on system preference
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Accessibility**: ARIA labels, semantic HTML, and keyboard-friendly navigation
- **Visual Feedback**: Hover effects, transitions, and clear interactive states

### Technical Features

- **Local-First**: No server required, all data stays on your device
- **100 Dummy Memos**: Pre-populated with sample data for testing
- **Clear All Function**: Debug feature to reset all memos
- **No Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **No Tracking**: Privacy-focused, zero data collection

## 🚀 Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shotaro-dev/memo-app.git
   cd memo-app
   ```

2. Open `index.html` in your browser:

   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

No build process or dependencies required!

## 📖 Usage

### Adding a Memo

1. Enter a title in the "Title" field
2. Write your note in the "Content" textarea
3. Select a category from the dropdown (General, Work, or Personal)
4. Click the "Add" button

### Searching Memos

- Type in the search box at the top of the memo list
- Results filter in real-time by title and content
- Clear the search to see all memos again

### Editing a Memo

1. Click the "Edit" button on any memo card
2. Update the title, content, or category in the modal
3. Click "Save" to confirm changes or "Cancel" to discard

### Deleting a Memo

1. Click the "Delete" button on any memo card
2. Confirm deletion in the modal dialog
3. The memo will be permanently removed

### Clearing All Memos

- Click "Clear All Memos" in the footer
- Useful for resetting to a clean state during development

---

Made with ❤️ by shotaro-dev • [MIT Licensed](LICENSE)