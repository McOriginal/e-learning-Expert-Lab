const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const commentaireController = require('../controller/user');

// Route pour créer un nouvel utilisateur
router.post('/signup', userController.createUser);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.loginUser);

// Route pour la déconnexion
router.post('/logout', userController.logoutUser);

// Nouvelle route pour vérifier l'authentification
router.get('/check-auth', userController.checkAuth);

// Route pour ajouter un commentaire
router.post('/commentaire', commentaireController.ajouterCommentaire);

// Route pour récupérer tous les commsentaires
router.get('/commentaires', commentaireController.getCommentaires);

// Route pour envoyer un message utilisateur
router.post('/user/message', userController.envoyerMessage);

// Route pour obtenir tous les messages utilisateur (protégée, uniquement pour les administrateurs)
router.get('/user/messages', /* middleware d'authentification admin */ userController.obtenirMessages);

// Nouvelle route pour la connexion admin
router.post('/admin/login', userController.loginAdmin);

module.exports = router;

