// src/components/TimetableMain.js
import { useState, useEffect } from 'react';
import ClassroomForm from './ClassroomForm';
import TeacherForm from './TeacherForm';
import SubjectForm from './SubjectForm';
import PeriodSettings from './PeriodSettings';
import TimetableGrid from './TimetableGrid';
import TimetableViews from './TimetableViews';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import SearchInput from './SearchInput';

function TimetableMain() {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  const [periodTimings, setPeriodTimings] = useState({
    Assembly: '08:00 - 08:20',
    'Period 1': '08:20 - 09:00',
    'Period 2': '09:00 - 09:40',
    'Period 3': '09:40 - 10:20',
    'Period 4': '10:20 - 11:00',
    'Period 5': '11:00 - 11:40',
    Recess: '11:40 - 12:00',
    'Period 6': '12:00 - 12:40',
    'Period 7': '12:40 - 01:20',
    'Period 8': '01:20 - 02:00',
  });

  const [timetable, setTimetable] = useState({});
  const token = localStorage.getItem('token'); // JWT token
  const [saveStatus, setSaveStatus] = useState('');
  const [timetableList, setTimetableList] = useState([]); // saved timetables summaries
  const [selectedTimetableId, setSelectedTimetableId] = useState(null);
  const [selectedTimetableName, setSelectedTimetableName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter timetables based on search query
  const filteredTimetables = timetableList.filter(timetable => timetable.name.toLowerCase().includes(searchQuery.toLowerCase())
    || new Date(timetable.updatedAt).toLocaleDateString().includes(searchQuery));

  // Fetch list of timetables (summaries)
  const fetchTimetableList = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/timetables', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = await res.json();
      if (res.ok) {
        setTimetableList(list);
      } else {
        setErrorMessage('Failed to load timetables. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching timetable list:', err);
      setErrorMessage('Unable to connect to server. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableList();
  }, [token]);

  // Load a specific timetable by id
  const loadTimetable = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:5000/api/timetables/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedTimetableId(data._id);
        setSelectedTimetableName(data.name || '');
        setClassrooms(data.classrooms || []);
        setTeachers(data.teachers || []);
        setSubjects(data.subjects || []);
        setClasses(data.classes || []);

        // Initialize timetable safely with filled structure
        const filledTimetable = {};
        for (const className of (data.classes || [])) {
          filledTimetable[className] = {};
          for (const slot of Object.keys(periodTimings)) {
            filledTimetable[className][slot] = {};
            for (const day of daysOfWeek) {
              filledTimetable[className][slot][day] = data.timetableData?.[className]?.[slot]?.[day] || {};
            }
          }
        }
        setTimetable(filledTimetable);
      } else {
        console.error('Failed to load timetable:', data);
      }
    } catch (err) {
      console.error('Error loading timetable:', err);
    }
  };

  // Create a new timetable (user provides a name)
  const createTimetable = async (name) => {
    if (!name) name = `Untitled ${new Date().toLocaleString()}`;
    try {
      const res = await fetch('http://localhost:5000/api/timetables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          timetableData: {},
          classrooms: [],
          teachers: [],
          subjects: [],
          classes: [],
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchTimetableList();
        // auto-select new timetable
        setSelectedTimetableId(data._id);
        setSelectedTimetableName(data.name);
        // initialize local structures
        setClassrooms([]);
        setTeachers([]);
        setSubjects([]);
        setClasses([]);
        setTimetable({});
      } else {
        console.error('Create timetable failed:', data);
      }
    } catch (err) {
      console.error('Error creating timetable:', err);
    }
  };

  // Delete timetable
  const deleteTimetable = async (id) => {
    if (!id) return;
    if (!window.confirm('Delete this timetable? This cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/timetables/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchTimetableList();
        if (id === selectedTimetableId) {
          setSelectedTimetableId(null);
          setSelectedTimetableName('');
          setTimetable({});
          setClassrooms([]);
          setTeachers([]);
          setSubjects([]);
          setClasses([]);
        }
      } else {
        const data = await res.json();
        console.error('Delete failed:', data);
      }
    } catch (err) {
      console.error('Error deleting timetable:', err);
    }
  };

  // Persist (save) selected timetable (PUT)
  const persistTimetable = async () => {
    if (!selectedTimetableId) return; // nothing to update
    try {
      const res = await fetch(`http://localhost:5000/api/timetables/${selectedTimetableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedTimetableName,
          timetableData: timetable,
          classrooms,
          teachers,
          subjects,
          classes,
        }),
      });
      return res;
    } catch (err) {
      console.error('Error persisting timetable:', err);
      throw err;
    }
  };

  // Auto-save when selected timetable exists
  useEffect(() => {
    if (!selectedTimetableId) return;
    const id = selectedTimetableId;
    const timer = setTimeout(async () => {
      try {
        await persistTimetable();
      } catch (err) {
        /* swallow: already logged */
      }
    }, 800); // short debounce to avoid too many requests
    return () => clearTimeout(timer);
  }, [timetable, classrooms, teachers, subjects, classes, selectedTimetableId]);

  // ---- Existing methods for adding/editing classrooms, teachers, subjects, classes, timetable cells ----

  const addClassroom = (data) => setClassrooms([...classrooms, data]);
  const deleteClassroom = (id) => setClassrooms(classrooms.filter((c) => c.id !== id));
  const editClassroom = (id, updated) => setClassrooms(classrooms.map((c) => (c.id === id ? updated : c)));

  const addTeacher = (data) => setTeachers([...teachers, data]);
  const deleteTeacher = (name) => setTeachers(teachers.filter((t) => t.name !== name));

  const addSubject = (data) => setSubjects([...subjects, data]);
  const deleteSubject = (name) => setSubjects(subjects.filter((s) => s.name !== name));
  const editSubject = (index, updated) => {
    const newSubjects = [...subjects];
    newSubjects[index] = updated;
    setSubjects(newSubjects);
  };

  const addClass = (name) => {
    if (!classes.includes(name)) setClasses([...classes, name]);
    if (!timetable[name]) {
      setTimetable({
        ...timetable,
        [name]: Object.keys(periodTimings).reduce((acc, slot) => ({ ...acc, [slot]: {} }), {}),
      });
    }
  };

  const updateCell = (className, period, day, data) => {
    for (const c in timetable) {
      if (c === className) continue;
      if (timetable[c][period] && timetable[c][period][day] && timetable[c][period][day].teacher === data.teacher) {
        alert(`Conflict: Teacher ${data.teacher} is already assigned to ${c} at ${period} on ${day}`);
        return;
      }
    }

    setTimetable({
      ...timetable,
      [className]: {
        ...timetable[className],
        [period]: {
          ...timetable[className][period],
          [day]: data,
        },
      },
    });
  };

  const clearCell = (className, period, day) => {
    const copy = { ...timetable };
    if (copy[className] && copy[className][period] && copy[className][period][day]) {
      delete copy[className][period][day];
      setTimetable(copy);
    }
  };

  const exportCSV = () => {
    let csv = 'Class,Period,Day,Subject,Teacher,Room\n';
    for (const className in timetable) {
      for (const period in timetable[className]) {
        for (const day in timetable[className][period]) {
          const { subject, teacher, room } = timetable[className][period][day];
          csv += `${className},${period},${day},${subject || ''},${teacher || ''},${room || ''}\n`;
        }
      }
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTimetableName || 'timetable'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Error Message */}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          type="error"
          className="mb-4"
          onClose={() => setErrorMessage('')}
        />
      )}

      {/* Timetable manager header: choose/create/delete */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-4">
          <label className="font-semibold">Your timetables:</label>

          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search timetables by name or date..."
              onClear={() => setSearchQuery('')}
            />
          </div>

          <button
            onClick={async () => {
              const name = window.prompt('New timetable name:');
              if (!name) return;
              await createTimetable(name);
              await fetchTimetableList();
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New
          </button>

          <button
            onClick={async () => {
              if (!selectedTimetableId) return alert('Select a timetable to delete');
              await deleteTimetable(selectedTimetableId);
              await fetchTimetableList();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>

        {/* Timetable Selection */}
        <div className="flex items-center gap-4">
          <select
            value={selectedTimetableId || ''}
            onChange={(e) => {
              const id = e.target.value;
              if (!id) {
                setSelectedTimetableId(null);
                setSelectedTimetableName('');
                setTimetable({});
                return;
              }
              loadTimetable(id);
            }}
            className="border p-2 rounded min-w-64"
            disabled={isLoading}
          >
            <option value="">-- Select timetable --</option>
            {isLoading ? (
              <option disabled>Loading timetables...</option>
            ) : filteredTimetables.length === 0 ? (
              <option disabled>
                {searchQuery ? 'No timetables found matching your search' : 'No timetables available'}
              </option>
            ) : (
              filteredTimetables.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name} ({new Date(t.updatedAt).toLocaleString()})
                </option>
              ))
            )}
          </select>

          {/* Rename Section */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Rename selected timetable"
              value={selectedTimetableName}
              onChange={(e) => setSelectedTimetableName(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={async () => {
                if (!selectedTimetableId) return alert('Select a timetable to rename');
                try {
                  const res = await fetch(`http://localhost:5000/api/timetables/${selectedTimetableId}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name: selectedTimetableName }),
                  });
                  if (res.ok) {
                    await fetchTimetableList();
                  } else {
                    const data = await res.json();
                    alert(data.message || 'Rename failed');
                  }
                } catch (err) {
                  console.error(err);
                  alert('Rename failed');
                }
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 hover:shadow-md transition duration-150 ease-in-out"
            >
              Rename
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ClassroomForm classrooms={classrooms} addClassroom={addClassroom} deleteClassroom={deleteClassroom} editClassroom={editClassroom} />
        <TeacherForm teachers={teachers} addTeacher={addTeacher} deleteTeacher={deleteTeacher} />
        <SubjectForm subjects={subjects} addSubject={addSubject} deleteSubject={deleteSubject} editSubject={editSubject} classes={classes} addClass={addClass} />
        <PeriodSettings periodTimings={periodTimings} setPeriodTimings={setPeriodTimings} />
      </div>

      <h2 className="text-xl font-bold mt-6 mb-2">Class-wise Editable Timetable</h2>
      <TimetableGrid
        timetable={timetable}
        classes={classes}
        slots={Object.keys(periodTimings)}
        teachers={teachers}
        subjects={subjects}
        classrooms={classrooms}
        updateCell={updateCell}
        clearCell={clearCell}
        periodTimings={periodTimings}
      />

      <TimetableViews timetable={timetable} />

      <div className="mt-4">
        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Timetable as CSV
        </button>

        <button
          onClick={async () => {
            if (!selectedTimetableId) {
              const name = window.prompt('Enter name for this timetable (will be created):');
              if (!name) return;
              await createTimetable(name);
              await fetchTimetableList();
              return;
            }
            setSaveStatus('Saving...');
            try {
              const res = await persistTimetable();
              if (res && res.ok) {
                setSaveStatus('Saved!');
                setTimeout(() => setSaveStatus(''), 2000);
                await fetchTimetableList();
              } else {
                setSaveStatus('Error saving timetable');
              }
            } catch (err) {
              setSaveStatus('Error saving timetable');
            }
          }}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 hover:shadow-md transition duration-150 ease-in-out flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Save Timetable
        </button>

        {saveStatus && (
          <div className="inline-flex items-center ml-4">
            {saveStatus === 'Saving...' ? (
              <>
                <LoadingSpinner size="small" color="blue" className="mr-2" />
                <span className="text-sm text-gray-700">{saveStatus}</span>
              </>
            ) : (
              <span className={`text-sm ${saveStatus === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>
                {saveStatus}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimetableMain;
