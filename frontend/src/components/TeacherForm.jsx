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
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="font-bold text-lg mb-2">Manage Teachers</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Teacher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="Subjects (comma separated)"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
          {editingId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>

      <ul className="mt-3">
        {teachers.map((t) => (
          <li key={t.id} className="flex justify-between items-center border-b py-1">
            <span>{t.name} — {t.subjects.join(", ")}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t)} className="text-yellow-500 text-sm">Edit</button>
              <button onClick={() => deleteTeacher(t.id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherForm;
