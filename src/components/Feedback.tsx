import React, { useEffect, useState } from 'react'

import '../Style/Feedback.css'
import axios from 'axios';
import type { User } from './recipe.type' // Assuming you have a User type defined
import StarIcon from '@mui/icons-material/Star';
import Marquee from "react-fast-marquee";
import { Grid,Button } from '@mui/material';

export default function Feedback() {
  const [userss, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch data on component mount
    axios.get('http://localhost:3001/register_user')
      .then(res => {
        console.log("res",res.data)
        setUsers(res.data); // Assuming res.data is an array of users
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []); 
  const renderStarsWithLoop = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarIcon key={i} fontSize="small" style={{ color: 'black' }} />);
    }
    return stars;
  };
  return (
    <>
     <div className="recipess">
       <Grid container spacing={5}>
        <Grid size={{xs:12,lg:5}}>
          <div className="about-flex">
                        <h1 className="title orangish">What Are Customers say?</h1>
                        <p className="ternary "><span className='title fa-6'>Recipe</span> <span className='title finder'>Finder</span> is a place where you can please your soul and tummy with delicious food recepies of all cuisine. And our service is absolutely free. So start exploring now.</p>
                        <Button variant="contained" className="view btn-width ">Your review</Button>
                    </div>
        </Grid>
        <Grid size={{xs:12,lg:7}}>
          <div className="card-container">
        <Marquee>
        {userss.map((user) => (
          <div className="card" key={user.id}> {/* Make sure 'user.id' is unique */}
          <h3 className="text-center orangish err-text mar-0 capitalize">{user.name}</h3> {/* Assuming 'name' is part of the user object */}
            <div className="text-center">
              {renderStarsWithLoop(user.rating)}
            </div>
            <p className='ternary'>
              <img src="../src/assets/R_quote.png" className="quote-img" alt="Quote" />
              &nbsp;{user.feedback} &nbsp;
              <img src="../src/assets/L_quote.png" className="quote-img" alt="Quote" />
            </p>
            
          </div>
        ))}
        </Marquee>
      </div>
        </Grid>
      </Grid>
     </div>
    </>
  );
}
