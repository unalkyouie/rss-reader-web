# 📰 RSS Reader Web

This is a simple RSS Reader app built with React and Vite, designed to explore the basics of managing and displaying RSS feeds. The app includes essential features like adding feeds, viewing articles, and saving feed settings locally.

---

## 🚀 Features

- **Add/Edit Feeds**: Users can add or modify RSS feed URLs.
- **Article List**: Displays articles sorted by publication date.
- **Article View**: Allows users to view individual articles in detail.
- **Feed Filtering**: Users can filter articles by feed.
- **Persistent Settings**: Feed settings are saved locally via LocalStorage.

### 🔧 Optional Features

- **Search by Title**: Find articles by their title.
- **Unread Marking & Filtering**: Mark articles as read and filter unread ones.
- **Save for Later**: Add articles to a "Read Later" or "Favorites" list.

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **TypeScript**
- **LocalStorage**
- **RSS Parser (AllOrigins proxy to bypass CORS)**

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/unalkyouie/rss-reader-web
```

### 2. Install Dependencies

```bash
cd rss-reader-web
yarn install
```

### 3. Run the Development Server

```bash
yarn dev
```

The app should now be running at: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment Instructions

### Option A: Deploy to **Vercel**

1. Push your repository to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import your repo
3. Select **Vite** as your framework
4. Set build command to:
   ```bash
   yarn build
   ```
5. Set output directory to:
   ```bash
   dist
   ```
6. Click **Deploy**

### Option B: Deploy with **GitHub Pages**

1. Run production build:
   ```bash
   yarn build
   ```
2. Install `gh-pages` if needed:
   ```bash
   yarn add gh-pages -D
   ```
3. Add this to your `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repo>"
   ```
4. Add scripts:
   ```json
   "scripts": {
     "predeploy": "yarn build",
     "deploy": "gh-pages -d dist"
   }
   ```
5. Run:
   ```bash
   yarn deploy
   ```

---

## 📜 License

This project is open source and available under the MIT License.

---

Made with ☕ and curiosity ✨
