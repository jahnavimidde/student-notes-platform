import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadNote from "./pages/UploadNote";
import NotesList from "./pages/NotesList";
import PdfViewer from "./pages/PdfViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadNote />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/view/:id" element={<PdfViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
