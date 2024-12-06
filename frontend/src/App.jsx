import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null); // Estado para editar

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(`${urlBaseServer}/posts`);
      setPosts([...posts]);
    } catch (error) {
      console.error("Error al obtener posts:", error);
    }
  };

  const agregarPost = async () => {
    try {
      const post = { titulo, img: imgSrc, descripcion };
      await axios.post(`${urlBaseServer}/posts`, post);
      getPosts();
      // Resetear los campos del formulario
      setTitulo("");
      setImgSRC("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al agregar post:", error);
    }
  };

// este método edita un post
  const actualizarPost = async () => {
    try {
      const updatedPost = {
        titulo,
        img: imgSrc,
        descripcion,
        likes: editPost.likes,
      };
      await axios.put(`${urlBaseServer}/posts/${editPost.id}`, updatedPost);
      getPosts();
      // Resetear el estado de edición
      setEditPost(null);
      setTitulo("");
      setImgSRC("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al actualizar post:", error);
    }
  };  

  const handleSubmit = () => {
    if (editPost) {
      actualizarPost();
    } else {
      agregarPost();
    }
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    try {
      const post = posts.find((p) => p.id === id);
      if (!post) return;
      const updatedLikes = post.likes + 1;
      await axios.put(`${urlBaseServer}/posts/${id}`, {
        titulo: post.titulo,
        img: post.img,
        descripcion: post.descripcion,
        likes: updatedLikes,
      });
      getPosts();
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    try {
      await axios.delete(`${urlBaseServer}/posts/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  const iniciarEdicion = (post) => {
    setEditPost(post);
    setTitulo(post.titulo);
    setImgSRC(post.img);
    setDescripcion(post.descripcion);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            titulo={titulo}
            setTitulo={setTitulo}
            imgSrc={imgSrc}
            setImgSRC={setImgSRC}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            handleSubmit={handleSubmit}
            isEditing={!!editPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
              iniciarEdicion={iniciarEdicion} // Pasar la función de edición
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
