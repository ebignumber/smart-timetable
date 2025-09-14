const TimetableViews = ({ timetable }) => {
  const classes = Object.keys(timetable);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const renderClasswise = () => classes.map(c => (
    <div key={c} className="p-4 mb-6 bg-white rounded shadow">
      <h2 className="mb-2 text-xl font-bold">Class: {c}</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="px-2 border">Period / Day</th>
            {daysOfWeek.map(day => <th key={day} className="px-2 border">{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.keys(timetable[c]).map(period => (
            <tr key={period}>
              <td className="px-2 font-bold border">{period}</td>
              {daysOfWeek.map(day => {
                const entry = timetable[c][period][day] || {};
                return (
                  <td key={day} className="px-2 text-xs border">
                    {entry.subject || "-"} <br />
                    {entry.teacher || "-"} <br />
                    {entry.classroom || "-"}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xl font-bold">Generated Timetable Views</h2>
      {renderClasswise()}
      {/* Additional functions for daywise, teacherwise, subjectwise can be added similarly */}
    </div>
  );
};

export default TimetableViews;
