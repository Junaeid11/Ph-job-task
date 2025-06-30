import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 text-center bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 leading-tight drop-shadow-lg">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Eventify</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium">
          Discover, create, and join amazing events. <br />
          Manage your own events, connect with others, and never miss out!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events">
            <span className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Browse Events
            </span>
          </Link>
          <Link href="/events/add">
            <span className="inline-block px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold text-lg border border-blue-200 shadow hover:bg-blue-50 transition-all duration-200">
              Create Event
            </span>
          </Link>
        </div>
      </div>
      {/* Decorative background shapes */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl z-0" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-2xl z-0" />
    </section>
  );
} 