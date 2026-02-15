
export default function MainInfo({ city, current }) {
  const temp = Math.round(current.main.temp);
  const max = Math.round(current.main.temp_max);
  const min = Math.round(current.main.temp_min);
  const desc = current.weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

  return (
    <div className="main-info">
      <h2 className="city-name">{city}</h2>
      <div className="temperature">{temp}°</div>
      <div className="condition-box">
        <img className="main-icon" src={icon} alt={desc} />
        <div className="description">{desc}</div>
      </div>
      <div className="high-low">
        H:<span>{max}</span>° L:<span>{min}</span>°
      </div>
    </div>
  );
}
