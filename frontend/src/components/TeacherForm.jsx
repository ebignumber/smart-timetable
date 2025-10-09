import { useState } from "react";
import FormField from "./FormField";
import ErrorMessage from "./ErrorMessage";

const TeacherForm = ({ addTeacher, deleteTeacher, editTeacher, teachers }) => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Teacher name is required";
    } else if (name.length < 2) {
      newErrors.name = "Teacher name must be at least 2 characters";
    }
    
    // Check for duplicate names (excluding current editing teacher)
    const existingTeacher = teachers.find(t => 
      t.name.toLowerCase() === name.toLowerCase() && t.id !== editingId
    );
    if (existingTeacher) {
      newErrors.name = "A teacher with this name already exists";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    if (field === 'name') {
      setName(value);
    } else if (field === 'subjects') {
      setSubjects(value);
    }
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    
    // Clear general error message
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous error message
    setErrorMessage("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      const data = { 
        id: editingId || Date.now(), 
        name: name.trim(), 
        subjects: subjects.split(",").map(s => s.trim()).filter(s => s.length > 0) 
      };

      if (editingId) {
        editTeacher(editingId, data);
        setEditingId(null);
      } else {
        addTeacher(data);
      }

      setName("");
      setSubjects("");
      setErrors({});
    } catch (err) {
      setErrorMessage("Failed to save teacher. Please try again.");
    }
  };

  const handleEdit = (t) => {
    setName(t.name);
    setSubjects(t.subjects.join(", "));
    setEditingId(t.id);
    setErrors({});
    setErrorMessage("");
  };

  const handleCancel = () => {
    setName("");
    setSubjects("");
    setEditingId(null);
    setErrors({});
    setErrorMessage("");
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="font-bold text-lg mb-2">Manage Teachers</h2>
      
      {errorMessage && (
        <ErrorMessage 
          message={errorMessage} 
          type="error" 
          className="mb-4"
          onClose={() => setErrorMessage("")}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Teacher Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter teacher name"
          error={errors.name}
          required
        />
        
        <FormField
          label="Subjects"
          type="text"
          name="subjects"
          value={subjects}
          onChange={(e) => handleChange('subjects', e.target.value)}
          placeholder="Math, Science, English (comma separated)"
          error={errors.subjects}
        />
        
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out flex-1"
          >
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>
          
          {editingId && (
            <button 
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:shadow-md transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="mt-3">
        {teachers.map((t) => (
          <li key={t.id} className="flex justify-between items-center border-b py-1">
            <span>{t.name} — {t.subjects.join(", ")}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t)} className="text-yellow-500 text-sm hover:underline hover:text-yellow-700 transition duration-150 ease-in-out">Edit</button>
              <button onClick={() => deleteTeacher(t.id)} className="text-red-500 text-sm hover:underline hover:text-red-700 transition duration-150 ease-in-out">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherForm;
