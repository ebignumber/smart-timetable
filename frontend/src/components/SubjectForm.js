import { useState } from "react";

const SubjectForm = ({ subjects, addSubject, deleteSubject, editSubject, classes, addClass }) => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !className) return;

    if (editingIndex !== null) {
  editSubject(editingIndex, { name, className });
  setEditingIndex(null);
} else {
  addSubject({ name, className });
}
    addClass(className); // ensure class exists in timetable
    setName("");
    setClassName("");
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="mb-2 text-lg font-bold">Manage Subjects</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Class (e.g. 9A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="px-2 py-1 border rounded"
          required
        />
        <button type="submit" className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Add Subject</button>
      </form>

      <ul className="mt-3">
        {subjects.map((s, index) => (
          <li key={s.name + s.className} className="flex items-center justify-between py-1 border-b">
            <span>{s.name} — {s.className}</span>
            <div className="flex gap-2">
            <button
  onClick={() => {
    setName(s.name);
    setClassName(s.className);
    setEditingIndex(index);
  }}
  className="ml-2 text-sm text-green-500 hover:text-green-600"
>
  Edit
</button>
            <button onClick={() => deleteSubject(s.name)} className="text-sm text-red-500 hover:text-red-600">Delete</button>
          
</div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectForm;
