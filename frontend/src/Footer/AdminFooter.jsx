
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Footer.module.css';

export default function AdminFooter() {
 const navigate = useNavigate();

  function showMessages(){
    navigate('https://e-learning-expert-lab-frontend.onrender.com/admin/userMessages')
  }
  function addCour(){
    navigate('https://e-learning-expert-lab-frontend.onrender.com/admin/newcours')
  }

    return (
        <div className={classes.footer}>
          <div className={classes.box_btn}>

            <button className={classes.btn_Message} onClick={showMessages}>Message des utilisateurs</button>
            <button className={classes.btn_Message} onClick={addCour}>Ajouter un cour</button>
          </div>
            <p>Copyright © 2024 <NavLink to="https://cissemohamed.onrender.com" target='blank'>Cisse Mohamed</NavLink> Tous droits réservés</p>

        </div>

    );
}
