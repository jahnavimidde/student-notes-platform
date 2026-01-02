import { useState } from "react";
import api from "../services/api";
import "../styles/Auth.css"; // reuse same card style

function UploadNote() {
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [topics, setTopics] = useState("");
  const [pdf, setPdf] = useState(null);

  const handleUpload = async () => {
    if (!pdf) {
      alert("Please select a PDF file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("course", course);
      formData.append("semester", semester);
      formData.append("topics", topics);
      formData.append("pdf", pdf);

      const token = localStorage.getItem("token");

      await api.post("/notes/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Notes uploaded successfully. Waiting for admin approval.");

      // clear form
      setSubject("");
      setCourse("");
      setSemester("");
      setTopics("");
      setPdf(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Upload Notes</h2>

        <input
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />

        <input
          placeholder="Course"
          value={course}
          onChange={e => setCourse(e.target.value)}
        />

        <input
          placeholder="Semester"
          value={semester}
          onChange={e => setSemester(e.target.value)}
        />

        <input
          placeholder="Unit-wise Topics"
          value={topics}
          onChange={e => setTopics(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={e => setPdf(e.target.files[0])}
        />

        <button className="auth-btn" onClick={handleUpload}>
          Upload Notes
        </button>
      </div>
    </div>
  );
}

export default UploadNote;
