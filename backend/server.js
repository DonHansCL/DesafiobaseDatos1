require('dotenv').config()
const { obtenerPost, agregarPost, modificarPost, eliminarPost } = require('./consultas')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const app = express()

// Middleware de logging (opcional)
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}))
app.use(express.json())


app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPost();
        res.json(posts);
      } catch (error) {
        console.error("Error al obtener posts:", error);
        res.status(500).json({ mensaje: "Error al obtener posts" });
      }
    })

app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body;
        await agregarPost(titulo, img, descripcion);
        res.status(201).send("Post agregado con éxito");
    } catch (error) {
        console.error("Error al agregar post:", error);
        res.status(500).json({ mensaje: "Error al agregar post" });
    }
})

app.put("/posts/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, img, descripcion, likes} = req.body;
        if (titulo === undefined || img === undefined || descripcion === undefined || likes === undefined) {
            return res.status(400).json({ mensaje: "Faltan campos para actualizar el post" });
        }
        await modificarPost(titulo, img, descripcion, likes, id);
        res.send("Post modificado con éxito");      
    } catch (error) {
        console.error("Error al modificar post:", error);
        res.status(500).json({ mensaje: "Error al modificar post" });
    }
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.send("Post eliminado con éxito");
    } catch (error) {
        console.error("Error al eliminar post:", error);
        res.status(500).json({ mensaje: "Error al eliminar post" });
    }
});



const port = process.env.PORT || 3000  // se pone el || 3000 en caso que no tome el puerto del .env
app.listen(port, () => {
    console.log(`el servidor está corriendo en el puerto ${port}`)
})