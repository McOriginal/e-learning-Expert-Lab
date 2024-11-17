import React, { useState, useEffect } from 'react';
import classes from './Formateur.module.css';
import { FaStar, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { FaCirclePlay } from "react-icons/fa6";
import { ImCheckboxChecked } from "react-icons/im";
import e1 from '../images/e1.png';
import e2 from '../images/e2.png';
import e3 from '../images/e3.png';
import e4 from '../images/e4.png';
import f1 from '../images/f1.jpg';
import f2 from '../images/f2.jpg';
import f3 from '../images/f3.jpg';
import f4 from '../images/f4.jpg';
import f5 from '../images/f5.jpg';
import f6 from '../images/f6.jpg';
import Footer from '../Footer/Footer';

const formateurs = [
  {
    nom: "Zeynabe Berthé",
    specialite: "Développement Web Full-Stack",
    description: "Experte en React et Node.js avec 8 ans d'expérience dans l'industrie.",
    image: f1,
    note: 4.8
  },
  {
    nom: "Mohamed Sow",
    specialite: "Data Science",
    description: "Spécialiste en Machine Learning et Big Data, ancien chercheur chez Google.",
    image: f4,
    note: 4.9
  },
  {
    nom: "Emma Lefebvre",
    specialite: "UX/UI Design",
    description: "Designer primée avec une passion pour l'expérience utilisateur intuitive.",
    image: f2,
    note: 4.7
  },
  {
    nom: "Mohamed Cissé",
    specialite: "Cybersécurité",
    description: "Expert en sécurité informatique avec une expérience dans la protection des grandes entreprises.",
    image: f5,
    note: 4.9
  },
  {
    nom: "Aminata Fofana",
    specialite: "Intelligence Artificielle",
    description: "Chercheuse en IA, spécialisée dans le deep learning et le traitement du langage naturel.",
    image: f3,
    note: 4.8
  },
  {
    nom: "Mady Macalou",
    specialite: "DevOps & Cloud Computing",
    description: "Ingénieur DevOps certifié AWS et Azure, expert en automatisation et déploiement continu.",
    image: f6,
    note: 4.7
  }
];

export default function Formateur() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [e1, e2, e3, e4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className={classes.header}>
        <div className={classes.backgroundImage} style={{backgroundImage: `url(${images[currentImageIndex]})`}}></div>
        <div className={classes.header_box}>
          <h1>Nos Formateurs Experts</h1>
          <p className={classes.description}>Découvrez notre équipe de professionnels passionnés, prêts à partager leur expertise avec vous.</p>
          <div className={classes.header_box_btn}>
            <button className={classes.header_box_btn1}>Découvrir</button>
            <FaCirclePlay className={classes.header_box_btn_play} />
          </div>
          <div className={classes.header_contente}>
            <p><ImCheckboxChecked className={classes.checked} /> Experts reconnus</p>
            <p><ImCheckboxChecked className={classes.checked} /> Expérience pratique</p>
            <p><ImCheckboxChecked className={classes.checked} /> Pédagogie innovante</p>
          </div>
        </div>
      </section>

      <section className={classes.container}>
        <div className={classes.formateurGrid}>
          {formateurs.map((formateur, index) => (
            <div key={index} className={classes.formateurCard}>
              <div className={classes.imageContainer}>
                <img src={formateur.image} alt={formateur.nom} className={classes.formateurImage} />
              </div>
              <div className={classes.formateurInfo}>
                <h3 className={classes.formateurNom}>{formateur.nom}</h3>
                <p className={classes.formateurSpecialite}>{formateur.specialite}</p>
                <p className={classes.formateurDescription}>{formateur.description}</p>
                <div className={classes.formateurNote}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(formateur.note) ? classes.starFilled : classes.starEmpty} />
                  ))}
                  <span>{formateur.note.toFixed(1)}</span>
                </div>
                <div className={classes.socialLinks}>
                  <FaLinkedin className={classes.socialIcon} />
                  <FaTwitter className={classes.socialIcon} />
                  <FaGithub className={classes.socialIcon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}