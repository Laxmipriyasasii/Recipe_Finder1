import React from 'react'
import '../Style/Categories.css'
import { Grid } from '@mui/material'
import {Cate_gories} from '../Data/loginRegiter'
import { Link } from 'react-router-dom'

export default function Categories() {
   
  return (
   <>
    <h3 className='text-center title'>Find recipe by categories</h3>
    <p className='text-center'>From breakfast to dinner, browse recipes by categories that suit your cravings.</p>
    <Grid container spacing={0} sx={{
         justifyContent: "center",
        alignItems: "center",
        paddingTop:'20px'
       
    }}>
        
        {Cate_gories.map((data)=>(
            <Grid size={{xs:6,lg:4}}>
            <div className='div-flex'>
                <Link to={`/recipes/${data.title}`} className='text-decoration white' >
           <img src={`../src/assets/${data.img}`} className='cate-img'  />
           <h5 className='uppercase text-center cat-text'>{data.title}</h5>
             </Link>
           </div>
          
        </Grid>
        ))}
       
    </Grid>
   </>
  )
}
