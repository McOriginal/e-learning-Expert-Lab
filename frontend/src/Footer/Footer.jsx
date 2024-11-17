
import { NavLink } from 'react-router-dom';
import classes from './Footer.module.css';

export default function Footer() {
    return (
        <div className={classes.footer}>
            <p>Copyright © 2024 <NavLink to="https://cissemohamed.onrender.com" target='blank'>Cisse Mohamed</NavLink> Tous droits réservés</p>
        </div>
    );
}
