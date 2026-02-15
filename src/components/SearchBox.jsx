
import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const submit = () => {
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button onClick={submit}>🔍</button>
    </div>
  );
}
