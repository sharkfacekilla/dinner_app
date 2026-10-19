"use client"

import { useState } from "react"
import { Dices, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RandomRecipeButtonProps {
  onPick: () => void
  className?: string
}

export function RandomRecipeButton({ onPick, className }: RandomRecipeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      onPick()
    }, 600)
  }

  return (
    <Button
      size="lg"
      onClick={handleClick}
      disabled={isAnimating}
      className={cn(
        // h-10 / h-11 fits the 16 (h-16) header better than h-14
        "group relative h-10 sm:h-11 gap-2 overflow-hidden bg-primary px-3 sm:px-6 text-sm sm:text-base font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:scale-105",
        isAnimating && "animate-pulse",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <Dices className={cn("h-5 w-5 transition-transform duration-300", isAnimating && "animate-spin")} />

      {/* Text hidden on small mobile: just the dice */}
      <span className="hidden md:inline">Pick Random Recipe</span>

      <Sparkles className="h-4 w-4 opacity-60 hidden lg:block" />
    </Button>
  )
}
