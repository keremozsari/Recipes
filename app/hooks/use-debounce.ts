"use client"
import { useState, useEffect } from "react"

export function useDebounce<TestState>(value: TestState, delay: number): TestState {
  const [debouncedValue, setDebouncedValue] = useState<TestState>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
