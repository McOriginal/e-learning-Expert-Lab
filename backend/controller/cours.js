const Cours = require('../db/dbCours');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des fichiers vidéos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/videos'; // Dossier où seront stockées les vidéos
        // Vérifier si le dossier existe, sinon le créer
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true }); // Créer le dossier
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom unique pour chaque fichier
    }
});

// Filtrer les fichiers pour accepter uniquement les vidéos
const fileFilter = (req, file, cb) => {
    const fileTypes = /mp4|mov|avi|mkv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only video files are allowed!'));
    }
};

// Initialisation de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


exports.addCours = (req, res, next) =>{
    upload.array('videos', 10)(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const title = req.body.title;
        const detail = req.body.detail;
        const duree = req.body.duree;
        const lessons = req.body.lessons;
        const imageUrl = req.body.imageUrl;
        const videos = req.files.map(file => file.path); // Récupérer les chemins des vidéos

        const cours = new Cours({
            title,
            detail,
            duree,
            lessons,
            imageUrl,
            videos, // Ajouter les chemins des vidéos dans le document
        });
    cours.save()
    .then((result) =>{
        console.log(result);
      return  res.redirect('https://e-learning-expert-lab-frontend.onrender.com/admin/newcours');
    })
    .catch((err) =>{
        console.log(err);
    });
    });

}

exports.getCours = ((req, res, next) =>{
    Cours.find()
    .then((cours) =>{
        console.log('tous les cours:' + cours);
       return res.json(cours);
        }) 
    .catch((err) =>{
        console.log(err);
        res.status(500).json({ error: err.message });
    });
})



exports.getOnCour = ((req, res, next) =>{
    const courId = req.params.courId;
    Cours.findById(courId)
    .then((cours) =>{
        if (!cours) {
            return res.status(404).json({ message: 'Cours not found!' });
        }
        console.log("Selected Cour: " + cours);
        return res.json(cours);
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error.message });
    });
})

exports.getLatestCours = (req, res, next) => {
    console.log('Méthode getLatestCours appelée');
    Cours.find()
        .sort({ addDate: -1 })
        .limit(3)
        .then((cours) => {
            console.log('Trois derniers cours trouvés :', cours);
            return res.json(cours);
        })
        .catch((err) => {
            console.error('Erreur dans getLatestCours:', err);
            res.status(500).json({ error: err.message });
        });
};

exports.updateCours = (req, res, next) => {
    const courId = req.params.courId;
    const updatedData = {
        title: req.body.title,
        detail: req.body.detail,
        duree: req.body.duree,
        lessons: req.body.lessons,
        imageUrl: req.body.imageUrl,
        videos: req.body.videos // Assurez-vous de gérer les vidéos si nécessaire
    };

    Cours.findByIdAndUpdate(courId, updatedData, { new: true })
        .then((cours) => {
            if (!cours) {
                return res.status(404).json({ message: 'Cours not found!' });
            }
            
            return res.json(cours);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error.message });
        });
};

exports.deleteCours = (req, res, next) => {
    const courId = req.params.courId;

    Cours.findByIdAndDelete(courId)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Cours not found!' });
            }
            return res.status(200).json({ message: 'Cours deleted successfully!' });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error.message });
        });
};