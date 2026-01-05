import { useEffect, useState } from "react";
import api from "../services/api";
import NoteCard from "../components/NoteCard";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes");
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Available Notes</h2>

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map(note => (
            <NoteCard key={note._id} note={note} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
