import classes from './HowIsWork.module.css';

import { FaBookMedical } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiDesk } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";

export default function HowIsWork(){

    return(
        <>
        <div className={classes.container}>
            <h1>Comment ça fonctionne</h1>

            <div className={classes.box_card}>
                <div className={classes.card}>
                    <div className={classes.box_icon}>
                        <FaBookMedical className={classes.icon}  />
                    </div>
                    <h4>Choisissez votre abonnement</h4>
                    <p>Sélectionnez le plan qui correspond le mieux à vos besoins et à votre budget.</p>
                </div>

                <div className={classes.card}>
                    <div className={classes.box_icon}>
                        <FaSearch  className={classes.icon}/>
                    </div>
                    <h4>Explorez nos cours</h4>
                    <p>Parcourez notre catalogue varié et trouvez les cours qui vous intéressent.</p>
                </div>

                <div className={classes.card}>
                    <div className={classes.box_icon}>
                        <GiDesk className={classes.icon} />
                    </div>
                    <h4>Suivez votre formation</h4>
                    <p>Apprenez à votre rythme avec nos cours interactifs et nos ressources pédagogiques.</p>
                </div>

                <div className={classes.card}>
                    <div className={classes.box_icon}>
                        <PiCertificateFill className={classes.icon} />
                    </div>
                    <h4>Obtenez votre certificat</h4>
                    <p>Validez vos acquis et recevez un certificat reconnu à la fin de votre formation.</p>
                </div>
            </div>
        </div>
        </>
    )
}