import React, { useState, useEffect } from 'react';
import classes from './OurClients.module.css';
import { FaQuoteRight } from "react-icons/fa";
import user from './../../images/user.jpg';
import Commentaire from '../../UserForm/Commentaire';

export default function OurClients() {
	const [commentaires, setCommentaires] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetchCommentaires();
	}, []);

	const fetchCommentaires = async () => {
		try {
			const response = await fetch('http://localhost:5000/commentaires');
			const data = await response.json();
			setCommentaires(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des commentaires:", error);
		}
	};

	const handleSubmitCommentaire = async (contenu) => {
		try {
			const response = await fetch('http://localhost:5000/commentaire', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ contenu }),
				credentials: 'include'
			});
			if (response.ok) {
				fetchCommentaires();
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout du commentaire:", error);
		}
	};

	return (
		<>
			<div className={classes.container}>
				<h1>Que disent nos clients</h1>
				<button className={classes.btn} onClick={() => setShowForm(true)}>Ajouter un commentaire</button>
				<div className={classes.box}>
					{commentaires.map((commentaire, index) => (
						<div key={index} className={classes.card}>
							<div className={classes.contente}>
								<div className={classes.box_img}>
									<img src={user} alt="icon" />
								</div>
								<div className={classes.user_info}>
									<h4>{`${commentaire.user.firstName} ${commentaire.user.lastName}`}</h4>
									<p>{new Date(commentaire.dateCreation).toLocaleDateString()}</p>
								</div>
								<FaQuoteRight className={classes.quatte} />
							</div>
							<p className={classes.comments}>{commentaire.contenu}</p>
						</div>
					))}
				</div>
			</div>
			{showForm && (
				<Commentaire
					onClose={() => setShowForm(false)}
					onSubmit={handleSubmitCommentaire}
				/>
			)}
		</>
	);
}
