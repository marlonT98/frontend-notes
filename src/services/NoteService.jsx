const API_BASE_URL = "https://backend-notes-by0u.onrender.com/api/notes";

export const NoteService = {
  getActiveNotes: async () => {
    const response = await fetch(`${API_BASE_URL}/active`);
    if (!response.ok) throw new Error("Error al obtener notas activas");
    return await response.json();
  },
  getArchivedNotes: async () => {
    const response = await fetch(`${API_BASE_URL}/archived`);
    if (!response.ok) throw new Error("Error al obtener notas archivadas");
    return await response.json();
  },
  archiveNote: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle-archive`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Error al archivar la nota");
    return;
  },

  deleteNote: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la nota");
    }
  },

  toggleArchive: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle-archive`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Error al archivar/desarchivar la nota");
    return;
  },
};
