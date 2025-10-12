import React, { useState } from "react";

interface SeasonSelectorProps {
  onSelect: (season: string) => void;
}

const seasons = ["All", "Winter", "Spring", "Summer", "Fall"];

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState("All");

  const handleSelect = (season: string) => {
    setSelected(season);
    onSelect(season);
  };

  return (
    <div className="flex justify-center gap-3 my-4 flex-wrap">
      {seasons.map((season) => (
        <button
          key={season}
          onClick={() => handleSelect(season)}
          className={`px-4 py-2 rounded-lg font-medium transition text-sm
            ${
              selected === season
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          {season}
        </button>
      ))}
    </div>
  );
};

export default SeasonSelector;
