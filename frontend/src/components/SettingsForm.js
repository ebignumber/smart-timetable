import { useState } from "react";

const SettingsForm = ({ setSettings }) => {
  const [periodDuration, setPeriodDuration] = useState(60);
  const [slotsPerDay, setSlotsPerDay] = useState(6);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings({ periodDuration, slotsPerDay });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-2">Timetable Settings</h2>
      <div className="mb-2">
        <label>Period Duration (minutes): </label>
        <input
          type="number"
          value={periodDuration}
          onChange={(e) => setPeriodDuration(Number(e.target.value))}
          className="border p-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label>Slots per Day: </label>
        <input
          type="number"
          value={slotsPerDay}
          onChange={(e) => setSlotsPerDay(Number(e.target.value))}
          className="border p-1 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out">
        Save Settings
      </button>
    </form>
  );
};

export default SettingsForm;
