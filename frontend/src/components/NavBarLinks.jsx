import React, { useState } from 'react';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';
import axios from 'axios';
import classes from './NavBar.module.css';
import logo from './../images/Logo.png';
import { GrFormNextLink } from "react-icons/gr";
import { TiThMenu } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Ce composant affiche la barre de navigation et gère la déconnexion des utilisateurs, en affichant une barre de progression circulaire lors de la déconnexion.

export default function NavBarLinks({ setIsAuthenticated }) {
    const [showProgress, setShowProgress] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [changeMenu, setChangeMenu] = useState(false);
    const navigate = useNavigate();

    const activeMenu = () => {
        setChangeMenu(true);
    }

    function closeMenu() {
        setChangeMenu(false);
    }

    const handleLogout = async () => {
        setShowProgress(true);
        
        try {
            const response = await axios.post('https://e-learning-expert-lab-server.onrender.com/logout', {}, { withCredentials: true });
            console.log(response);
            setIsSuccess(true);
            setMessage('Déconnexion réussie !');
            setTimeout(() => {
                setIsAuthenticated(false);
                navigate('/login');
            }, 5000);
        } catch (error) {
            setTimeout(() => {
                setShowProgress(false);
            }, 3000);
            setIsSuccess(false);
            setMessage('Erreur lors de la déconnexion');
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            setTimeout(() => setShowProgress(false), 5000);
        }
    };

    return (
        <>
            <div className={classes.navBar_items}>
                <nav className={classes.navBar}>
                    <img src={logo} alt="logo" onClick={() => navigate('/home')} />
                    <ul className={`${changeMenu ? classes.menu_active : undefined}`}>
                        <IoMdCloseCircle className={classes.close} onClick={closeMenu} />
                        <li><NavLink onClick={closeMenu} to="/home"> Accueil</NavLink></li>
                        <li><NavLink onClick={closeMenu} to="/cours"> Cours</NavLink></li>
                        <li><NavLink onClick={closeMenu} to="/formateurs"> Formateurs</NavLink></li>
                        <li><NavLink onClick={closeMenu} to="/aboutus"> Qui sommes-nous ?</NavLink></li>
                        <IoMdLogIn className={classes.login} onClick={handleLogout} />
                    </ul>

                    <button className={classes.btn_login} onClick={handleLogout}>
                        Déconnecter <GrFormNextLink className={classes.arrow} />
                    </button>

                <TiThMenu className={classes.menu} onClick={activeMenu} />
                </nav>
            </div>
            {showProgress && (
                <CircularProgressBar isSuccess={isSuccess} message={message} duration={5000} />
            )}
        </>
    )
}