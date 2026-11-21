# Relationship Parameter Editor

A vanilla JavaScript web component for editing relationship properties.

## Installation

```bash
npm install relationship-param-editor
```

## Usage

### ES Modules

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./node_modules/relationship-param-editor/src/styles/variables.css">
  <script type="module">
    import 'relationship-param-editor';
  </script>
</head>
<body>
  <relation-param-editor class-id="31"></relation-param-editor>
</body>
</html>
```

### With Import Map

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./node_modules/relationship-param-editor/src/styles/variables.css">
  <script type="importmap">
  {
    "imports": {
      "relationship-param-editor": "./node_modules/relationship-param-editor/src/index.js"
    }
  }
  </script>
  <script type="module">
    import 'relationship-param-editor';
  </script>
</head>
<body>
  <relation-param-editor class-id="31"></relation-param-editor>
</body>
</html>
```

## API

### Attributes

- `class-id` (string): The class ID to load relationships for
- `models` (JSON array): Optional initial data to display

### Events

- `class-selected`: Fired when a relationship is selected
- `parameters-changed`: Fired when a form parameter changes
- `parameters-save`: Fired when save is initiated
- `parameters-saved`: Fired when save completes (success or failure)

### Example

```javascript
const editor = document.querySelector('relation-param-editor');

// Listen for save completion
editor.addEventListener('parameters-saved', (e) => {
  if (e.detail.success) {
    console.log('Saved successfully');
  } else {
    console.error('Save failed:', e.detail.error);
  }
});

// Set class ID programmatically
editor.setAttribute('class-id', '42');
```

## Styling

CSS custom properties are used for theming. Override them in your CSS:

```css
:root {
  --primary-color: #337ab7;
  --success-color: #5cb85c;
  --text-color: #333;
  --border-color: #ddd;
  /* etc. */
}
```

## Architecture

This is a pure web component implementation with:

- No external dependencies
- ES modules
- Shadow DOM for style encapsulation
- Native fetch API for HTTP requests
- CustomEvent for communication

## Components

- `<relation-param-editor>` - Root component
- `<related-class-properties>` - Split view container
- `<related-class-list>` - List of relationships
- `<relation-link>` - Individual relationship item
- `<parameter-form>` - Tabbed parameter editor
- `<form-input>` - Text input field
- `<form-readonly>` - Read-only display field
- `<form-select>` - Dropdown select
- `<ok-cancel-buttons>` - Save/Cancel actions

## Browser Support

Requires browsers with support for:
- Custom Elements v1
- Shadow DOM v1
- ES Modules
- CSS Custom Properties

## Migration from React

This project was migrated from React 15.x to vanilla web components. The main changes:

1. **Components**: Converted from React classes to `HTMLElement` custom elements
2. **State**: Replaced React state with internal class properties
3. **Events**: Replaced Postal.js pub/sub with CustomEvent dispatching
4. **HTTP**: Replaced XMLHttpRequest with fetch API
5. **Styling**: Replaced Bootstrap with scoped Shadow DOM CSS
6. **Build**: Removed webpack/babel, using native ES modules

## License

MIT
