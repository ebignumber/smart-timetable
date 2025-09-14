import { useState } from "react";

const TeacherForm = ({ addTeacher, deleteTeacher, editTeacher, teachers }) => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const data = { id: editingId || Date.now(), name, subjects: subjects.split(",").map(s => s.trim()) };

    if (editingId) {
      editTeacher(editingId, data);
      setEditingId(null);
    } else {
      addTeacher(data);
    }

    setName("");
    setSubjects("");
  };

  const handleEdit = (t) => {
    setName(t.name);
    setSubjects(t.subjects.join(", "));
    setEditingId(t.id);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="mb-2 text-lg font-bold">Manage Teachers</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Teacher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Subjects (comma separated)"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <button type="submit" className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
          {editingId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>

      <ul className="mt-3">
        {teachers.map((t) => (
          <li key={t.id} className="flex items-center justify-between py-1 border-b">
            <span>{t.name} — {t.subjects.join(", ")}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t)} className="text-sm text-yellow-500 hover:text-yellow-600">Edit</button>
              <button onClick={() => deleteTeacher(t.id)} className="text-sm text-red-500 hover:text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherForm;
