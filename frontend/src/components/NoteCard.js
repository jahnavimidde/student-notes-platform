import { useNavigate } from "react-router-dom";
import "./NoteCard.css";

function NoteCard({ note }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleView = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/view/${note._id}`);
    }
  };

  return (
    <div className="note-card">
      <h3 className="note-course">{note.course}</h3>

      <span className="note-sem">Semester {note.semester}</span>

      <p className="note-topics">
        {note.topics.length > 120
          ? note.topics.slice(0, 120) + "..."
          : note.topics}
      </p>

      <button className="view-btn" onClick={handleView}>
        View PDF
      </button>
    </div>
  );
}

export default NoteCard;
