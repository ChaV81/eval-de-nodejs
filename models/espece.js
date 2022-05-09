const mongoose = require('mongoose')

const especeSchema = mongoose.Schema({
  // Ajoutez vos propriétés ici
  nom: { type: String, required: true },
  logo: { type: String, required: true }
})

module.exports = mongoose.model('Espece', especeSchema)