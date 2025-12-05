import { useState } from 'react';

const PeriodSettings = ({ periodTimings, setPeriodTimings }) => {
  const [period, setPeriod] = useState('');
  const [timing, setTiming] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!period || !timing) return;
    setPeriodTimings({ ...periodTimings, [period]: timing });
    setPeriod('');
    setTiming('');
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="font-bold text-lg mb-2">Manage Period Timings</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Period Name (e.g., Period 1)"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Timing (e.g., 9:00 - 9:45)"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out">Add</button>
      </form>

      <ul>
        {Object.entries(periodTimings).map(([p, t]) => (
          <li key={p} className="flex justify-between border-b py-1">
            <span>{p}: {t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeriodSettings;
