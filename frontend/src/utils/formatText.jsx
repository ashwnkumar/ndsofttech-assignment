export const formatText = (text) => {
  if (!text) return "";

  const normal = text
    .replace(/([A-Z])/g, " $1") 
    .replace(/^./, (str) => str.toUpperCase()); 

  return normal.trim();
};
