const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TimetableGrid = ({ timetable, classes, slots, teachers, subjects, classrooms, updateCell, clearCell, periodTimings }) => (
  <div className="overflow-x-auto bg-white rounded shadow mt-2">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Class</th>
          {slots.map(slot => (
            <th key={slot} className="border p-2 text-center">
              <div className="font-bold">{slot}</div>
              <div className="text-xs text-gray-600">{periodTimings[slot]}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {classes.map(className => (
          <tr key={className}>
            <td className="border p-2 font-bold">{className}</td>
            {slots.map(slot => (
              <td key={slot} className="border p-1">
                {daysOfWeek.map(day => {
                    const entry = timetable[className]?.[slot]?.[day] || {};
                    return (
                      <div key={day} className="flex flex-col gap-1 border-b pb-1">
                        <div className="font-bold text-xs">{day}</div>
                        <select
                          value={entry.subject || ''}
                          onChange={(e) => updateCell(className, slot, day, { ...entry, subject: e.target.value })}
                          className="border rounded p-1 text-xs"
                        >
                          <option value="">--Subject--</option>
                          {subjects.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                        <select
                          value={entry.teacher || ''}
                          onChange={(e) => updateCell(className, slot, day, { ...entry, teacher: e.target.value })}
                          className="border rounded p-1 text-xs"
                        >
                          <option value="">--Teacher--</option>
                          {teachers.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                        </select>
                        <select
                          value={entry.classroom || ''}
                          onChange={(e) => updateCell(className, slot, day, { ...entry, classroom: e.target.value })}
                          className="border rounded p-1 text-xs"
                        >
                          <option value="">--Room--</option>
                          {classrooms.map(c => <option key={c.id} value={c.name}>{c.name} ({c.roomNumber})</option>)}
                        </select>
                        <button
                          onClick={() => clearCell(className, slot, day)}
                          className="text-xs text-red-600 underline mt-1 hover:text-red-800 hover:font-semibold transition duration-150 ease-in-out"
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

export default TimetableGrid;
