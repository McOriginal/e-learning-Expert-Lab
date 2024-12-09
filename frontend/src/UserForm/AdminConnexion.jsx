import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';
import classes from './Connexion.module.css';

// Ce composant gère la connexion des utilisateurs et affiche une barre de progression circulaire lors de la soumission du formulaire.

export default function AdminConnexion({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showProgress, setShowProgress] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://e-learning-expert-lab-server.onrender.com/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            // Voir le dialogue de progression 
            setShowProgress(true);
            
            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setMessage('Connexion réussie !');
                setTimeout(() => {
                    setIsAuthenticated(true);
                    navigate('http://e-learning-expert-lab-frontend.onrender.com/admin/admincours');
                }, 3000);
            } else {
                setTimeout(() => {
                    setShowProgress(false);
                }, 3000);
                setIsSuccess(false);
                setMessage(data.message || 'Échec de la connexion');
            }
        } catch (error) {
            setTimeout(() => {
                setShowProgress(false);

            }, 3000);
            setIsSuccess(false);
            setMessage('Erreur lors de la connexion');
        }
    };

    return (
        <section className={classes.mainContainer}>
            <div className={classes.container}>
                <form onSubmit={handleSubmit} className={classes.right}>
                    <div className={classes.inputbox}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id='email' 
                            name='email'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={classes.inputbox}>
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            type="password" 
                            id='password' 
                            name='password'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type='submit' className={classes.btn}>Se connecter</button>
                </form>
                <div className={classes.left}>
                    <h1>Bienvenue</h1>
                    <h4>Connectez-vous pour accéder à votre compte</h4>
                    <button onClick={() => navigate('/signup')}>utilisateurs</button>
                </div>
            </div>
            {showProgress && (
                <CircularProgressBar isSuccess={isSuccess} message={message} duration={5000} />
            )}
        </section>
    );
}