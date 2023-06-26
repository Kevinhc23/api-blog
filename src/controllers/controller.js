import express from "express";
import { Article } from "../database/squema.js";
import { uploadImage, deleteImage } from "../database/cloudinary.js";


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



export const postArticles = Router.post('/articles', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    // Verifica si se ha enviado una imagen
    const article = new Article({ title, content, author });

    if (req.files?.image) {
       const result = await uploadImage(req.files.image.tempFilePath);
       article.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
       }
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
export const putArticles =Router.put("/articles/:id", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const article = await Article.findByIdAndUpdate(
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




export const deleteArticles = Router.delete("/articles/:id", async (req, res) => {
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
});



/*
// Eliminar un artículo por su ID
export const deleteArticles = Router.delete("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (article) {
      res.json({ message: "Artículo eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el artículo" });
  }
});
*/