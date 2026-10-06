import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StyleQuiz } from "@/components/StyleQuiz";

export const metadata: Metadata = {
  title: "Wallpaper Style Quiz — Find Your Wall Personality",
  description: "Take Wallora's 60-second wallpaper style quiz. Answer 4 questions about your taste and room and get matched with the wallpaper collection that suits you. Earn 50 XP.",
  alternates: { canonical: "/style-quiz" },
};

export default function QuizPage() {
  return (
    <div className="wrap pt-8">
      <Breadcrumbs items={[{ name: "Style quiz", path: "/style-quiz" }]} />
      <header className="mt-6 mb-12 max-w-2xl">
        <p className="eyebrow">60 seconds · +50 XP · Style Sleuth badge 🔍</p>
        <h1 className="mt-3 text-5xl font-medium sm:text-6xl">What&apos;s your wall personality?</h1>
      </header>
      <StyleQuiz />
    </div>
  );
}
