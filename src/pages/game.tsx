import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import clsx from "clsx";
import { ArrowLeft, Check, RotateCw } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { Link, useParams } from "react-router";
import * as dataset from "virtual:db";

type Params = {
  key: keyof typeof import("virtual:db");
};

const GameNavButton: FC<ComponentProps<typeof Button>> = ({
  variant = "ghost",
  className,
  ...props
}) => {
  const { key } = useParams<Params>();
  return (
    <Button
      {...props}
      variant={variant}
      className={
        (cn({
          "text-pink-400 hover:text-pink-300 hover:bg-pink-500/10":
            key === "most_likely_to",
          "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10":
            key === "would_you_rather",
          "text-orange-400 hover:text-orange-300 hover:bg-orange-500/10":
            key === "hot_takes",
          "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10":
            key === "never_have_i_ever",
          "text-green-400 hover:text-green-300 hover:bg-green-500/10":
            key === "two_truths_and_a_lie",
          "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10":
            key === "how_well_do_you_know_me",
          "text-red-400 hover:text-red-300 hover:bg-red-500/10":
            key === "rapid_fire",
          "text-violet-400 hover:text-violet-300 hover:bg-violet-500/10":
            key === "deep_cuts",
        }),
        className)
      }
    />
  );
};

export default function Game() {
  const { key } = useParams<Params>();
  const selectedPromptIds = useStore((state) => (key ? state[key] : null));
  const removeItem = useStore((state) => state.removeItem);
  const addItem = useStore((state) => state.addItem);
  const reset = useStore((state) => state.reset);

  if (!key || selectedPromptIds === null) return "ERROR";
  const prompts = dataset[key];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" replace>
            <GameNavButton>
              <ArrowLeft className="size-4 mr-2" />
              Back to Games
            </GameNavButton>
          </Link>
          <GameNavButton variant="outline" onClick={() => reset(key)}>
            Reset
            <RotateCw className="size-4" />
          </GameNavButton>
        </div>

        <div className="text-center mb-8">
          <h1
            className={clsx(
              "text-4xl capitalize font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent",
              {
                "from-pink-400 to-rose-400": key === "most_likely_to",
                "from-purple-400 to-indigo-400": key === "would_you_rather",
                "from-orange-400 to-red-400": key === "hot_takes",
                "from-blue-400 to-cyan-400": key === "never_have_i_ever",
                "from-green-400 to-emerald-400": key === "two_truths_and_a_lie",
                "from-yellow-400 to-amber-400":
                  key === "how_well_do_you_know_me",
                "from-red-400 to-pink-400": key === "rapid_fire",
                "from-violet-400 to-purple-400": key === "deep_cuts",
              }
            )}
          >
            {key?.replace(/_/g, " ")}
          </h1>
          <p className="text-gray-400 text-lg">
            Vote on who in your group fits these hilarious scenarios!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {prompts.map((prompt, index) => {
            const isSelected = selectedPromptIds.includes(prompt.id);
            return (
              <Card
                key={index}
                className={clsx(
                  "bg-gray-800 border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  isSelected && "shadow-lg",
                  clsx(
                    key === "most_likely_to" &&
                      clsx(
                        "hover:shadow-pink-500/20",
                        isSelected
                          ? "border-pink-400 bg-pink-500/10 shadow-lg shadow-pink-500/20"
                          : "border-pink-500/50 hover:border-pink-400"
                      )
                  ),
                  clsx(
                    key === "would_you_rather" &&
                      clsx(
                        "hover:shadow-purple-500/20",
                        isSelected
                          ? "border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                          : "border-purple-500/50 hover:border-purple-400"
                      )
                  ),
                  clsx(
                    key === "hot_takes" &&
                      clsx(
                        "hover:shadow-orange-500/20",
                        isSelected
                          ? "border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20"
                          : "border-orange-500/50 hover:border-orange-400"
                      )
                  ),
                  clsx(
                    key === "never_have_i_ever" &&
                      clsx(
                        "hover:shadow-blue-500/20",
                        isSelected
                          ? "border-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                          : "border-blue-500/50 hover:border-blue-400"
                      )
                  ),
                  clsx(
                    key === "two_truths_and_a_lie" &&
                      clsx(
                        "hover:shadow-green-500/20",
                        isSelected
                          ? "border-green-400 bg-green-500/10 shadow-lg shadow-green-500/20"
                          : "border-green-500/50 hover:border-green-400"
                      )
                  ),
                  clsx(
                    key === "how_well_do_you_know_me" &&
                      clsx(
                        "hover:shadow-yellow-500/20",
                        isSelected
                          ? "border-yellow-400 bg-yellow-500/10 shadow-lg shadow-yellow-500/20"
                          : "border-yellow-500/50 hover:border-yellow-400"
                      )
                  ),
                  clsx(
                    key === "rapid_fire" &&
                      clsx(
                        "hover:shadow-red-500/20",
                        isSelected
                          ? "border-red-400 bg-red-500/10 shadow-lg shadow-red-500/20"
                          : "border-red-500/50 hover:border-red-400"
                      )
                  ),
                  clsx(
                    key === "deep_cuts" &&
                      clsx(
                        "hover:shadow-violet-500/20",
                        isSelected
                          ? "border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                          : "border-violet-500/50 hover:border-violet-400"
                      )
                  )
                )}
                onClick={() => {
                  const action = isSelected ? removeItem : addItem;
                  action(prompt.id, key);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* <span className="text-pink-400 font-bold text-sm bg-pink-500/20 px-2 py-1 rounded-full min-w-[2rem] text-center">
                        {isSelected ? <Check className="size-4"/> : index + 1}
                      </span> */}
                    <div
                      className={clsx(
                        "size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                        isSelected && "text-white group-hover:scale-110",
                        clsx(
                          key === "most_likely_to" &&
                            (isSelected
                              ? "bg-pink-500/30 text-pink-300 border-pink-500/50"
                              : "bg-pink-500 border-pink-400")
                        ),
                        clsx(
                          key === "would_you_rather" &&
                            (isSelected
                              ? "bg-purple-500/30 text-purple-300 border-purple-500/50"
                              : "bg-purple-500 border-purple-400")
                        ),
                        clsx(
                          key === "hot_takes" &&
                            (isSelected
                              ? "bg-orange-500/30 text-orange-300 border-orange-500/50"
                              : "bg-orange-500 border-orange-400")
                        ),
                        clsx(
                          key === "never_have_i_ever" &&
                            (isSelected
                              ? "bg-blue-500/30 text-blue-300 border-blue-500/50"
                              : "bg-blue-500 border-blue-400")
                        ),
                        clsx(
                          key === "two_truths_and_a_lie" &&
                            (isSelected
                              ? "bg-green-500/30 text-green-300 border-green-500/50"
                              : "bg-green-500 border-green-400")
                        ),
                        clsx(
                          key === "how_well_do_you_know_me" &&
                            (isSelected
                              ? "bg-yellow-500/30 text-yellow-300 border-yellow-500/50"
                              : "bg-yellow-500 border-yellow-400")
                        ),
                        clsx(
                          key === "rapid_fire" &&
                            (isSelected
                              ? "bg-red-500/30 text-red-300 border-red-500/50"
                              : "bg-red-500 border-red-400")
                        ),
                        clsx(
                          key === "deep_cuts" &&
                            (isSelected
                              ? "bg-violet-500/30 text-violet-300 border-violet-500/50"
                              : "bg-violet-500 border-violet-400")
                        )
                      )}
                    >
                      {isSelected ? <Check className="size-4" /> : index + 1}
                    </div>
                    <p
                      className={clsx(
                        isSelected
                          ? "text-gray-500 line-through"
                          : "text-white",
                        "text-sm leading-relaxed flex-1"
                      )}
                    >
                      {prompt.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedPromptIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Button
              className={clsx(" text-white px-8 py-3 rounded-full shadow-lg ", {
                "bg-pink-500 hover:bg-pink-600 shadow-pink-500/30":
                  key === "most_likely_to",
                "bg-purple-500 hover:bg-purple-600 shadow-purple-500/30":
                  key === "would_you_rather",
                "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30":
                  key === "hot_takes",
                "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30":
                  key === "never_have_i_ever",
                "bg-green-500 hover:bg-green-600 shadow-green-500/30":
                  key === "two_truths_and_a_lie",
                "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/30":
                  key === "how_well_do_you_know_me",
                "bg-red-500 hover:bg-red-600 shadow-red-500/30":
                  key === "rapid_fire",
                "bg-violet-500 hover:bg-violet-600 shadow-violet-500/30":
                  key === "deep_cuts",
              })}
            >
              {selectedPromptIds.length} / {prompts.length} prompts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
