import { Button, Container, Grid, Stack } from '@mui/material'
import '../App.css'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import type { Recipe } from './recipe.type';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { RootState } from '../store'
import Carousel from './Carousel';
import New_recipe from './New_recipe';
import Todayrecipe from './Todayrecipe';


export default function Home() {
    const dispatch = useDispatch();

    // Access user state from Redux store using useSelector
    const user = useSelector((state: RootState) => state.user);
    const { name, email, isAuthenticated } = user;
    console.log(name);
    const navigate = useNavigate()
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    const [query, setQuery] = useState("");
    const [message, setmessage] = useState<string | null>(null);
    const [showall, setShowall] = useState(false);
    const [delay, setDelay] = useState<Recipe[]>([]);
    const [meal, setMeal] = useState(["all recipe", "breakfast", "lunch", "snacks", "dinner"]);
    const [mealtype, setMealtype] = useState('all recipe')
    const [error, setError] = useState("");
    const [save, setSave] = useState<Recipe[]>([]);
    const [savedata, setSavedata] = useState<Recipe[]>([]);
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
        
            setDelay(recipe)
            setmessage(null)
            console.log("delayed value", delay)
       
        
    }, [recipe])

    const filteredData = delay.filter((recipe: any) => {

        const lowerQuery = query.toLowerCase();
        const recipe_name = recipe.name?.toLowerCase() || "";
        return recipe_name.includes(lowerQuery);
    })
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
    console.log("recipes", query)
    return (

        <>
            <Stack className='stack'>
                <div className="banner">
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '1000px' }}>
                        <h1 className='title title2'>Your Desired <span className='orangish'>Dish</span>?</h1>
                        <input type='search' placeholder='Search your recipe...' className='search' id='search' value={query} onChange={(e) => setQuery(e.target.value)} />
                        <p>search any recipe e.g. burger, pizza, sandwich, toast...</p>
                    </div>
                </div>
               
                <div className='recipess'>
                    {/* <div style={{ display: 'flex', alignItems: 'center'}}>
                        <span className="material-symbols-outlined orangish">
                        local_dining
                    </span>
                    <h2 className='recipe-list orangish subtitle'>Recipes for You</h2>
                    </div> */}
                    <div className='pad-30'>
                       
                        <h3 className=' title orangish text-center pad-10 mar-0'>Find Your Next Meal</h3>
                        <p className='ternary text-center mar-0'>Whether you're a novice or an expert in the Kitchen, there's somethimg here for everyone</p>

                    </div>

                    
                    {/* <Grid container spacing={0}>
                        {meal.map((meal) => {
                            return (
                                <Grid size={{ xs: 12, md: 2.4, lg: 2.4 }} className={`border-bottom text-center pad ternary ${mealtype === meal ? 'selected' : 'none'}`} onClick={() => Mealtype(meal)}>{meal}</Grid>
                            )
                        })}
                    </Grid> */}


                    {error && <div className='ternary text-center flex'><span className="material-symbols-outlined error">
                        error
                    </span><h4 className='err-text'>{error}</h4></div>}
                    <Grid container spacing={4} className='' >
                        {message && error === "" && <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '1000px' }}>
                            <PropagateLoader color="#833AB4" size={20} className='padding' /></div>}
                        {(showall ? filteredData : filteredData.slice(0, 8)).map((data: any) => {
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
                                    <Link  to={`/recipe/${data.id}`} className='orangish text-decoration link-recipe padding' >View recipe </Link>
                                    </div>
                                    </Link>
                                </Grid>
                            )
                        })}

                    </Grid>
                    <div className='center pad-20'><Link to='/recipes' className='mar-15'>
                        <Button variant="contained" className='view'  >Explore All Recipes <span className="material-symbols-outlined ">
                            double_arrow
                        </span></Button>
                    </Link>
                    </div>



                </div>
                 <div className="bg-black">
                            
                    <Todayrecipe/>
               </div>
                  {/* <div className="recipess pad-10">
                 <div className='log2 '>
                        <span className="material-symbols-outlined title-icon">
                            local_dining
                        </span>
                        <h1 className=' title orangish mar-0'>Newly Added recipes</h1>

                    </div>
                    <New_recipe/>
               </div> */}
              
               <div className="recipess " >
               <div style={{paddingBottom:'30px'}}>


                <div className='pad-30'>
                       
                        <h3 className=' title orangish text-center pad-10 mar-0'>Recently Added Recipes</h3>
                        <p className='ternary text-center mar-0'>Explore all our latest recipes of the week</p>

                    </div>
                    <Carousel/>
                    </div>
               </div>

            </Stack>
            <footer style={{height:'20px',backgroundColor:'black',color:'white'}}>
<p className='text-center'>&copy; 2025 Food18. All rights reserved.</p>
</footer>
        </>


    )
}
