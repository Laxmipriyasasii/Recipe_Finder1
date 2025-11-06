import { Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import '../Style/Header.css';
import { navBar } from '../Data/loginRegiter';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import UserMenu from './UserMenu';
import { useState } from 'react';

export default function Header() {
  const user_details = useSelector((state: RootState) => state.user);
  const { name, email, isAuthenticated } = user_details;
  console.log('auth', isAuthenticated)
  const firstletter = name.charAt(0)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileToggle = () => {
    setShowProfileMenu((prev) => !prev);
  }
  return (
    <header className='head'>
      <Grid container spacing={0} sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Grid size={{ xs: 6, md: 12, lg: 3.5 }}>
          <Link className='text-decoration' to='/'><div className='log'>
            <span className="material-symbols-outlined logo">
              room_service
            </span>
            <h1 className=' title title1'>RECIPE <span className='finder'>FINDER</span></h1>
          </div></Link>
        </Grid>

        <Grid size={{ xs: 6, md: 12, lg: 5.5 }}>
          <ul style={{ padding: '6px 30px', display: 'flex', margin: '0' }} className='justify-center'>
            {navBar.map((navList) => (
              <Link to={navList.link} key={navList.id} className='text-decoration'><h3 className='nav-list'>{navList.title}</h3></Link>
            ))}
          </ul>
        </Grid>
        <Grid size={{ xs: 6, md: 12, lg: 3 }}>
          <ul style={{ padding: '6px 30px', display: 'flex', margin: '0' }} className='justify-end'>
            {!isAuthenticated ? <><Link to="/login" className='text-decoration'><h3 className='login-nav-list'>Sign-In</h3></Link><Link to="/register" className='text-decoration '><h3 className='nav-list logi'>Sign-Up</h3></Link></>
              : <><div className='pad10'><h3 className='profile' onClick={profileToggle}>{firstletter}</h3>

                {showProfileMenu && (
                  <div>
                    <div className="profile-menu ternary">
                      <UserMenu name={name} email={email} firstletter={firstletter} />
                    </div>
                  </div>
                )}</div></>
            }
          </ul>
        </Grid>



      </Grid>

    </header>
  )
}
