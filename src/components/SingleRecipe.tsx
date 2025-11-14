import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material'
import '../Style/SingleRecipe.css'
import axios from 'axios';
import CountUp from "react-countup";

type Recipe = {
  id: string;
  name: string;
  description: string;
  img: string;
  total_time:string;
  mealType: "all recipe" | "breakfast" | "dinner" | "snacks" | "lunch";
  author: string;
  total_ingredients: number;
  calories: number;
  level: "easy" | "medium" | "hard";
  ingredients: string[];
  preparation: string[];
  difficulty:"easy" | "medium" | "hard";
};

export default function SingleRecipe() {
  const { id } = useParams();
  console.log(id)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [err, setErr] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`)
      .then(res => {
        setRecipe(res.data)
        console.log("rec", recipe)
      }
      )
      .catch(err => console.log('Recipe not found'))
  }, [id])
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid size={{xs:12,md:5}}><img src={`../src/assets/${recipe?.img}`} className='food-img'></img></Grid>
        <Grid size={{xs:12,md:7}}>

          <Grid container spacing={0}>
            <Grid size={{xs:12,md:10}}>
            <h1 className='reci-name mb-0'>{recipe?.name}</h1>
            </Grid>
            <Grid size={{xs:12,md:2}}>
              
                <h4 className='mar-0 err-text purple fa-10 new_flex'>
                   <span className="material-symbols-outlined purple font-large">schedule </span> 
                   &nbsp;{recipe?.total_time}</h4>
            </Grid>
            
            </Grid>
          <p className=' ternary'>{recipe?.author}</p>
          <Grid container spacing={3}>
            <Grid size={4} className='sub-list text-center'  >
              <h1 className='sub-list1'>{recipe?.total_ingredients !== undefined && (
    <CountUp start={0} end={recipe.total_ingredients} duration={2} />
  )}</h1>
              <p className='ternary pad-10'>Ingredients</p>

            </Grid>
            <Grid size={4} className='sub-list text-center' >
              <h1 className='sub-list1'>{recipe?.calories && ( <CountUp start={0} end={recipe.calories} duration={2} />)}</h1>
              <p className='ternary'>Calories</p>

            </Grid>
            <Grid size={4} className='sub-list text-center' >
              <h1 className='sub-list1'>{recipe?.level}</h1>
              <p className='ternary'>Difficulty</p>

            </Grid>
          </Grid>
          <h3 className='ternary'>Ingredients:</h3>
          <hr style={{ height: '1px', background: '#868787' }}></hr>
          <ul>
            {recipe?.ingredients.map((ingre: string) => {
              return (
                <li><p className='ternary'>{ingre}</p></li>
              )
            })}
          </ul>
          <h3 className='ternary'>How to Prepare?</h3>
          <hr style={{ height: '1px', background: '#868787' }}></hr>
          <ul>
            {recipe?.preparation.map((step: string) => {
              return (
                <li><p className='ternary'>{step}</p></li>
              )
            })}
          </ul>
        </Grid>
      </Grid>
    </Container>
  )
}
