import { useState, useEffect } from 'react';
import classes from './Header.module.css'
import { FaCirclePlay } from "react-icons/fa6";
import { ImCheckboxChecked } from "react-icons/im";
import im0 from './../../images/im0.png';
import im1 from './../../images/im1.png';
import im2 from './../../images/im2.png';
import im3 from './../../images/im3.png';
import im4 from './../../images/im4.png';
import im5 from './../../images/im5.png';
import { useNavigate } from 'react-router-dom';

export default function HomeHeader(){
    // État pour suivre l'index de l'image actuelle
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const goToCours = () =>{
        navigate('/cours');
    }
    // Tableau des images
    const images = [im0, im1, im2, im3, im4, im5];

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
            {/* Utilisation de l'image actuelle basée sur l'index */}
            <img src={images[currentImageIndex]} alt="Logo d'apprentissage" className={classes.learningLogo} />

            <div className={classes.header_box}>
                <h1>Expert-Lab : Votre plateforme d'apprentissage en ligne</h1>
                <p className={classes.description}>
                    Découvrez une nouvelle façon d'apprendre avec Expert-Lab. Notre plateforme vous offre des cours de qualité, flexibles et adaptés à vos besoins, pour développer vos compétences à votre rythme.
                </p>
                <div className={classes.header_box_btn}>
                    <button className={classes.header_box_btn1} onClick={goToCours}>Commencer maintenant</button>
                    <FaCirclePlay className={classes.header_box_btn_play} />
                </div>
                <div className={classes.header_contente}>
                    <p><ImCheckboxChecked className={classes.checked} /> Cours interactifs et engageants</p>
                    <p><ImCheckboxChecked className={classes.checked} /> Apprentissage à votre rythme</p>
                    <p><ImCheckboxChecked className={classes.checked} /> Certificats reconnus</p>
                </div>
            </div>

            
        </section>
        </>
    )
}