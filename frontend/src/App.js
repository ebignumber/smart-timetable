import { useState } from "react";
import ClassroomForm from "./components/ClassroomForm";
import TeacherForm from "./components/TeacherForm";
import SubjectForm from "./components/SubjectForm";
import PeriodSettings from "./components/PeriodSettings";
import TimetableGrid from "./components/TimetableGrid";
import TimetableViews from "./components/TimetableViews";

function App() {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [periodTimings, setPeriodTimings] = useState({
    "Assembly": "08:00 - 08:20",
    "Period 1": "08:20 - 09:00",
    "Period 2": "09:00 - 09:40",
    "Period 3": "09:40 - 10:20",
    "Period 4": "10:20 - 11:00",
    "Period 5": "11:00 - 11:40",
    "Recess": "11:40 - 12:00",
    "Period 6": "12:00 - 12:40",
    "Period 7": "12:40 - 01:20",
    "Period 8": "01:20 - 02:00",
  });

  // timetable: { className: { period: { day: {subject, teacher, room} } } }
  const [timetable, setTimetable] = useState({});

  const addClassroom = (data) => setClassrooms([...classrooms, data]);
  const deleteClassroom = (id) => setClassrooms(classrooms.filter(c => c.id !== id));
  const editClassroom = (id, updated) => setClassrooms(classrooms.map(c => c.id === id ? updated : c));

  const addTeacher = (data) => setTeachers([...teachers, data]);
  const deleteTeacher = (name) => setTeachers(teachers.filter(t => t.name !== name));

  const addSubject = (data) => setSubjects([...subjects, data]);
  const deleteSubject = (name) => setSubjects(subjects.filter(s => s.name !== name));

  const addClass = (name) => {
    if (!classes.includes(name)) setClasses([...classes, name]);
    if (!timetable[name]) {
      setTimetable({
        ...timetable,
        [name]: Object.keys(periodTimings).reduce((acc, slot) => ({ ...acc, [slot]: {} }), {})
      });
    }
  };

  // update a cell for a specific class, period, day
  const updateCell = (className, period, day, data) => {
    // Validation: Check if the same class is already assigned same period/day to another teacher
    for (let c in timetable) {
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
          [day]: data
        }
      }
    });
  };

  const clearCell = (className, period, day) => {
    const copy = { ...timetable };
    if (copy[className][period][day]) delete copy[className][period][day];
    setTimetable(copy);
  };

  const editSubject = (index, updated) => {
  const newSubjects = [...subjects];
  newSubjects[index] = updated;
  setSubjects(newSubjects);
};

const exportCSV = () => {
  let csv = "Class,Period,Day,Subject,Teacher,Room\n";
  for (let className in timetable) {
    for (let period in timetable[className]) {
      for (let day in timetable[className][period]) {
        const { subject, teacher, room } = timetable[className][period][day];
        csv += `${className},${period},${day},${subject || ""},${teacher || ""},${room || ""}\n`;
      }
    }
  }
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "timetable.csv";
  a.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Smart School Timetable Generator</h1>

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
      />

      <TimetableViews timetable={timetable} />
      <button
  onClick={exportCSV}
  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
>
  Export Timetable as CSV
</button>
    </div>
  );
}

export default App;
