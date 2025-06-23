import React from "react";

const PlaceholderImage = ({ name = "User", size = 50, className }) => {
  const getInitials = (name) => {
    if (!name.trim()) return "U";
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const getColor = (name) => {
    const colors = [
      "#FFAB76",
      "#77DD77",
      "#FF94C2",
      "#89CFF0",
      "#FFB347",
      "#D7A9E3",
      "#FFCBA4",
      "#A3E4D7",
      "#F4A7B9",
      "#8FAADC",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-bold ${className}`}
      style={{
        backgroundColor: getColor(name),
        width: size,
        height: size,
        fontSize: size / 2,
        fontWeight: 600,
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default PlaceholderImage;
