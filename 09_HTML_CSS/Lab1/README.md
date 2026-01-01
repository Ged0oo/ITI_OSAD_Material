# Lab1: Personal Website Pages

## Overview
This lab consists of two simple HTML pages: `home.html` and `welcome.html`. These pages demonstrate basic HTML structure, navigation, multimedia embedding, and personal information display.

## Files
- `src/home.html`: Main home page with personal information, about section, and navigation
- `src/welcome.html`: Welcome page with multimedia content
- `static/`: Directory containing images, icons, and video files

## Features
- Personal information display using tables and lists
- Image and video embedding
- Social media links
- Navigation between pages
- Anchor links for page navigation

## Corner Cases and Edge Cases

### Browser Compatibility
- **Deprecated attributes**: Uses `align` attribute on elements, which is deprecated in HTML5. Modern browsers still support it, but it's recommended to use CSS instead.
- **Table layout**: Uses tables for layout, which may not be responsive on small screens.
- **Video autoplay**: The video in `welcome.html` has `autoplay` attribute, which may be blocked by some browsers due to autoplay policies.

### Accessibility
- **Missing alt text**: Some images lack `alt` attributes, making the page less accessible to screen readers.
- **Semantic HTML**: Limited use of semantic elements; mostly uses generic `div` and `table` for structure.
- **Color contrast**: No explicit contrast checks; text colors may not meet WCAG guidelines.

### Responsive Design
- **No viewport meta**: `home.html` lacks `<meta name="viewport">`, which can cause issues on mobile devices.
- **Fixed widths**: Images and elements use fixed pixel widths, not responsive units.
- **Incomplete viewport**: `welcome.html` has `width=,` which is invalid and may cause rendering issues.

### Multimedia
- **File paths**: Assumes `../static/` directory exists with specific files (1.jpg, facebook.png, etc.). Missing files will result in broken images.
- **Video format**: Embedded video may not play if the browser doesn't support the format or if the file is missing.
- **YouTube embed**: Relies on external YouTube service; may not load if network issues or if embed is blocked.

### Navigation
- **Relative links**: Links between pages use relative paths; may break if opened from different directories.
- **Anchor links**: `#gg` anchor works, but if the page content changes, the anchor may not align properly.
- **External links**: Social media links open in new tabs, but no fallback if JavaScript is disabled (though these are standard HTML links).

### Content
- **Long text**: The lorem ipsum text is intentionally long to test scrolling, but may cause performance issues on low-end devices.
- **Personal data**: Contains real personal information (phone, email); in a real scenario, this should be handled carefully for privacy.

## Recommendations
- Replace table-based layout with CSS flexbox or grid for better responsiveness.
- Add proper semantic HTML elements like `<header>`, `<main>`, `<footer>`.
- Include alt text for all images.
- Add viewport meta tag and use responsive units (%, em, rem).
- Validate HTML using tools like W3C Validator.
- Consider adding CSS for better styling and consistency.</content>
<parameter name="filePath">/home/nagy/Mine/ITI/09_HTML_CSS/Lab1/README.md