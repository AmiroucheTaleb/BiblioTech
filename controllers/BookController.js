const Book = require("../models/BookModel");

// Fonction pour ajouter un livre
const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Livre ajouté avec succès !", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout du livre" });
  }
};

// Fonction pour obtenir les détails d'un livre
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }
    res.status(200).json({ book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération du livre" });
  }
};

// Fonction pour obtenir la liste des livres
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "Erreur serveur lors de la récupération de la liste des livres",
      });
  }
};

// Fonction pour mettre à jour les détails d'un livre
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }
    res.status(200).json({ message: "Livre mis à jour avec succès !", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du livre" });
  }
};

// Fonction pour supprimer un livre
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }
    res.status(200).json({ message: "Livre supprimé avec succès !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression du livre" });
  }
};

module.exports = {
  addBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
};
