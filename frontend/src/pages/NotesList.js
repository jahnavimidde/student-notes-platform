import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Auth.css";

function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotes(res.data);
      } catch (err) {
        alert("Failed to load notes");
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="auth-container">
      <div style={{ width: "90%", maxWidth: "900px" }}>
        <h2>Available Notes</h2>

        {notes.map(note => (
          <div className="auth-box" key={note._id} style={{ marginBottom: "20px" }}>
            <h3>{note.subject}</h3>
            <p><b>Course:</b> {note.course}</p>
            <p><b>Semester:</b> {note.semester}</p>
            <p><b>Topics:</b> {note.topics}</p>

            <a href={`/view/${note._id}`} className="auth-btn">
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
