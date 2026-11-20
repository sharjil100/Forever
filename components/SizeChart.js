// Size chart table. Highlights the selected size.
export default function SizeChart({ chart, selected }) {
  if (!chart) return null;
  return (
    <div className="sc">
      <table className="sc-table">
        <thead>
          <tr>
            <th>Size</th>
            {chart.columns.map((c) => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.entries(chart.rows).map(([size, vals]) => (
            <tr key={size} className={selected === size ? 'on' : undefined}>
              <td><b>{size}</b></td>
              {vals.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sc-note">All measurements are in inches.</p>
    </div>
  );
}
