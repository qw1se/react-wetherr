
export default function WeekForecast({ list }) {
  const days = list.filter((_, i) => i % 8 === 0).slice(0, 7);

  return (
    <div className="glass-card week-section">
      <div className="card-header">
        <p>ONE WEEK FORECAST</p>
      </div>

      <div className="week-list">
        {days.map((item, i) => (
          <div className="day-item" key={i}>
            <p>
              {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt=""
            />
            <p>{Math.round(item.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
