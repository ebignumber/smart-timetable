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
      <h2 className="text-2xl font-bold mb-4">Day Timetable ({day})</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Period</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Room</th>
            <th className="border p-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          {data.map((slot, idx) => (
            <tr key={idx}>
              <td className="border p-2">{slot.period}</td>
              <td className="border p-2">{slot.class}</td>
              <td className="border p-2">{slot.teacher}</td>
              <td className="border p-2">{slot.room}</td>
              <td className="border p-2">{slot.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => window.print()}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Print
      </button>
    </div>
  );
}
