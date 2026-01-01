# Lab2: Website with Registration Form

## Overview
This lab creates a simple website with a home page, registration form, and thank you page. It demonstrates HTML forms, table-based layout, CSS styling, and basic user interaction.

## Files
- `src/index.html`: Home page with layout, login form, and personal information
- `src/registration.html`: Registration form with various input types
- `src/Thankyou.html`: Simple thank you page after form submission
- `src/styles.css`: CSS styles for layout and appearance
- `static/`: Directory containing images and icons

## Features
- Table-based layout for page structure
- Login form with username/password
- Comprehensive registration form with validation
- Social media links
- Embedded YouTube video
- CSS styling for colors and layout

## Corner Cases and Edge Cases

### Form Handling
- **GET method**: Registration form uses `method="get"`, sending data in URL query string. This exposes sensitive data like passwords in the URL and has length limitations.
- **No server-side processing**: Form submits to `Thankyou.html`, which doesn't process the data. In a real application, this would need backend processing.
- **Password confirmation**: Form has "Repeat Password" field but no validation to ensure passwords match.
- **File upload**: User picture input allows file selection, but no handling for upload or validation of file types/sizes.

### Validation
- **HTML5 validation**: Uses `required` attribute, but browser support varies. Some browsers may not enforce it.
- **Email validation**: `type="email"` provides basic validation, but doesn't check if the email actually exists.
- **Date validation**: Birth date input allows any past date; no age restrictions.
- **Checkbox groups**: Interests checkboxes allow multiple selections, but no minimum/maximum requirements.

### Navigation and Links
- **Broken links**: Navigation includes link to `about.html` which doesn't exist.
- **Image sources**: All images reference `../static/`; missing files will show broken images.
- **External links**: Social media links open in new tabs, but icons may not load if files are missing.

### Layout and Responsiveness
- **Table layout**: Uses HTML tables for layout, which doesn't adapt well to different screen sizes.
- **Fixed widths**: Elements like iframe and images use fixed pixel widths, not responsive.
- **CSS application**: `styles.css` is only linked in `index.html`; other pages lack styling.

### Accessibility
- **Form labels**: All form inputs have labels, which is good, but could use `for` attributes for better association.
- **Alt text**: Images have alt attributes, which is good for accessibility.
- **Color contrast**: CSS uses specific colors; may not meet WCAG contrast requirements.
- **Keyboard navigation**: Table-based layout may be difficult to navigate with keyboard.

### Multimedia
- **YouTube embed**: Relies on external service; may not load in restricted networks or if YouTube is blocked.
- **Video dimensions**: Fixed width/height may not fit all screen sizes.

### Security Considerations
- **Plain text password**: Password fields are sent via GET, visible in URL and server logs.
- **No CSRF protection**: Form has no protection against cross-site request forgery.
- **File upload**: No restrictions on uploaded files; could be a security risk.

### Browser Compatibility
- **CSS support**: Basic CSS properties used should work in modern browsers, but older browsers may have issues.
- **Form elements**: HTML5 input types like `date` may not be supported in older browsers, falling back to text inputs.

## Recommendations
- Change form method to POST for sensitive data.
- Add JavaScript validation for password confirmation and other client-side checks.
- Implement server-side form processing.
- Replace table layout with CSS flexbox/grid for responsiveness.
- Add media queries for different screen sizes.
- Implement proper error handling and user feedback.
- Add security measures like input sanitization and CSRF tokens.
- Test across different browsers and devices.</content>
<parameter name="filePath">/home/nagy/Mine/ITI/09_HTML_CSS/Lab2/README.md