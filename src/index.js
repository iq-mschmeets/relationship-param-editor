// Import all components to register them
import './components/FormReadonly.js';
import './components/FormInput.js';
import './components/FormSelect.js';
import './components/OkCancelButtons.js';
import './components/PanelWrapper.js';
import './components/RelationLink.js';
import './components/RelatedClassList.js';
import './components/ParameterForm.js';
import './components/RelatedClassProperties.js';
import './components/RelationParamEditor.js';

// Export components for programmatic access
export { default as FormReadonly } from './components/FormReadonly.js';
export { default as FormInput } from './components/FormInput.js';
export { default as FormSelect } from './components/FormSelect.js';
export { default as OkCancelButtons } from './components/OkCancelButtons.js';
export { default as PanelWrapper } from './components/PanelWrapper.js';
export { default as RelationLink } from './components/RelationLink.js';
export { default as RelatedClassList } from './components/RelatedClassList.js';
export { default as ParameterForm } from './components/ParameterForm.js';
export { default as RelatedClassProperties } from './components/RelatedClassProperties.js';
export { default as RelationParamEditor } from './components/RelationParamEditor.js';

// Export utilities
export * from './utils/Events.js';
export { default as ParameterObject, defaultParameterSetFactory, getNullParameter, isNotNull, defaultProperty } from './models/ParameterObject.js';
export { default as ClassService } from './services/ClassService.js';
export { default as ParameterService } from './services/ParameterService.js';
export { default as FilterSearchService } from './services/FilterSearchService.js';
export { default as getMessageFromError } from './utils/XHRError.js';

// Default export is the main component
export { default } from './components/RelationParamEditor.js';
