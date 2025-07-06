function NoteList({ notes, onArchive, onDelete, archiveLabel = "archivar" }) {
  if (!notes || notes.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No hay notas para mostrar
      </p>
    );
  }

  const getCategoryStyle = (category) => {
    switch (category) {
      case "personal":
        return "bg-purple-200 text-purple-800";
      case "trabajo":
        return "bg-green-200 text-green-800";
      case "estudios":
        return "bg-yellow-200 text-yellow-800";
      case "otros":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {notes.map((note) => (
        <li
          key={note.id}
          className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow flex flex-col justify-between h-60"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold text-gray-800">{note.title}</h4>
            <span
              className={`text-sm px-2 py-1 rounded-full font-medium ${getCategoryStyle(
                note.category || "otros"
              )}`}
            >
              {note.category || "otros"}
            </span>
          </div>

          <div className="flex-grow">
            <p className="text-gray-700 text-sm">{note.content}</p>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            {onArchive && (
              <button
                onClick={() => onArchive(note.id)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                {archiveLabel}
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Eliminar
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
