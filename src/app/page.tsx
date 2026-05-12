import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import CompatibilityMatrix from "@/components/landing/CompatibilityMatrix";
import Leaderboard from "@/components/landing/Leaderboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <CompatibilityMatrix />
      <Features />
      <Leaderboard />
      
      {/* Awareness Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Donate Blood?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Blood is the most precious gift that anyone can give to another person — the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components — red cells, platelets and plasma.
              </p>
              <ul className="mt-8 space-y-4 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  One donation can save up to three lives.
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  It takes only 15 minutes of your time.
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Regular donation reduces the risk of heart disease.
                </li>
              </ul>
              <div className="mt-10">
                <Link href="/register">
                  <Button size="lg">Become a Hero Today</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply" />
              <img 
                src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?auto=format&fit=crop&q=80&w=1200" 
                alt="Blood donation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              In an Emergency?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Post an urgent request and reach out to hundreds of donors in your area immediately.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link href="/requests/new">
                <Button variant="destructive" size="lg">Request Blood Now</Button>
              </Link>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4451-9470-49b500e293b8)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="8d958450-c69f-4451-9470-49b500e293b8">
                  <stop stopColor="#9b1c1c" />
                  <stop offset={1} stopColor="#ef4444" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
