const Emprunt = require("../models/EmpruntModel");
const Book = require("../models/BookModel");
const User = require("../models/UserModel");

// Ajouter un emprunt
exports.addEmprunt = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookId = req.body.bookId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    if (book.quantity === 0) {
      return res.status(400).json({ message: "Le livre n'est pas disponible" });
    }

    const emprunt = new Emprunt({
      user: userId,
      book: bookId,
    });
    await emprunt.save();

    book.quantity--;
    await book.save();

    res.status(201).json({ message: "Emprunt ajouté avec succès" });
  } catch (err) {
    next(err);
  }
};

// Obtenir un emprunt spécifique
exports.getEmprunt = async (req, res, next) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id)
      .populate("user")
      .populate("book");
    if (!emprunt) {
      return res.status(404).json({ message: "Emprunt non trouvé" });
    }

    res.status(200).json(emprunt);
  } catch (err) {
    next(err);
  }
};

// Retourner un livre emprunté
exports.returnBook = async (req, res, next) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id).populate("book");
    if (!emprunt) {
      return res.status(404).json({ message: "Emprunt non trouvé" });
    }

    emprunt.returnDate = new Date();
    await emprunt.save();

    const book = emprunt.book;
    book.quantity++;
    await book.save();

    res.status(200).json({ message: "Livre retourné avec succès" });
  } catch (err) {
    next(err);
  }
};

// Obtenir tous les emprunts
exports.getEmprunts = async (req, res, next) => {
  try {
    const emprunts = await Emprunt.find().populate("user").populate("book");
    res.status(200).json(emprunts);
  } catch (err) {
    next(err);
  }
};
