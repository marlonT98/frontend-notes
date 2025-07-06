import { useEffect, useState } from "react";
import { NoteService } from "../services/NoteService";
import NoteList from "../components/NoteList";
import CreateNote from "../components/CreateNote";
import toast from "react-hot-toast";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todas");

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const data = await NoteService.getActiveNotes();
      setNotes(data);
    } catch (error) {
      console.log("Error al obtener notas activas ", error);
    }
  };

  //archivar
  const handleArchive = async (id) => {
    try {
      await NoteService.archiveNote(id);
      //cargamos las notas no archivadas
      fetchNotas();
      toast.success("📦 Nota archivada");
    } catch (error) {
      console.log("Error al archivar la nota ", error);
      toast.error("❌ Error al archivar la nota");
    }
  };

  //eliminar
  const handleDelete = async (id) => {
    try {
      await NoteService.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("🗑️ Nota eliminada");
    } catch (error) {
      console.log("Error al eliminar la nota: ", error);
      toast.error("❌ Error al eliminar la nota");
    }
  };

  const handleNoteCreated = (newNote) => {
    //agregamos una nota mas
    setNotes([...notes, newNote]);
  };

  //***********aplicamos filtro a las notas mostradas*****
  const filteredNotes =
    selectedCategory === "todas"
      ? notes
      : notes.filter((note) => (note.category || "otros") === selectedCategory);

  //******************************************* */

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Formulario de nota */}
      <div className="lg:w-1/3 w-full">
        <CreateNote onNoteCreated={handleNoteCreated} />
      </div>

      {/* Lista de notas */}
      <div className="lg:w-2/3 w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Notas Activas
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
          onArchive={handleArchive}
        />
      </div>
    </div>
  );
}

export default Home;
