import classes from './Access.module.css';
import accessImage  from'./../../images/ilustration2.png';
import { ImCheckboxChecked } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

export default function Access(){

    const navigate = useNavigate();

    const goToAbout = () =>{
        navigate('/aboutus');
    }
    return(
        <>
        <div className={classes.container}>
            <div className={classes.box}>
                <div className={classes.box_img}>
                    <img src={accessImage} alt="Illustration d'accès aux cours" />
                </div>
                <div className={classes.contente}>
                    <h2>Accédez à des cours adaptés à tous les profils</h2>
                    <p>Expert-Lab vous offre une large gamme de cours pour répondre à vos besoins spécifiques, quel que soit votre niveau ou votre domaine d'intérêt.</p>
                    
                    <div className={classes.liste}>
                    <ul>
                        <li><ImCheckboxChecked className={classes.checked} />  <p>Cours pour débutants et experts</p> </li>
                        <li><ImCheckboxChecked className={classes.checked} />  <p>Contenus mis à jour régulièrement</p> </li>
                    </ul>
                    <ul>
                        <li><ImCheckboxChecked className={classes.checked} />  <p>Apprentissage pratique et interactif</p> </li>
                        <li><ImCheckboxChecked className={classes.checked} />  <p>Support personnalisé</p> </li>
                    </ul>
                    </div>

                    <button onClick={goToAbout}>voir plus...</button>
                </div>
            </div>
        </div>
        </>
    )
}