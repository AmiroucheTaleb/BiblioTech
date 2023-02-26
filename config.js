require("dotenv").config(); // Chargement des variables d'environnement

module.exports = {
  PORT: process.env.PORT || 3000, // Port d'écoute du serveur
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/bibliotech", // URI de la base de données MongoDB
  JWT_SECRET: process.env.JWT_SECRET || "secret", // Secret utilisé pour signer les tokens JWT
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h", // Durée de validité des tokens JWT
};
