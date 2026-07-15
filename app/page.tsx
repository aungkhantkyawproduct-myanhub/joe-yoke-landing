export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-indigo-500">
          JOE<span className="text-white">YOKE</span>
        </div>
        <div className="space-x-6 text-sm font-medium hidden md:block text-zinc-400">
          <a href="#games" className="hover:text-white transition-colors">Games</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold transition-all">
          Play Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          One Platform. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Endless Gamification.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10">
          Welcome to Joe Yoke. Dive into a unified universe of mini-games, challenges, and leaderboards. Level up your experience, earn rewards, and compete with friends.
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-zinc-950 px-8 py-3 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
            Explore Games
          </button>
          <button className="border border-zinc-700 hover:bg-zinc-800 px-8 py-3 rounded-full font-bold text-lg transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <div className="text-indigo-500 text-3xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-3">Multiple Games</h3>
            <p className="text-zinc-400">Access a diverse library of games from a single dashboard. No need to switch apps or accounts.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <div className="text-purple-500 text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-3">Global Leaderboards</h3>
            <p className="text-zinc-400">Compete against players worldwide. Track your high scores and climb the daily rankings.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <div className="text-pink-500 text-3xl mb-4">💎</div>
            <h3 className="text-xl font-bold mb-3">Earn Rewards</h3>
            <p className="text-zinc-400">Unlock achievements, collect badges, and earn platform-wide currency as you play.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-zinc-600 border-t border-zinc-900">
        <p>© {new Date().getFullYear()} Joe Yoke Gamification Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}