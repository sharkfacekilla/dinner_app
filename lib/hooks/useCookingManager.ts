import { useState, useEffect, useRef } from "react"

export function useCookingManager(recipeId: string, totalSteps: number) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
  const [cookingMode, setCookingMode] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wakeLockRef = useRef<any>(null)

  // 1. No "load on mount" effect: refreshing the page or force-closing the
  //    app resets progress back to empty.

  // 2. Save progress to localStorage while active, so switching apps
  //    (visibility change) doesn't lose it if the browser throttles the tab.
  useEffect(() => {
    if (completedSteps.length > 0 || checkedIngredients.length > 0) {
      localStorage.setItem(`recipe-progress-${recipeId}`, JSON.stringify({
        steps: completedSteps,
        ingredients: checkedIngredients,
        timestamp: Date.now()
      }))
    }
  }, [completedSteps, checkedIngredients, recipeId])

  // Screen Wake Lock: keep the screen on while cooking mode is enabled
  useEffect(() => {
    const requestLock = async () => {
      if ("wakeLock" in navigator && cookingMode) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          wakeLockRef.current = await (navigator as any).wakeLock.request("screen")
        } catch (err) {
          console.error(err)
        }
      }
    }

    const handleVisibilityChange = async () => {
      if (wakeLockRef.current !== null && document.visibilityState === "visible") {
        await requestLock()
      }
    }

    if (cookingMode) {
      requestLock()
      document.addEventListener("visibilitychange", handleVisibilityChange)
    } else {
      wakeLockRef.current?.release()
      wakeLockRef.current = null
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      wakeLockRef.current?.release()
    }
  }, [cookingMode])

  const progress = totalSteps ? Math.round((completedSteps.length / totalSteps) * 100) : 0

  return {
    completedSteps, setCompletedSteps,
    checkedIngredients, setCheckedIngredients,
    cookingMode, setCookingMode,
    progress
  }
}
