import express from "express";
import { Article, User } from "../database/squema.js";
import {
  uploadImage,
  deleteImage,
  updateImage,
} from "../database/cloudinary.js";

const Router = express.Router();

// Obtener todos los artículos
export const getArticles = Router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
});

export const postArticles = Router.post("/articles", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    // Verifica si se ha enviado una imagen
    const article = new Article({ title, content, author });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      article.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    // Crea el artículo con la URL de la imagen

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el artículo" });
  }
});

// Obtener un artículo por su ID
export const getArticlesId = Router.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el artículo" });
  }
});

// Actualizar un artículo por su ID
export const putArticles = Router.put("/articles/:id", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Verifica si se ha enviado una imagen
    let article = await Article.findById(req.params.id);
    if (req.files?.image) {
      if (article?.image?.public_id) {
        await updateImage(
          article.image.public_id,
          req.files.image.tempFilePath
        );
      } else {
        const result = await uploadImage(req.files.image.tempFilePath);
        article.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
    }

    article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el artículo" });
  }
});

//delete articles by id
export const deleteArticles = Router.delete(
  "/articles/:id",
  async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (article?.image?.public_id) {
        await deleteImage(article.image.public_id);
      }

      if (article) {
        res.json({ message: "Artículo eliminado correctamente" });
      } else {
        res.status(404).json({ error: "Artículo no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el artículo" });
    }
  }
);

//Obtener Usuarios
export const getUsers = Router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

//Create a User
export const postUser = Router.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});


