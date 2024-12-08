import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './AboutUs.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import a1 from '../images/a1.jpg';
import a2 from '../images/a2.jpg';
import a3 from '../images/a3.jpg';
import Footer from '../Footer/Footer';

export default function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [a1, a2, a3];
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://https://e-learning-expert-lab-backend.onrender.com/user/message', formData);
      alert('Message envoyé avec succès !');
      setFormData({ nom: '', email: '', telephone: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Une erreur est survenue lors de l\'envoi du message.');
    }
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.backgroundImage} style={{backgroundImage: `url(${images[currentImageIndex]})`}}></div>
        <div className={classes.headerContent}>
          <h1>Qui sommes-nous ?</h1>
          <p>Votre partenaire de confiance pour l'apprentissage en ligne du numérique</p>
        </div>
      </header>

      <section className={classes.aboutSection}>
        <h2>Notre Mission</h2>
        <p>Chez Expert-Lab Online Learning, nous nous engageons à fournir une éducation de qualité en numérique, accessible à tous. Notre plateforme offre des cours en ligne conçus pour répondre aux besoins du marché du travail actuel et futur.</p>
      </section>

      <section className={classes.servicesSection}>
        <h2>Nos Services</h2>
        <div className={classes.servicesList}>
          <div className={classes.serviceItem}>
            <h3>Cours en ligne</h3>
            <p>Des cours interactifs dispensés par des experts de l'industrie</p>
          </div>
          <div className={classes.serviceItem}>
            <h3>Projets pratiques</h3>
            <p>Des projets réels pour appliquer vos compétences</p>
          </div>
          <div className={classes.serviceItem}>
            <h3>Certification</h3>
            <p>Des certificats reconnus pour valoriser votre parcours</p>
          </div>
        </div>
      </section>

      <section className={classes.contactSection}>
        <h2>Contactez-nous</h2>
        <div className={classes.contactContainer}>
          <div className={classes.contactInfo}>
            <h3>Nos Coordonnées</h3>
            <p><FaPhone /> +223 77 77 17 19</p>
            <p><FaPhone /> +223 67 77 17 19</p>
            <p><FaEnvelope /> originalmc223@gmail.com</p>
            <p><FaMapMarkerAlt /> Sotuba ACI près de l'école KILANCO</p>
            <p><FaMapMarkerAlt /> Bacodjicoroni GOLF près de l'immeuble BAMA</p>
          </div>
          <form className={classes.contactForm} onSubmit={handleSubmit}>
            <input type="text" name="nom" placeholder="Votre nom" required value={formData.nom} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Votre email" required value={formData.email} onChange={handleInputChange} />
            <input type="tel" name="telephone" placeholder="Votre numéro de téléphone" required value={formData.telephone} onChange={handleInputChange} />
            <textarea name="message" placeholder="Votre message" required value={formData.message} onChange={handleInputChange}></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
