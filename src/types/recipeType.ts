import { User } from '@prisma/client'

export type Recipe = {
  id: number;
  title: string;
  image: string;
}

export type RecipeDetail = {
  recipeId: number;
  title: string;
  summary: string;
  instructions: string;
  sourceUrl: string;
}

export type RecipeDetailModalProps = {
  recipeDetail: RecipeDetail | null;
  open: boolean;
  onClose: () => void;
}

// userのお気に入りレシピを保存する機能を作成したいです。