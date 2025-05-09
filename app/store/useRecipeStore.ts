import { create } from "zustand";
import { Recipe } from "@/app/types/recipes";

interface RecipeState {
  inputValue: string;
  debouncedValue: string;
  results: Recipe[];
  isLoading: boolean;
  setInputValue: (value: string) => void;
  recipeSearch: () => Promise<void>;
  allRecipes: () => Promise<void>;
}

async function fetchSearchResults(term: string): Promise<any[]> {
  try {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${encodeURIComponent(term)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

async function fetchAllRecipes(): Promise<any[]> {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  inputValue: "",
  debouncedValue: "",
  results: [],
  isLoading: false,

  setInputValue: (value: string) => {
    set({ inputValue: value });
    if ((get() as any).debounceTimeout) {
      clearTimeout((get() as any).debounceTimeout);
    }
    const timeout = setTimeout(() => {
      set({ debouncedValue: value });
      const debouncedValue = get().debouncedValue;
      if (debouncedValue) {
        get().recipeSearch();
      } else {
        get().allRecipes();
      }
    }, 500);
    set((state) => ({ ...state, debounceTimeout: timeout } as any));
  },

  recipeSearch: async () => {
    const term = get().debouncedValue;
    if (!term) {
      get().allRecipes();
      return;
    }
    set({ isLoading: false });
    try {
      const results = await fetchSearchResults(term);
      set({ results, isLoading: false });
    } catch (error) {
      set({ results: [], isLoading: false });
    }
  },

  allRecipes: async () => {
    set({ isLoading: true });

    try {
      const results = await fetchAllRecipes();
      set({ results, isLoading: false });
    } catch (error) {
      console.error("Failed to load all recipes", error);
      set({ results: [], isLoading: false });
    }
  },
}));
