// utils/pixelAvatar.js
export const generatePixelAvatar = (username) => {
    // Create a deterministic seed from username
    const seed = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate colors based on seed
    const hue = seed % 360;
    const mainColor = `hsl(${hue}, 60%, 50%)`;
    const secondaryColor = `hsl(${(hue + 40) % 360}, 60%, 50%)`;
    
    // Create SVG pixel art (5x5 grid)
    const grid = [];
    const random = (n) => ((seed * (n + 1)) % 100) / 100;
    
    // Generate symmetric pattern
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const value = random(i * 5 + j) > 0.5;
        row.push(value);
      }
      // Make it symmetric
      row.push(row[1]);
      row.push(row[0]);
      grid.push(row);
    }
  
    // Convert grid to SVG
    const svgContent = grid.map((row, i) => 
      row.map((cell, j) => 
        cell ? `<rect x="${j*20}" y="${i*20}" width="20" height="20" fill="${mainColor}" />` : ''
      ).join('')
    ).join('');
  
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${secondaryColor}" />
      ${svgContent}
    </svg>`;
  };