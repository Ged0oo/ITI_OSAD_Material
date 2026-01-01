# Lab3.1: CSS Selectors Demonstration

## Overview
This lab demonstrates various CSS selectors through a structured HTML page. It shows how different selectors target elements and apply styles, helping understand CSS specificity and inheritance.

## Files
- `selectors lab.html`: HTML page with various elements to demonstrate selectors
- `styles.css`: CSS file containing selector rules

## Features
- Demonstration of multiple CSS selector types
- Color-coded styling to show selector effects
- Nested HTML structure for complex selectors

## Corner Cases and Edge Cases

### Selector Specificity
- **Conflicting rules**: Multiple selectors may target the same element (e.g., `p` and `p.myClass`), resolved by specificity rules.
- **Inheritance**: Child elements inherit styles from parents unless overridden.
- **Direct child vs descendant**: `#myDiv > p.mainClass` only targets direct children, while `div p` targets all descendants.

### HTML Structure
- **Nested elements**: Deep nesting (div inside div) tests selector specificity and inheritance.
- **Class combinations**: Elements with multiple classes (e.g., `class="myClass mainClass"`) allow testing compound selectors.
- **Form elements**: Input fields with classes test attribute selectors combined with class selectors.

### CSS Rules
- **Specificity calculation**: Rules like `#myDiv > p.mainClass` have high specificity and override general rules.
- **Color inheritance**: Parent div's color may affect child elements unless explicitly set.
- **Font properties**: Monospace font on `p.myClass` vs other font families.

### Browser Compatibility
- **Basic selectors**: All selectors used are well-supported in modern browsers.
- **CSS properties**: Colors, fonts, borders, padding are universally supported.
- **No advanced features**: No CSS Grid, Flexbox, or modern selectors that might have compatibility issues.

### Edge Cases in Styling
- **Border radius**: Applied to input and div; may render differently in older browsers.
- **Outline**: `outline: none` on input removes default focus outline, potentially affecting accessibility.
- **Background colors**: Multiple background colors on same elements may create visual conflicts.

### Accessibility Considerations
- **Focus indicators**: Removing outline from inputs without replacement may hinder keyboard navigation.
- **Color reliance**: Styling relies heavily on colors; may not be suitable for color-blind users.
- **No semantic meaning**: Purely demonstrative; lacks real content structure.

### Performance
- **Simple styles**: Minimal CSS, so no performance concerns.
- **No external resources**: All styles are local, no network requests.

## Recommendations
- Add focus styles to maintain accessibility when removing default outlines.
- Test color combinations for sufficient contrast.
- Consider adding comments in CSS for educational purposes.
- Validate CSS using CSS validators.
- Test in multiple browsers to ensure consistent rendering.</content>
<parameter name="filePath">/home/nagy/Mine/ITI/09_HTML_CSS/Lab3/Lab3.1/README.md