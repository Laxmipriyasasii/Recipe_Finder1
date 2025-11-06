import React from 'react'
import axios from 'axios';
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from './recipe.type';
import PropagateLoader from "react-spinners/PropagateLoader";
import { Button, Container, Grid, Stack } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';


export default function Allrecipes() {
     const navigate = useNavigate()
    const [mealtype, setMealtype] = useState('all recipe')
    const [meal, setMeal] = useState(["all recipe", "breakfast", "lunch", "snacks", "dinner"]);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    const [showall, setShowall] = useState(false);
    const [query, setQuery] = useState("");
    const [save, setSave] = useState<Recipe[]>([]);
    const [delay, setDelay] = useState<Recipe[]>([]);
    const [message, setmessage] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [savedata, setSavedata] = useState<Recipe[]>([]);

    const Mealtype = (meal: string) => {
        setMealtype(meal)
        if (meal === 'all recipe') {
            setDelay([])
            setRecipe(allRecipes)
        }
        else {
            const res = allRecipes.filter((recipe: any) => (recipe.mealType === meal))
            setDelay([])
            setRecipe(res)
        }
    }
    useEffect(() => {
        axios.get('http://localhost:3001/recipes')
            .then(res => {
                setAllRecipes(res.data)
                setRecipe(res.data)

            })
            .catch(err => {
                setError("Error fetching data")
                setmessage(null)

            })
    }, [])
    useEffect(() => {
        setmessage('Loading')
        const timer = setTimeout(() => {
            setDelay(recipe)
            setmessage(null)
            console.log("delayed value", delay)
        }, 1500);
        return () => clearTimeout(timer);
    }, [recipe])

 const addtofavorite = (id: any) => {
        const selectedRecipe = allRecipes.find((recipe: Recipe) => recipe.id === id);
        console.log("selectedRecipe", selectedRecipe)
        if (selectedRecipe) {

            setSave((prevSave) => {
                // Log state directly inside the updater function (this is the state after the update)
                const updatedSave = [...prevSave, selectedRecipe];
                console.log("updated save", updatedSave);
                setSavedata(updatedSave);
                return updatedSave;
            });
            console.log("save", save)
        }


    }
    const handleClick = (id: any) => {
        navigate(`/recipe/${id}`);
    };

    const filteredData = delay.filter((recipe: any) => {

        const lowerQuery = query.toLowerCase();
        const recipe_name = recipe.name?.toLowerCase() || "";
        return recipe_name.includes(lowerQuery);
    })
    console.log(query)
    return (
        <>
            <div className="recipess rec">
                <div className='log2 ' style={{ display: 'flex', justifyContent:'space-between'}}>
<div className="">
                    <h3 className=' title orangish mar-0 capitalize'>explore recipes by categories</h3></div>
<input type='search' placeholder='Search your recipe...' className='search1' id='search' value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>

                <Grid container spacing={0} className='rec'>
                    {meal.map((meal) => {
                        return (
                            <Grid size={{ xs: 12, md: 2.4, lg: 2.4 }} className={`border-bottom text-center pad ternary ${mealtype === meal ? 'selected' : 'none'}`} onClick={() => Mealtype(meal)}>{meal}</Grid>
                        )
                    })}
                </Grid>
                <Grid container spacing={4} className='pad-20' >
                    {message && error === "" && <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '1000px' }}>
                        <PropagateLoader color="#833AB4" size={20} className='padding' /></div>}
                    {filteredData.map((data: any) => {
                        // const arr = data;
                        // console.log("arr", arr)

                        return (

                            <Grid size={{ xs: 12, md: 4, lg: 3 }} className="c recipe-item rec">
                                    <Link  to={`/recipe/${data.id}`} className='text-decoration'>
                                        <img src={`../src/assets/${data.img}`} className='food-image '></img>
                                        <div className=''>
                                    <div className='flex space-between pad-10'><h4 className='ternary mar-0'>{data.name}</h4>
                                        {save.some((item) => item.id === data.id) ? <FavoriteIcon className='favorite-icon red' onClick={() => addtofavorite(data.id)} /> : <FavoriteBorderOutlinedIcon className='favorite-icon ternary' onClick={() => addtofavorite(data.id)} />}
                                    </div>
                                    <p className='ternary mar-0 pad-10-top card-desc'>{data.description}</p>
                                    <Link  to={`/recipe/${data.id}`} className='orangish text-decoration link-recipe padding'  >View recipe </Link>
                                    </div>
                                    </Link>
                                </Grid>
                                
                        )
                    })}

                </Grid>
            </div>

        </>
    )
}
