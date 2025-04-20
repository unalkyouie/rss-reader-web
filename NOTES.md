# 📰 RSS Reader Project Journal

---

## 🏗️ Project Setup

### Tooling & Build

- Started with CRA → switched to **Vite** for that blazing speed ⚡
- TypeScript aliases via `~/` ✅ goodbye relative import spaghetti

### Architecture

- Feature-based folder structure > tech-type separation
- Shared mocks and per-feature test placement
- Targeting **ES2020** for modern features + reasonable browser support

---

## 🚀 Core Features

### 📡 Feed Management

- `usePersistedFeeds`:

  - Add/remove feeds with LocalStorage persistence
  - Lightweight validation built in
  - ✅ Tests covering core functionality

- `rss-parser` integration:
  - Using AllOrigins proxy to bypass **CORS** issues
  - Graceful handling of invalid/malformed feeds

---

### 📰 Article Display

- `useFeedArticles`:

  - Stable fetching from feed URLs
  - Handles errors from broken feeds

- `ArticlesGrid`:
  - Sorted by **newest first**
  - Uses `formatDate()` for clean timestamp formatting
  - Fully responsive layout
  - 🆕 Visually marks **read** articles using localStorage-based state

---

## ✨ Polish & Refinements

### 🖼️ UI Improvements

- Responsive **grid layout** for articles
- **Dark/light mode** theming toggle
- Smooth **loading states** across views
- 🆕 Collapsible form for adding feeds with animation
- 🆕 Glassmorphism & spacing tweaks for sidebar and layout

### 🧼 Code Quality

- TypeScript strict mode enforced
- Extracted duplicate logic into helpers
- Introduced **error boundaries** for better resilience

### ⚡ Performance

- Debounced search input for smoother filtering
- Caching feed fetches to avoid redundant requests
- Virtualized article lists for large feeds

---

## 🧪 Testing Approach

**Test Coverage Goals**:

- `usePersistedFeeds`: Add/remove logic, LocalStorage sync
- `FeedForm`: Input handling, validation, edge cases
- `ArticlesGrid`: Sorting, date formatting, fallback states
- 🆕 `MainView`: Integration of feed management + articles + read tracking

---

## 🛠️ Development Notes

### ✨ Key Breakthroughs

- **Feed-Article Connection**  
  _"Finally got the list → feeds → articles flow working. Felt good ngl."_

- **Proxy Solution**  
  _"AllOrigins proxy saved the day with problematic feeds."_

- **State Management**  
  _"LocalStorage persistence just works now – no surprise data loss."_

- 🆕 **Read Article Memory**  
  _"Articles you've already clicked? Marked and remembered locally. Chef's kiss."_

---

### 😤 Pain Points

- Date formatting inconsistencies (esp. across feeds)
- CORS issues on raw RSS URLs
- TypeScript types for parsed feed objects are messy
- Making UI responsive across screen sizes is fiddly
- 🆕 Finding clean way to track & style read articles across views

---

## 📚 Lessons Learned

> 🧪 "Tests first saves refactoring headaches"  
> 🗂 "Feature folders > tech-type folders"  
> 🧠 "Simple solutions often work better than 'clever' ones"

---

## 📊 Vibe Check

> “UI is functional, not pretty — but I’m reading stuff now, so... goal met?”

### Progress Feel by Day

| Day | Mood | Notes                                                               |
| --- | ---- | ------------------------------------------------------------------- |
| 1   | 😤   | Setup struggles                                                     |
| 2   | 🤯   | RSS format edge cases                                               |
| 3   | 🤔   | Refactor decisions, testing                                         |
| 4   | 😌   | Working feed + articles 🎉                                          |
| 5   | 😤   | Routing + Articles kinda working, not sure if I can display content |

---

## 🔜 Next Steps

- ⏱ Add **feed refresh scheduling**
- ❗ Implement proper **error states**
- 📦 Build **PWA capabilities**
- 🧩 Update automatically via Git hooks
- 🆕 Filter to show **only unread** articles
