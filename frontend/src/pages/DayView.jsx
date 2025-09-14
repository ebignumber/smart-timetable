import { useState, useEffect } from "react";

export default function DayView({ day }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/views/day/${day}`)
      .then((res) => res.json())
      .then((result) => setData(result));
  }, [day]);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Day Timetable ({day})</h2>
      <table className="w-full border border-collapse border-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Period</th>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Teacher</th>
            <th className="p-2 border">Room</th>
            <th className="p-2 border">Subject</th>
          </tr>
        </thead>
        <tbody>
          {data.map((slot, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{slot.period}</td>
              <td className="p-2 border">{slot.class}</td>
              <td className="p-2 border">{slot.teacher}</td>
              <td className="p-2 border">{slot.room}</td>
              <td className="p-2 border">{slot.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => window.print()}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Print
      </button>
    </div>
  );
}
