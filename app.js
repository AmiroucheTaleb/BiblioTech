// Importations des modules nécessaires
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const authMiddleware = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Importation des routes
const authRoute = require("./routes/authRoute");
const bookRoute = require("./routes/bookRoute");
const empruntRoute = require("./routes/empruntRoute");
const userRoute = require("./routes/userRoute");

// Connexion à la base de données
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Initialisation de l'application
const app = express();

// Configuration des middlewares
app.use(express.json());
app.use(cors());

// Routes de l'API
app.use("/api/auth", authRoute);
app.use("/api/books", authMiddleware, bookRoute);
app.use("/api/emprunts", authMiddleware, empruntRoute);
app.use("/api/users", authMiddleware, userRoute);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

// Lancement de l'application
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
