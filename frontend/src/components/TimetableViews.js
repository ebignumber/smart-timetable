const TimetableViews = ({ timetable }) => {
  const classes = Object.keys(timetable);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const renderClasswise = () => classes.map(c => (
    <div key={c} className="mb-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Class: {c}</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Period / Day</th>
            {daysOfWeek.map(day => <th key={day} className="border px-2">{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.keys(timetable[c]).map(period => (
            <tr key={period}>
              <td className="border px-2 font-bold">{period}</td>
              {daysOfWeek.map(day => {
                const entry = timetable[c][period][day] || {};
                return (
                  <td key={day} className="border px-2 text-xs">
                    {entry.subject || '-'} <br />
                    {entry.teacher || '-'} <br />
                    {entry.classroom || '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Generated Timetable Views</h2>
      {renderClasswise()}
      {/* Additional functions for daywise, teacherwise, subjectwise can be added similarly */}
    </div>
  );
};

export default TimetableViews;
