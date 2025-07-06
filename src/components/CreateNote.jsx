import { useState } from "react";
import toast from "react-hot-toast";

function CreateNote({ onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setConten] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, category }),
      });

      if (!response.ok) throw new Error("Error al crear la nota");

      {
        /*si todo va bien */
      }
      const newNote = await response.json();
      onNoteCreated(newNote); //actualizamos la lista en home
      setTitle("");
      setConten("");
      setCategory("");
      toast.success("✅ Nota creada con éxito ");
    } catch (error) {
      console.log("Error al crear la nota: ", error);
      toast.error("❌ Error al crear la nota");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-6"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">Crear nueva nota</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          {" "}
          Titulo:{" "}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Contenido:
        </label>
        <textarea
          value={content}
          onChange={(e) => setConten(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
          placeholder="Escribe aquí el contenido de tu nota..."
        ></textarea>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Categoría:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="estudios">Estudios</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
      >
        Crear
      </button>
    </form>
  );
}

export default CreateNote;
