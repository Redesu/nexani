# [NexAni](https://nexani.redesu.com.br/)

![Main page](https://i.imgur.com/Kchaibe.jpeg) A full-stack anime web application built with **Next.js**, **React**, **Material-UI**, and integrating with the **MyAnimeList API** for data and user authentication.

---

## You can find a live version [HERE](https://nexani.redesu.com.br/)

## Features

- **User Authentication:** Secure login/logout via MyAnimeList OAuth2.
  ![Login Screenshot](https://i.imgur.com/xNsiTP6.gif) - **Personalized Anime Lists:** Track your anime with categories like "Watching", "Completed", "On Hold", "Dropped", and "Plan to Watch".
  ![Anime List Screenshot](https://i.imgur.com/k0zqLYW.jpeg)- **Detailed User Profiles:** View personal anime statistics, including mean score, total items, episodes watched, and rewatch count.
  ![Profile Screenshot](https://i.imgur.com/2htiriQ.png) - **Seasonal Anime Showcase:** Discover new and popular seasonal anime.
  ![Seasonal Anime Screenshot](https://i.imgur.com/JjJmMVp.jpeg) - **Anime Search Functionality:** Easily find any anime with a robust search feature.
  ![Anime Search](https://i.imgur.com/NzqQuIi.png) -
  **Comprehensive Anime Details:** Get in-depth information about any anime, including synopsis, score, episode count, status, and genres.
  ![Anime Details](https://i.imgur.com/5iMtvr2.png) -

---

## Project Structure

```

.
├── public/           # Static assets (images, fonts)
├── src/
│   ├── app/          # Next.js App Router pages and API routes
│   │   ├── api/      # Backend API routes (authentication, token refresh)
│   │   ├── anime/    # Dynamic route for individual anime details
│   │   ├── animelist/ # Dynamic route for user's anime list
│   │   ├── profile/  # Dynamic route for user profile
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx  # Homepage (seasonal & upcoming anime)
│   ├── components/   # Reusable React components (AnimeCard, SearchBar, Header, etc.)
│   ├── context/      # React Context for global state (e.g., AuthContext)
│   ├── hooks/        # Custom React hooks for data fetching and logic
│   ├── lib/
│   │   ├── api/      # API client for MyAnimeList (MAL) and caching logic
│   │   └── auth/     # Authentication utilities and MAL authentication API
│   │   └── types/    # TypeScript interfaces and types
│   └── utils/        # Utility functions (currently in lib/auth/utils.ts)
├── .vscode/          # VSCode specific settings
├── node_modules/     # Project dependencies
├── package.json      # Project metadata and dependencies
├── package-lock.json # Dependency lock file
├── next.config.ts    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project README

```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- MyAnimeList API Credentials (Client ID and Client Secret) from [MyAnimeList API Documentation](https://myanimelist.net/apiconfig/references/api/v2)

---

## Getting Started

### 1. Clone the repository

```sh
git clone [https://github.com/Redesu/nexani.git](https://github.com/Redesu/nexani.git) # Adjust if the repository name is different
cd nexani
```

### 2. Install dependencies

```sh
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project by copying `.env.local.example` (if available, otherwise create it manually):

```sh
cp .env.local.example .env.local # If .env.local.example exists
# Otherwise, create .env.local and add the following:
```

**Environment Variables (`.env.local`):**

```
MAL_CLIENT_ID=your_myanimelist_client_id
MAL_CLIENT_SECRET=your_myanimelist_client_secret
NEXT_PUBLIC_API_URL=http://localhost:3000 # Or your deployed frontend URL
NODE_ENV=production # This can be development, staging, or
```

### 4. Run the development server

```sh
npm run dev --turbopack # Recommended for faster development
# or
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
- Log in via MyAnimeList to access personalized features like your anime list and profile.

---

## API Endpoints

The application interacts with the MyAnimeList API. Custom API routes are implemented in the Next.js backend to handle authentication and token management.

See `src/lib/api/mal.ts` and `src/lib/auth/mal.ts` for more details on data fetching and authentication logic.

**Authentication Endpoints (Next.js API Routes):**

- `GET /api/auth/login` – Initiates the OAuth2 login flow with MyAnimeList.
- `GET /api/auth/callback` – Handles the OAuth2 callback from MyAnimeList, exchanges code for tokens.
- `POST /api/auth/refresh` – Refreshes the access token using the refresh token.
- `GET /api/auth/logout` – Clears authentication cookies.

**Key MyAnimeList API Interactions:**

- `getSeasonalAnime(year, season)` – Fetches seasonal anime.
- `getAnimeRanking()` – Fetches top-ranked anime.
- `searchAnime(query)` – Searches for anime by title.
- `getTopUpcomingAnime()` – Fetches top upcoming anime.
- `getAnimeDetails(id)` – Fetches detailed information for a specific anime.
- `getUserDetails()` – Fetches details of the authenticated user.
- `getUserAnimeList(status)` – Fetches the authenticated user's anime list based on status.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
