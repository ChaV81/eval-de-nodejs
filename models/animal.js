const mongoose = require('mongoose')
const Schema = mongoose.Schema
const animalSchema = mongoose.Schema({
  // Ajoutez vos propriétés ici
  nom: { type: String, required: true },
  especeId: { type: Schema.Types.ObjectId, required: true },
  anneeNaissance: { type: Number, required: true },
  race: { type: String, required: true },
  couleur: { type: String, required: true },
  caractere: { type: String, required: true },
  photo: { type: String, required: true },
  estFavoris: { type: Boolean, required: false, default:false }
})

module.exports = mongoose.model('Animal', animalSchema)