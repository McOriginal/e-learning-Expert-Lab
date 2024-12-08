
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Footer.module.css';

export default function AdminFooter() {
 const navigate = useNavigate();

  function showMessages(){
    navigate('https://e-learning-expert-lab-frontend.onrender.com/admin/userMessages')
  }

    return (
        <div className={classes.footer}>
            <button onClick={showMessages}>Message des utilisateurs</button>
            <p>Copyright © 2024 <NavLink to="https://cissemohamed.onrender.com" target='blank'>Cisse Mohamed</NavLink> Tous droits réservés</p>

        </div>

    );
}
