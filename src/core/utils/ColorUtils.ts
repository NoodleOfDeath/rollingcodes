
export const colorNameToHex = (colorName: string): string => {
  const colors: Record<string, string> = {
    'black': '#000000',
    'blue': '#0000FF',
    'cyan': '#00FFFF',
    'gray': '#808080',
    'green': '#008000',
    'magenta': '#FF00FF',
    'maroon': '#800000',
    'navy': '#000080',
    'olive': '#808000',
    'purple': '#800080',
    'red': '#FF0000',
    'silver': '#C0C0C0',
    'teal': '#008080',
    'white': '#FFFFFF',
    'yellow': '#FFFF00',
    // Add more colors as needed
  };

  const normalizedColorName = colorName.toLowerCase();
  return colors[normalizedColorName] ?? colorName;
};

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s: number = (max + min) / 2;
  const l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100]; // Convert to degrees on the hue
};

export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    const q = l < 50 ? l * (1 + s / 100) : l + s - l * s / 100;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const lightenHexColor = (hex: string, lightnessFactor: number): string => {
  hex = colorNameToHex(hex);
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid hex color code');
  }

  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Convert RGB to HSL
  const hsl = rgbToHsl(r, g, b);
  let lightness = hsl[2] + lightnessFactor * 100; // increase lightness
  lightness = Math.min(100, Math.max(0, lightness)); // clamp lightness between 0 and 100

  // Convert HSL back to RGB
  const rgb = hslToRgb(hsl[0], hsl[1], lightness);
  
  // Convert RGB back to Hex
  const hexResult = rgbToHex(rgb[0], rgb[1], rgb[2]);
  return hexResult;
};

