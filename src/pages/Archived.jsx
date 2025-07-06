import { useEffect, useState } from "react";
import { NoteService } from "../services/NoteService";
import NoteList from "../components/NoteList";
import toast from "react-hot-toast";

function Archived() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todas");

  useEffect(() => {
    NoteService.getArchivedNotes()
      .then(setNotes)
      .catch((error) =>
        console.error("Error al cargar notas archivadas ", error)
      );
  }, []);

  const handleDelete = async (id) => {
    try {
      await NoteService.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("🗑️ Nota eliminada");
    } catch (error) {
      console.error("Error al eliminar la nota", error);
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await NoteService.toggleArchive(id);
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("📤 Nota desarchivada");
    } catch (error) {
      console.error("Error al desarchivar la nota", error);
    }
  };

  //*++++++++++++++++++++++++++++++++++++++++++++++++
  //filtramos las notas archivadas
  const filteredNotes =
    selectedCategory === "todas"
      ? notes
      : notes.filter((note) => (note.category || "otros") === selectedCategory);

  //*++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Notas archivadas
      </h2>
      <div className="my-4 text-center">
        <label className="mr-2 font-medium text-gray-700">
          Filtrar por categoría:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="todas">Todas</option>
          <option value="trabajo">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="estudios">Estudios</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleUnarchive}
        archiveLabel="Desarchivar"
        variant="archived"
      />
    </div>
  );
}

export default Archived;
