const db = require('./db/db')

const obtenerPost = async() => {
    try {
        const { rows } = await db.query("SELECT * FROM posts");
        //console.log(rows);
        return rows;
    } catch (error) {
        console.error("Error al obtener posts:", error);
        throw error;
    }
}

const agregarPost = async(titulo, img, descripcion, likes = 0) => {
    try {
        const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
        const values = [titulo, img, descripcion, likes];
        await db.query(consulta, values);
        console.log("Post agregado");
    } catch (error) {
        console.error("Error al agregar post:", error);
        throw error;
    }
}

const modificarPost = async (titulo, img, descripcion, likes, id) => {
    try {
        const consulta = "UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5";
        const values = [titulo, img, descripcion, likes, id];
        await db.query(consulta, values);
        console.log("Post modificado");
    } catch (error) {
        console.error("Error al modificar post:", error);
        throw error;
    }
};

const eliminarPost = async (id) => {
    try {
        const consulta = "DELETE FROM posts WHERE id = $1";
        const values = [id];
        await db.query(consulta, values);
        console.log("Post eliminado");
    } catch (error) {
        console.error("Error al eliminar post:", error);
        throw error;
    }
};




module.exports = { agregarPost, obtenerPost, eliminarPost, modificarPost }