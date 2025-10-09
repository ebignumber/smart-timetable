import { useState } from 'react';

const ClassroomForm = ({ classrooms, addClassroom, deleteClassroom, editClassroom }) => {
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
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

    setName('');
    setRoomNumber('');
  };

  const handleEdit = (c) => {
    setName(c.name);
    setRoomNumber(c.roomNumber);
    setEditingId(c.id);
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="font-bold text-lg mb-2">Manage Classrooms</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Classroom Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out">
          {editingId ? 'Update Classroom' : 'Add Classroom'}
        </button>
      </form>

      <ul className="mt-3">
        {classrooms.map(c => (
          <li key={c.id} className="flex justify-between items-center border-b py-1">
            <span>{c.name} ({c.roomNumber})</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)} className="text-blue-500 text-sm hover:underline hover:text-blue-700 transition duration-150 ease-in-out">Edit</button>
              <button onClick={() => deleteClassroom(c.id)} className="text-red-500 text-sm hover:underline hover:text-red-700 transition duration-150 ease-in-out">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomForm;
