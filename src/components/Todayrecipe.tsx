import React from 'react'
import { useEffect, useState } from 'react';
import '../Style/Todayrecipe.css'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Recipe } from './recipe.type';
import axios from 'axios';

export default function Todayrecipe() {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState<Recipe | null>(null);
  const [recipe, setRecipe] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/recipes')   
      .then(res => {
        setRecipe(res.data)
        const dayOfYear = new Date().getDate();
        const recipeIndex = dayOfYear % recipe.length; // Rotate through recipes
        setRecipeOfTheDay(recipe[recipeIndex]);
      })
      .catch(err => {
        console.log("error fetching data")

      })
  }, [])
  useEffect(() => {
    const dayOfYear = new Date().getDate();
    const recipeIndex = dayOfYear % recipe.length; // Rotate through recipes
    setRecipeOfTheDay(recipe[recipeIndex]);
    console.log(`Current Day: ${dayOfYear}`);

  })
  console.log("top recipe here", recipeOfTheDay)
  return (
    <>
      {/* <div className="flex" style={{gap:'100px'}}>
        <img src='../src/assets/pancake.jpg' className='random-img'></img>
        <div className='recipe-day'>
          <h3>top recipe of the day</h3>
          <p>Pancakes are a popular breakfast dish made from a simple batter of flour, eggs, milk, and baking powder, which is fried on a griddle or skillet. They are typically round, flat, and fluffy, and can be served with a variety of toppings such as syrup, butter, fruit, whipped cream, or nuts. Pancakes are enjoyed worldwide, with regional variations like crepes, buttermilk pancakes, or savory versions with fillings.</p>
        </div>
      </div> */}
      <Grid container spacing={0} sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <img src={`../src/assets/${recipeOfTheDay?.img}`} className='random-img'></img>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <div className='recipe-day padd-20'>
            <h4 className='capitalize text-center letter-space-1'>Recipe of the day</h4>
            <h3 className='capitalize text-center title'>{recipeOfTheDay?.brief_title}</h3>
            <p className='line-height-28'>{recipeOfTheDay?.detailed_description}</p>
            <div className='center'><Link to={`/recipe/${recipeOfTheDay?.id}`} >
              <Button variant="contained" className='view1'  >View Recipe <span className="material-symbols-outlined ">
                double_arrow
              </span></Button>
            </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
