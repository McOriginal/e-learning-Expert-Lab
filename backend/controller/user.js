const User = require('../db/dbUsers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Commentaire = require('../db/dbCommentaire');
const UserMessage = require('../db/dbUserMessage');

// Ajout de la clé secrète JWT
const JWT_SECRET = 'votre_clé_secrète_très_sécurisée';




exports.createUser = (req, res, next) => {
    const { firstName, lastName, email, password} = req.body;

    // Vérification de tous les champs requis
    if (!firstName || !lastName || !email || !password ) {
        return res.status(400).json({
            message: "Tous les champs sont obligatoires"
        });
    }

    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log(emailRegex.test(email));
        return res.status(400).json({
            message: "Format d'email invalide"
        });
    }

    // Vérification du mot de passe (au moins 8 caractères)
    if (password.length < 3) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 3 caractères"
        });
    }

    

    // Vérification si l'utilisateur existe déjà
    User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({
                    message: "Un utilisateur avec cet email existe déjà"
                });
            }

            // Cryptage du mot de passe
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Erreur lors du cryptage du mot de passe",
                        error: err
                    });
                }

                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                });

                newUser.save()
                    .then(result => {
                        console.log(result);
                       return res.redirect('https://e-learning-expert-lab-frontend.onrender.com/login');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: "Erreur lors de la création de l'utilisateur",
                            error: err
                        });
                    });
            });

           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Erreur lors de la vérification de l'email",
                error: err
            });
        });
};


// Middleware pour la connexion de l'utilisateur
exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;

    // Vérification si l'email et le mot de passe sont fournis
    if (!email || !password) {
        return res.status(400).json({
            message: "L'email et le mot de passe sont requis"
        });
    }

    // Recherche de l'utilisateur dans la base de données
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Authentification échouée" });
            }

            // Comparaison du mot de passe
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Erreur lors de la vérification du mot de passe",
                        error: err
                    });
                }
                if (result) {
                    // Création du token JWT
                    const token = jwt.sign(
                        { userId: user._id, email: user.email },
                        JWT_SECRET,  // Utilisation de la clé secrète définie
                        { expiresIn: '7d' }
                    );

                    
                    // Envoi du token dans un cookie httpOnly
                    res.cookie('token', token, {
                        httpOnly: true,
                        // secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
                    });

                    return res.status(200).json({
                        message: "Authentification réussie",
                        userId: user._id,
                        isAuthenticated: true,
                        // Ajoutez d'autres informations utiles si nécessaire
                    });
                } else {
                    return res.status(401).json({ message: "Authentification échouée" });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Erreur lors de la recherche de l'utilisateur",
                error: err
            });
        });
};

// Nouvelle fonction pour vérifier l'authentification
exports.checkAuth = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {  // Utilisation de la clé secrète définie
        if (err) {
            return res.status(401).json({ isAuthenticated: false });
        }
        
        res.status(200).json({ isAuthenticated: true, userId: decoded.userId });
    });
};




// Mise à jour de la fonction de déconnexion
exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Déconnexion réussie", isAuthenticated: false });
};




exports.ajouterCommentaire = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Non autorisé" });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token invalide" });
      }
  
      const nouveauCommentaire = new Commentaire({
        user: decoded.userId,
        contenu: req.body.contenu
      });
  
      nouveauCommentaire.save()
        .then(commentaire => res.status(201).json(commentaire))
        .catch(error => res.status(400).json({ error }));
    });
  };
  
  exports.getCommentaires = (req, res) => {
    Commentaire.find().populate('user', 'firstName lastName')
      .then(commentaires => res.status(200).json(commentaires))
      .catch(error => res.status(400).json({ error }));
  };

// Nouvelle fonction pour envoyer un message utilisateur
exports.envoyerMessage = (req, res) => {
    const { nom, email, telephone, message } = req.body;

    if (!nom || !email || !telephone || !message) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const nouveauMessage = new UserMessage({
        nom,
        email,
        telephone,
        message
    });

    nouveauMessage.save()
        .then(message => res.status(201).json({ message: "Message envoyé avec succès" }))
        .catch(error => res.status(500).json({ error }));
};

// Nouvelle fonction pour obtenir les messages utilisateur
exports.obtenirMessages = (req, res) => {
    UserMessage.find().sort({ dateEnvoi: -1 })
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(500).json({ error }));
};

// Nouvelle méthode pour la connexion admin
exports.loginAdmin = (req, res) => {

    const { email, password } = req.body;

    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: "Authentification admin échouée" });
        }

       // Vérification des identifiants admin
    if (email === 'admi@gmail.com' && password === 'admin123') {
        const token = jwt.sign(
            { userId: 'admin', email: email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
        });

        
        res.status(200).json({
            message: "Connexion admin réussie",
            userId: 'admin',
            isAuthenticated: true,
        });
        
        return res.redirect('https://e-learning-expert-lab-frontend.onrender.com/admin/admincours');

            } else {
                return res.status(401).json({ message: "Authentification échouée" });
            }
        });
    
    
};