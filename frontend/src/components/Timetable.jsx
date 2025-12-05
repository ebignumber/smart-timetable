import React from 'react';

function Timetable({ timetable, days, slots }) {
  if (!timetable) return null;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Generated Timetable</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1">Day / Period</th>
            {slots.map((slot) => (
              <th key={slot} className="border border-gray-400 px-2 py-1">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="border border-gray-400 px-2 py-1 font-bold">{day}</td>
              {slots.map((slot) => {
                const cell = timetable[day][slot];
                return (
                  <td key={slot} className="border border-gray-400 px-2 py-1 text-center">
                    {cell ? (
                      <>
                        <div className="font-semibold">{cell.subject}</div>
                        <div>👨‍🏫 {cell.teacher}</div>
                        <div>🏫 {cell.classroom}</div>
                        <div>📘 {cell.class}</div>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">Empty</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
