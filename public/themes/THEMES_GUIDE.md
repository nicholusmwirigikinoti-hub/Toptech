# Toptech - Logo & Color Themes

## 📦 Available Logos

### Logo Variants

1. **Default - Cyber Blue** (`TOPTECH_logo_default.svg`)
   - Professional dark blue background
   - Cyan to blue gradient accents
   - Best for: Corporate, tech-forward branding

2. **Dark - Neon Green** (`TOPTECH_logo_dark.svg`)
   - Ultra dark background
   - Neon green accents
   - Best for: Gaming, modern tech, high contrast

3. **Purple - Magenta** (`TOPTECH_logo_purple.svg`)
   - Deep purple background
   - Vibrant purple to magenta gradients
   - Best for: Creative, premium branding

4. **Orange - Warm** (`TOPTECH_logo_orange.svg`)
   - Rich brown background
   - Warm orange and gold accents
   - Best for: Friendly, approachable branding

---

## 🎨 Color Themes

All themes include:
- **Primary Background**: Main UI background
- **Secondary Background**: Card/panel backgrounds
- **Primary Accent**: Main interactive elements
- **Secondary Accent**: Hover/secondary elements
- **Primary Text**: Main text color
- **Secondary Text**: Muted/secondary text
- **Border**: Border and divider colors

### Theme Configuration

See `public/themes/color-themes.json` for complete color palette definitions.

---

## 🚀 Implementation Guide

### React/Next.js

```jsx
import themes from '@/public/themes/color-themes.json';

const MyComponent = () => {
  const theme = themes.themes.default; // or 'dark', 'purple', 'orange'
  
  return (
    <div style={{
      backgroundColor: theme.colors.background_primary,
      color: theme.colors.text_primary,
      borderColor: theme.colors.border
    }}>
      <img src={`/logos/${theme.logo}`} alt="Toptech" />
    </div>
  );
};
```

### CSS Variables

```css
:root {
  --bg-primary: #0A2540;
  --bg-secondary: #0F3D63;
  --accent-primary: #00D2FF;
  --accent-secondary: #3A7BFF;
  --text-primary: #FFFFFF;
  --text-secondary: #8FB7D9;
  --border: #00D2FF;
}

.container {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 2px solid var(--border);
}
```

### Tailwind CSS (Extending Config)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        toptech: {
          dark: '#0A2540',
          accent: '#00D2FF',
          text: '#FFFFFF'
        }
      }
    }
  }
};
```

---

## 📋 Usage Tips

✅ **DO**
- Use accent colors for CTAs and interactive elements
- Maintain sufficient contrast for accessibility
- Apply theme consistently across all interfaces
- Use secondary backgrounds for layered UI

❌ **DON'T**
- Mix theme colors from different themes
- Use text colors as backgrounds
- Reduce opacity below 0.5 for important elements
- Override theme colors without documentation

---

## 📁 File Structure

```
public/
├── logos/
│   ├── TOPTECH_logo_default.svg
│   ├── TOPTECH_logo_dark.svg
│   ├── TOPTECH_logo_purple.svg
│   └── TOPTECH_logo_orange.svg
└── themes/
    └── color-themes.json
```

---

## 🎯 Customization

To create a custom theme:

1. Add new entry to `color-themes.json`
2. Create a new SVG logo variant
3. Test contrast ratios (WCAG AA minimum)
4. Document the theme purpose
5. Update this guide

---

## 📞 Support

For issues or theme requests, refer to the main [README.md](../../README.md)
