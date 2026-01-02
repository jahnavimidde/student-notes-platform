import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function PdfViewer() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPdfUrl(res.data.pdfUrl);
      } catch {
        alert("Unable to load PDF");
      }
    };

    fetchPdf();
  }, [id]);

  return (
    <div style={{ height: "100vh" }}>
     {pdfUrl && (
      <iframe
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    )}
    </div>
  );
}

export default PdfViewer;
