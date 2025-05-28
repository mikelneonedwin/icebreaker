"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Eye,
  Flame,
  Heart,
  MessageSquare,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

const gameCategories = [
  {
    name: "Most Likely To",
    description: "Vote on who fits these hilarious scenarios",
    color: "from-pink-500 to-rose-500",
    players: "3+ players",
    icon: Users,
    slug: "most_likely_to",
  },
  {
    name: "Would You Rather",
    description: "Choose between impossible dilemmas",
    color: "from-purple-500 to-indigo-500",
    players: "2+ players",
    icon: MessageSquare,
    slug: "would_you_rather",
  },
  {
    name: "Hot Takes",
    description: "Share your most controversial opinions",
    color: "from-orange-500 to-red-500",
    players: "3+ players",
    icon: Flame,
    slug: "hot_takes",
  },
  {
    name: "Never Have I Ever",
    description: "Discover secrets with this classic game",
    color: "from-blue-500 to-cyan-500",
    players: "3+ players",
    icon: XCircle,
    slug: "never_have_i_ever",
  },
  {
    name: "Two Truths and a Lie",
    description: "Guess which statement is the lie",
    color: "from-green-500 to-emerald-500",
    players: "3+ players",
    icon: Eye,
    slug: "two_truths_and_a_lie",
  },
  {
    name: "How Well Do You Know Me?",
    description: "Test how well your friends know you",
    color: "from-yellow-500 to-amber-500",
    players: "2+ players",
    icon: Brain,
    slug: "how_well_do_you_know_me",
  },
  {
    name: "Rapid Fire",
    description: "Quick questions, quicker answers",
    color: "from-red-500 to-pink-500",
    players: "2+ players",
    icon: Zap,
    slug: "rapid_fire",
  },
  {
    name: "Deep Cuts",
    description: "Meaningful conversations and connections",
    color: "from-violet-500 to-purple-500",
    players: "2+ players",
    icon: Heart,
    slug: "deep_cuts",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Icebreaker
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Break the ice and spark conversations with friends through fun
            social games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gameCategories.map((game, index) => {
            return (
              // <Link key={index} to={game.slug}>
              <Card
                key={index}
                onClick={() => navigate(game.slug)}
                className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div
                    className={`size-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <game.icon className="size-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {game.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
                      {game.players}
                    </span>
                    <div
                      className={`size-2 rounded-full bg-gradient-to-r ${game.color} group-hover:animate-pulse`}
                    ></div>
                  </div>
                </CardContent>
              </Card>
              // </Link>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="size-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span>More games coming soon</span>
            <div className="size-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
