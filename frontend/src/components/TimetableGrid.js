const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimetableGrid = ({ timetable, classes, slots, teachers, subjects, classrooms, updateCell, clearCell, periodTimings }) => {
  return (
    <div className="mt-2 overflow-x-auto bg-white rounded shadow">
      <table className="w-full border-collapse">
        <thead>
  <tr className="bg-gray-200">
    <th className="p-2 border">Class</th>
    {slots.map(slot => (
      <th key={slot} className="p-2 text-center border">
        <div className="font-bold">{slot}</div>
        <div className="text-xs text-gray-600">{periodTimings[slot]}</div>
      </th>
    ))}
  </tr>
</thead>
        <tbody>
          {classes.map(className => (
            <tr key={className}>
              <td className="p-2 font-bold border">{className}</td>
              {slots.map(slot => (
                <td key={slot} className="p-1 border">
                  {daysOfWeek.map(day => {
                    const entry = timetable[className]?.[slot]?.[day] || {};
                    return (
                      <div key={day} className="flex flex-col pb-1 border-b gap-1">
                        <div className="text-xs font-bold">{day}</div>
                        <select
                          value={entry.subject || ""}
                          onChange={(e) => updateCell(className, slot, day, { ...entry, subject: e.target.value })}
                          className="p-1 text-xs border rounded"
                        >
                          <option value="">--Subject--</option>
                          {subjects.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                        <select
                          value={entry.teacher || ""}
                          onChange={(e) => updateCell(className, slot, day, { ...entry, teacher: e.target.value })}
                          className="p-1 text-xs border rounded"
                        >
                          <option value="">--Teacher--</option>
                          {teachers.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                        </select>
                        <select
                          value={entry.classroom || ""}
                          onChange={(e) => updateCell(className, slot, day, { ...entry, classroom: e.target.value })}
                          className="p-1 text-xs border rounded"
                        >
                          <option value="">--Room--</option>
                          {classrooms.map(c => <option key={c.id} value={c.name}>{c.name} ({c.roomNumber})</option>)}
                        </select>
                        <button
                          onClick={() => clearCell(className, slot, day)}
                          className="mt-1 text-xs text-red-600 underline hover:text-red-700"
                        >
                          Clear
                        </button>
                      </div>
                    );
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableGrid;
