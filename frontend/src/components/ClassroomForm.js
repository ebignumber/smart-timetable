import { useState } from "react";

const ClassroomForm = ({ classrooms, addClassroom, deleteClassroom, editClassroom }) => {
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const data = { id: editingId || Date.now(), name, roomNumber };

    if (editingId) {
      editClassroom(editingId, data);
      setEditingId(null);
    } else {
      addClassroom(data);
    }

    setName("");
    setRoomNumber("");
  };

  const handleEdit = (c) => {
    setName(c.name);
    setRoomNumber(c.roomNumber);
    setEditingId(c.id);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="mb-2 text-lg font-bold">Manage Classrooms</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Classroom Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <button type="submit" className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
          {editingId ? "Update Classroom" : "Add Classroom"}
        </button>
      </form>

      <ul className="mt-3">
        {classrooms.map(c => (
          <li key={c.id} className="flex items-center justify-between py-1 border-b">
            <span>{c.name} ({c.roomNumber})</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)} className="text-sm text-blue-500 hover:text-blue-600">Edit</button>
              <button onClick={() => deleteClassroom(c.id)} className="text-sm text-red-500 hover:text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomForm;
