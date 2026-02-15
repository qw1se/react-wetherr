
export default function HourlyForecast({ list }) {
  const hourly = list.slice(0, 8);

  return (
    <div className="glass-card hourly-section">
      <div className="card-header">
        <p>HOURLY FORECAST</p>
      </div>

      <div className="hourly-list">
        {hourly.map((item, i) => (
          <div className="hour-item" key={i}>
            <p>{new Date(item.dt * 1000).getHours()}:00</p>
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
