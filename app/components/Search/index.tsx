"use client";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import RecipeCard from "../Card";
import { useRecipeStore } from "@/app/store/useRecipeStore";
import Loader from "../Loader";
import NoData from "../NoData";

export default function Search() {
  const allRecipesState = useRecipeStore((state) => state.allRecipes);
  const {
    inputValue,
    debouncedValue,
    results,
    isLoading,
    setInputValue,
    allRecipes,
  } = useRecipeStore();

  useEffect(() => {
    allRecipes();
  }, [allRecipesState]);

  return (
    <div className="w-full">
      <div className="text-center pb-10">
        <div className="md:text-6xl text-3xl text-black my-4">
          Recipe Search
        </div>
        <div className="md:text-lg text-sm text-black">
          Showing all recipes. Type to filter the list
        </div>
      </div>
      <Stack spacing={2}>
        <TextField
          id="recipe-search"
          label="Search Recipe"
          variant="outlined"
          placeholder="Search.."
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Stack>

      {isLoading ? (
        <div className="w-full mt-24 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {results.length > 0 ? (
            <div className="w-full h-full justify-items-stretch grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
              {results.map((recipe) => (
                <RecipeCard key={recipe.id} item={recipe} />
              ))}
            </div>
          ) : (
            debouncedValue && (
              <NoData />
            )
          )}
        </>
      )}
    </div>
  );
}
