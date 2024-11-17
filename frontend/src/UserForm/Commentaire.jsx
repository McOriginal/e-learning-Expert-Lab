import React, { useState, useEffect } from 'react';
import classes from './Commentaire.module.css';

const Commentaire = ({ onClose, onSubmit }) => {
  const [commentaire, setCommentaire] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentaire);
    setCommentaire('');
    onClose();
  };

  const loader = async () => {
    setIsLoading(true);
    try {
      // Simulons une opération asynchrone, comme le chargement de données
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Ici, vous pourriez charger des données initiales si nécessaire
      // Par exemple : const data = await fetch('/api/commentaires');
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loader();
  }, []);

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h2>Ajouter un commentaire</h2>
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              placeholder="Votre commentaire..."
              required
            />
            <div className={classes.buttons}>
              <button type="submit">Envoyer</button>
              <button type="button" onClick={onClose}>Annuler</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Commentaire;
