// NE MODIFIEZ PAS CETTE PARTIE
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const app = express();

// IMPORT DES MODELES ICI
const Espece = require('./models/espece');
const Animal = require('./models/animal');

  const upload = multer({
    dest: "./temp"
  })

// Connexion à Mongo
// ATTENTION, VEUILLEZ REMPLACER LE 30 APRES 'animaux'  PAR VOTRE NUMERO 
// PAR EX : SI VOUS AVEZ LE NUMERO 5, l'URL SERA : 'mongodb+srv://esn:castres81@cluster0.7vtsq.mongodb.net/animaux5?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://esn:castres81@cluster0.7vtsq.mongodb.net/animaux10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour autoriser les connexions
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(
  express.urlencoded({
      extended: true
  })
)
app.use(express.json());


// Entrées d'API
//visualiser toutes les especes
app.get('/api/especes', (req, res, next) =>
{
  Espece.find()
    .then(especes =>
    res.status(200).json(especes))
    .catch(error => res.status(400).json({
    error
  }));
})

//Création d'une espece
app.post('/api/especes', (req, res, next) =>
{
  const espece = new Espece({
  ...req.body
});
  espece.save().then(() =>
  res.status(201).json({
  message: 'Espèce crée avec succès !'
}))
  .catch(error => res.status(400).json({error}))
});

//Visualiser les animaux d'une espèce en particulier
app.get('/api/especes/:espId/animals', (req, res, next) =>
{
  Animal.find({especeId: req.params.espId })
    .then(animals =>
    res.status(200).json(animals))
    .catch(error => res.status(400).json({
    error
  }));

})

//Visualiser une cat en particulier
app.get('/api/especes/:espId', (req, res, next) =>
{
  Espece.findOne({_id: req.params.espId })
    .then(especes =>
    res.status(200).json(especes))
    .catch(error => res.status(400).json({
    error
  }));
})

//Création d'un animal
app.post('/api/animals', (req, res, next) =>
{
  const animal = new Animal({
  ...req.body
});
  animal.save().then(() =>
  res.status(201).json({
  message: 'Animal créé avec succès !'
}))
  .catch(error => res.status(400).json({error}))
});

//Ajouter un animal en favoris
app.put('/api/animals/:animalId/favoris', (req, res, next) => {
  Animal.updateOne({
    _id: req.params.animalId
  }, {
    estFavoris : true
  })
  .then(() => res.status(200).json({
     message: 'L\'animal à bien été ajouté aux favoris'
  }))
  .catch(error => res.status(400).json({
    error
  }));
});

//Visualiser la liste des favoris
app.get('/api/animals/favoris', (req, res, next) =>
{
  Animal.find({estFavoris: true})
    .then(animals =>
    res.status(200).json(animals))
    .catch(error => res.status(400).json({
    error
  }));

})

//Uploader une image
app.post("/api/upload", upload.single("file"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "./storage/image.png");
  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, err => {
      res
      .status(200)
      .contentType("text/plain")
      .end("File uploaded!");
    });
  } else {
    res.status(403)
  }
});



// Export du module
module.exports = app;
