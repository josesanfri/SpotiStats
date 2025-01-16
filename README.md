## 👨‍🚀 Introduction

[**SpotiStats**](spotistats-lyart.vercel.app) is a service that allows you to explore your Spotify statistics in a simple, fast, and visually appealing way. It is built with [**Nextjs**](https://nextjs.org/) leveraging modern technologies to ensure a seamless and efficient user experience. This project is developed and maintained by [**Jose**](https://github.com/josesanfri) with a focus on intuitive design, performance, and scalability.

This project uses the following technologies:

- [**Next.js 15 App Router**](https://nextjs.org/) - The React Framework for the Web.
- [**Next.js Server Actions**](https://nextjs.org/docs/api-reference/server-actions) - Asynchronous functions that are executed on the server.
- [**Auth.js v5**](https://authjs.dev/) - Authentication for the Web.
- [**TailwindCSS**](https://tailwindcss.com) + [**shadcn/ui**](https://ui.shadcn.com) - Design System.
- [**Prettier**](https://prettier.io) with [**prettier-plugin-tailwindcss**](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - Code Formatter.
- [**Lucide Icons**](https://lucide.dev) - Beautiful SVG icons & logos for the web.

> ⚠️ This is a own project.

## 🚀 Getting Started

**Requirements:**

- [x] [Node.js](https://nodejs.org) (+v18.x) installed.
- [x] [pnpm](https://pnpm.io) (v8+) installed.
- [x] [Visual Studio Code](https://code.visualstudio.com) with the recommended extensions installed (ESLint, Prettier, Tailwind CSS IntelliSense).

**Steps:**

1. Create a Spotify app:
[Spotify for developers](https://developer.spotify.com/)
```bash
# Copy your clientId and clientSecret

# Set your redirectUri:
http://localhost:3000/
```

2. Clone the repository:

```bash
git clone https://github.com/josesanfri/SpotiStats.git
```

3. Install dependencies:

```bash
# Install pnpm globally if you don't have it:
npm install -g pnpm

# and install dependencies:
pnpm install
```

4. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following schema.

```bash
# Auth.js =>
AUTH_SECRET=

# Spotify Provider =>
AUTH_SPOTIFY_ID=
AUTH_SPOTIFY_SECRET=
```

7. Run:

- Development server:

```bash
pnpm dev
```

and open [http://localhost:3000](http://localhost:3000) with your browser 🚀


## ☁️ Deploy on Vercel

- ✅ [spotistats-lyart.vercel.app](https://spotistats-lyart.vercel.app/).