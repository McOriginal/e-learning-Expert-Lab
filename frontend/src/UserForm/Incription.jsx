import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Inscription.module.css';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';

export default function Inscription() {
	const navigate = useNavigate();
	const [showProgress, setShowProgress] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [message, setMessage] = useState('');

	const goToConnexion = () => {
		navigate('/login');
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		

		const formData = new FormData(event.target);
		const userData = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('https://e-learning-expert-lab-server.onrender.com/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

             // Voir le dialogue de progression 
             setShowProgress(true);

			if (response.ok) {
				setIsSuccess(true);
				setMessage('Inscription réussie !');
				setTimeout(() => navigate('/login'), 2000);
			} else {
                setTimeout(() => {
                setShowProgress(false);

            }, 3000);
				const data = await response.json();
                setShowProgress(true);
				setIsSuccess(false);
				setMessage(data.message || 'Erreur lors de l\'inscription');
			}
		} catch (error) {
            setTimeout(() => {
                setShowProgress(false);

            }, 3000);
			setIsSuccess(false);
			setMessage('Erreur de connexion au serveur');
		} finally {
			setTimeout(() => setShowProgress(false), 2000);
		}
	};

	return (
		<>
			<section className={classes.mainContainer}>
				<div className={classes.container}>
					<div className={classes.left}>
						<h1>Bienvenue</h1>
						<h4>Rejoignez-nous pour une meilleure expérience d'apprentissage</h4>
						<button onClick={goToConnexion}>J'ai déjà un compte</button>
					</div>

					<form onSubmit={handleSubmit} className={classes.right}>
						<div className={classes.inputbox}>
							<label htmlFor="username"> Nom d'utilisateur</label>
							<input type="text" name='firstName' placeholder="votre nom d'utilisateur"  required id='username' />
						</div>
						<div className={classes.inputbox}>
							<label htmlFor="lastName"> Prénom d'utilisateur</label>
							<input type="text" name='lastName' placeholder="votre nom d'utilisateur" required id='username' />
						</div>
						<div className={classes.inputbox}>
							<label htmlFor="email"> Adresse email</label>
							<input type="mail" name='email' placeholder="exempl@gmail.com"  required id='email' />
						</div>
						<div className={classes.inputbox}>
							<label htmlFor="password"> Mot de passe</label>
							<input type="password" name='password' placeholder="********"  required id='password' />
						</div>
						
						<button type='submit' className={classes.btn}>S'inscrire</button>
					</form>
				</div>
			</section>
			{showProgress && (
				<CircularProgressBar isSuccess={isSuccess} message={message} duration={2000} />
			)}
		</>
	)
}