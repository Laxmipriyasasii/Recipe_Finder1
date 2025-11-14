 export interface Recipe {
  id: number;
  brief_title:string;
  name: string;
  
  mealType: string;
  detailed_description:string;
  img: string;
  difficulty: string;
  description: string;
  author: string;
  total_ingredients: number;
  calories: number;
  level: string;
  total_time:string,
  ingredients: string[];
  preparation: string[];
  isFavorite?: boolean;  // Optional field for favorite status
}
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  Confirm_password: string;
  feedback:string;
  rating:number;
}
