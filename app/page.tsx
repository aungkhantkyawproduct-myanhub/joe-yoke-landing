import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "2.4M+", label: "Active Players" },
  { value: "180+", label: "Games Live" },
  { value: "$12M", label: "Rewards Paid" },
  { value: "4.9/5", label: "App Rating" },
];

const GAMES = [
  {
    title: "Neon Rush",
    genre: "Arcade · Racing",
    color: "from-primary/30 to-transparent",
    accent: "text-primary",
  },
  {
    title: "Shadow Arena",
    genre: "PvP · Strategy",
    color: "from-tertiary/30 to-transparent",
    accent: "text-tertiary",
  },
  {
    title: "Puzzle Forge",
    genre: "Puzzle · Casual",
    color: "from-secondary/30 to-transparent",
    accent: "text-secondary",
  },
  {
    title: "Skyline Legends",
    genre: "RPG · Adventure",
    color: "from-primary/30 to-transparent",
    accent: "text-primary",
  },
];

const FEATURES = [
  {
    title: "Real Rewards",
    desc: "Turn your skill into points, badges, and prizes you can actually redeem.",
  },
  {
    title: "Live Leaderboards",
    desc: "Climb global and friend rankings updated in real time, every match.",
  },
  {
    title: "Cross-Platform Play",
    desc: "Start on web, keep your streak going on iOS and Android — one account.",
  },
  {
    title: "Fair-Play Engine",
    desc: "Anti-cheat and skill-based matchmaking keep every game honest.",
  },
];

const COMMUNITY = [
  {
    name: "Thura K.",
    role: "Top 100 Global",
    quote:
      "The tournaments feel like esports, not just a mobile game. I actually look forward to grinding the ladder.",
  },
  {
    name: "Mia S.",
    role: "Guild Leader, Skyline",
    quote:
      "Our guild runs weekly events through Joe Yoke's community tools. Coordination has never been this easy.",
  },
  {
    name: "Zayar A.",
    role: "Content Creator",
    quote:
      "Rewards are actually worth streaming for. My community earns alongside me every season.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-0 dark:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-tertiary/20 blur-[120px]"
      />

      {/* Hero */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
          Season 4 is live now
        </div>

        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Play harder.
          <br />
          <span className="text-gradient">Earn what you win.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
          Joe Yoke is the premium gamification platform where every match,
          quest, and streak turns into real rewards — and a community that
          plays as hard as you do.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="#download"
            className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-neutral-900 shadow-glow transition-transform hover:scale-105 active:scale-95 sm:w-auto"
          >
            Download Joe Yoke
          </Link>
          <Link
            href="#games"
            className="w-full rounded-full border border-neutral-300 px-8 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-primary/60 hover:bg-primary/5 dark:border-white/15 dark:text-white sm:w-auto"
          >
            Explore Games
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid w-full grid-cols-2 gap-6 rounded-3xl border border-neutral-200 bg-neutral-50/60 p-6 sm:grid-cols-4 sm:p-8 card-glass">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                {s.value}
              </span>
              <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Games */}
      <section id="games" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-tertiary">
              Featured Titles
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Games worth mastering
            </h2>
          </div>
          <Link
            href="#"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all games →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((game) => (
            <div
              key={game.title}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 p-6 transition-transform hover:-translate-y-1 dark:border-white/10 card-glass"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-60`}
              />
              <div className="relative">
                <div className="mb-16 h-28 w-full rounded-xl bg-neutral-900/5 dark:bg-white/5" />
                <h3 className="font-heading text-lg font-bold">{game.title}</h3>
                <p className={`mt-1 text-xs font-medium ${game.accent}`}>
                  {game.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            Why Joe Yoke
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Built for players who compete for real
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-neutral-200 p-6 dark:border-white/10 card-glass"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-heading text-primary">
                ✦
              </div>
              <h3 className="font-heading text-base font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section
        id="community"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8"
      >
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Community
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            A community that plays together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            Guilds, tournaments, and live events keep the ladder moving —
            join thousands of players building their legacy on Joe Yoke.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {COMMUNITY.map((c) => (
            <div
              key={c.name}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 p-6 dark:border-white/10 card-glass"
            >
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                “{c.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-tertiary" />
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {c.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section id="download" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-10 text-center dark:border-white/10 dark:bg-neutral-800/40 card-glass sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]"
          />
          <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
            <Image
              src="/logo-mark.png"
              alt="Joe Yoke"
              width={56}
              height={56}
              className="animate-float rounded-2xl"
            />
          </div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Take Joe Yoke with you
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            Download the app and keep every quest, reward, and rank synced
            across web and mobile.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-neutral-900 sm:w-auto"
            >
              App Store
            </Link>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-neutral-900 shadow-glow-sm transition-transform hover:scale-105 sm:w-auto"
            >
              Google Play
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-neutral-200 px-5 py-10 dark:border-white/10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Joe Yoke"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-heading text-sm font-bold">Joe Yoke</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Joe Yoke. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-neutral-500 dark:text-neutral-400">
            <Link href="#" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
