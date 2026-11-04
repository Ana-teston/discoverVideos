# Discover Videos

A Netflix-style video app built with Next.js. Users sign in without a password, browse YouTube videos by category, open a video page, like or dislike videos, and keep a personal "My list".

**Live demo:** https://discover-videos-beta.vercel.app/

Course project from Zero To Mastery. I built it along with the lessons, then deployed it to Vercel.

## Highlights

- **Passwordless login:** Magic Link sends a one-time login email; the `/api/login` route validates the Magic token and issues a signed JWT with a 7-day expiry, stored in a cookie (secure in production).
- **Authorization with JWT claims:** the token carries Hasura role claims (`user`, `admin`) and the user ID, and every stats query is scoped to the user ID from the verified token.
- **GraphQL backend on Hasura:** stores users and per-user video stats (watched, liked, disliked), created on first login.
- **Mixed rendering strategies:** server-side rendering for the home page and "My list", and static generation with incremental static regeneration (`revalidate: 10`) for video pages.
- **API quota protection:** a local `data/videos.json` fallback for development, so the YouTube API quota is not used up while coding.

## Stack

Next.js 13 · React 18 · Magic (passwordless auth) · JWT · Hasura (GraphQL, PostgreSQL) · YouTube Data API · Framer Motion · CSS Modules · Vercel

## Project structure

```
pages/
  index.js            home page with video sections (SSR)
  login.js            passwordless login with Magic
  video/[videoId].js  video page (SSG + ISR) with like and dislike
  browse/my-list.js   the user's saved videos (SSR)
  api/                login, logout and stats routes
lib/
  db/hasura.js        GraphQL queries and mutations
  db/magic.js         Magic admin client
  videos.js           YouTube API calls and local fallback
components/           banner, cards, navbar, loading
```

## Running locally

Create a `.env.local` file:

```
NEXT_PUBLIC_HASURA_ADMIN_URL=
NEXT_PUBLIC_HASURA_ADMIN_SECRET=
JWT_SECRET=
MAGIC_SERVER_KEY=
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=
YOUTUBE_API_KEY=
DEVELOPMENT=true
```

`DEVELOPMENT=true` reads videos from `data/videos.json` instead of calling the YouTube API.

```bash
yarn install
yarn dev    # http://localhost:3000
```
