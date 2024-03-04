import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  //new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNesMovieOscar] = useState(false);
  //update title state
  const [updatedTitle, setUpdateTitle] = useState("");

  const moviesColection = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesColection);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovieList(filteredData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesColection, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (e) {
      console.error(e);
    }
    getMovieList();
  };

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
    } catch (e) {
      console.error(e);
    }
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {
        title: updatedTitle,
      });
    } catch (e) {
      console.error(e);
    }
    getMovieList();
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Movie title..."
          type="text "
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNesMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input
              placeholder="new title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
