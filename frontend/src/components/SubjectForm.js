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
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="font-bold text-lg mb-2">Manage Subjects</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="Class (e.g. 9A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
  <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out">Add Subject</button>
      </form>

      <ul className="mt-3">
        {subjects.map((s, index) => (
          <li key={s.name + s.className} className="flex justify-between items-center border-b py-1">
            <span>{s.name} — {s.className}</span>
            <div className="flex gap-2">
            <button
  onClick={() => {
    setName(s.name);
    setClassName(s.className);
    setEditingIndex(index);
  }}
  className="text-green-500 text-sm ml-2 hover:underline hover:text-green-700 transition duration-150 ease-in-out"
>
  Edit
</button>
            <button onClick={() => deleteSubject(s.name)} className="text-red-500 text-sm hover:underline hover:text-red-700 transition duration-150 ease-in-out">Delete</button>
          
</div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectForm;
