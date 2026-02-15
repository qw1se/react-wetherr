
const API_KEY = "5d44c8cb9a9e2d710e993a8839e93d21";

export async function fetchWeather(city) {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const geoData = await geoRes.json();

  if (!geoData.length) throw new Error("City not found");

  const { lat, lon, name } = geoData[0];

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await weatherRes.json();

  return { name, data };
}
