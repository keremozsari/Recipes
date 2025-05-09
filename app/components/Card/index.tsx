import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Recipe } from "@/app/types/recipes";
import Image from "next/image";

interface RecipeCardProps {
  item: Recipe;
}

export default function RecipeCard({ item }: RecipeCardProps) {
  return (
    <>
      <Card key={item.id}>
        <CardActionArea className="!flex flex-col !justify-start h-full">
          <Image
            loading="lazy"
            width={500}
            height={140}
            src={item.image}
            alt="green iguana"
            quality={75}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.instructions}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
