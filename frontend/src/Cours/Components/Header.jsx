import classes from './Header.module.css';

import { FaCirclePlay } from "react-icons/fa6";
import c0 from './../../images/c0.png';
import c1 from './../../images/c1.png';
import c2 from './../../images/c2.png';
import c3 from './../../images/c3.png';
import c4 from './../../images/c4.png';
import { useEffect, useState } from 'react';

export default function Header(){

// État pour suivre l'index de l'image actuelle
const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [c0, c1, c2, c3, c4];

    // Effet pour changer l'image toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(interval);
    }, [images.length]);

    return(
        <>
        <section className={classes.header}>

        <img src={images[currentImageIndex]} alt="logo d'apprentissage" className={classes.learningLogo} />

        <div className={classes.header_box}>
            <h1>Apprenez à votre rythme, où que vous soyez</h1>
            <p className={classes.description}>
                Découvrez une nouvelle façon d'apprendre avec notre plateforme flexible et interactive. 
                Accédez à des cours de qualité, adaptés à votre emploi du temps et à vos objectifs personnels.
            </p>
            <div className={classes.header_box_btn}>
                <button className={classes.header_box_btn1}>Commencer l'aventure</button>
                <FaCirclePlay className={classes.header_box_btn_play} />
            </div>
            
        </div>

        </section>
        </>
    )
}