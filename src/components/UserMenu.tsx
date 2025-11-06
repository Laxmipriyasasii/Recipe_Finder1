import React from 'react';
import { Link } from 'react-router-dom';

// Define the type for the props (name should be a string)
interface UserMenuProps {
    name: string;
    email: string;
    firstletter: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ name, email, firstletter }) => {
    return (
        <ul>
            <div className='flex pro pad-15'> <h3 className='profile list-profile'>{firstletter}</h3>
                <li className='list-type text-capitalize fa-10'>{name}</li> </div>
            <hr className='mar-0'/>
            <li className='list-type pad-15 flex pro '>
                <span className="material-symbols-outlined icons">
                    mail
                </span>
                <h3 className='mar-0 fa-10'>{email}</h3>
                </li>
            <li className='list-type pad-15 flex pro '>
                <span className="material-symbols-outlined  icons">
                    bookmark_star
                </span>
                <h3 className='mar-0 fa-10'>Saved</h3>
                </li>
            <hr className='mar-0' />
            <Link to="/login" className='text-decoration '><li className='flex pro'> <span className=" icons material-symbols-outlined orangish">
                logout
            </span><h3 className='mar-0 logout orangish'>Logout</h3></li></Link>
        </ul>
    );
};

export default UserMenu;
