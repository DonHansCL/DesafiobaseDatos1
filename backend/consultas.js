const db = require('./db/db')

const obtenerPost = async() => {
    const {rows} = await db.query("SELECT * FROM posts");
    console.log(rows)
    return rows
}

const agregarPost = async(titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts VALUES(DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await db.query(consulta, values)
    console.log("Post agregado")
}


module.exports = { agregarPost, obtenerPost }