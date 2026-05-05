// Auto-generated from projects/ng-magary/editorial.json
// DO NOT EDIT MANUALLY — changes will be overwritten

/** Editorial metadata for a component. */
export interface EditorialEntry {
  /** Human-readable description of the component. */
  description: string;
  /** Example usage snippet. */
  usage: string;
  /** Named usage examples. */
  examples: string[];
  /** Additional notes or caveats. */
  notes: string;
  /** Visibility: public (shown), internal (hidden), companion (reduced). */
  visibility: 'public' | 'internal' | 'companion';
}

/** Editorial metadata keyed by component export name. */
export const EDITORIAL_METADATA: Record<string, EditorialEntry> = {
  MagaryAccordion: {
    description: 'Container component that shows/hides content sections. Only one section can be expanded at a time.',
    usage: `<magary-accordion>
  <magary-accordion-tab header="Section 1">Content</magary-accordion-tab>
</magary-accordion>`,
    examples: ['Single selection', 'Custom icons'],
    notes: 'Uses animations for smooth expand/collapse transitions.',
    visibility: 'public',
  },
  MagaryAccordionTab: {
    description: 'Single panel inside a MagaryAccordion. Each tab has a header and collapsible content.',
    usage: `<magary-accordion-tab header="Details"><p>More info...</p></magary-accordion-tab>`,
    examples: ['Basic tab', 'Disabled tab'],
    notes: 'Must be used as a direct child of MagaryAccordion.',
    visibility: 'companion',
  },
  MagaryAvatar: {
    description: 'Displays user avatars as images, initials, or icons with optional badge.',
    usage: `<magary-avatar image="user.jpg" size="large" shape="circle" />`,
    examples: ['Image avatar', 'Initial avatar', 'With badge'],
    notes: 'Supports image, label, and icon modes. Badge severity maps to theme colors.',
    visibility: 'public',
  },
  MagaryBreadcrumb: {
    description: 'Navigation breadcrumb trail showing the current page location within a hierarchy.',
    usage: `<magary-breadcrumb [model]="items" />`,
    examples: ['Basic breadcrumb', 'With router links'],
    notes: 'Each item can link to a router path or external URL.',
    visibility: 'public',
  },
  MagaryButton: {
    description: 'Primary action button with multiple variants: solid, outlined, and text. Supports icons and loading state.',
    usage: `<magary-button label="Submit" severity="primary" (onClick)="handleClick($event)" />`,
    examples: ['Basic button', 'With icon', 'Loading state', 'Disabled'],
    notes: 'Use magary-button over native <button> for consistent styling. Supports severity, size, rounded, shadow.',
    visibility: 'public',
  },
  MagaryCard: {
    description: 'Container card with optional header, footer, and image for grouping related content.',
    usage: `<magary-card header="Title">Card content</magary-card>`,
    examples: ['Basic card', 'With image', 'With footer actions'],
    notes: 'Supports header and footer templates via ng-content selectors.',
    visibility: 'public',
  },
  MagaryCarousel: {
    description: 'Slideshow component for cycling through images or content panels.',
    usage: `<magary-carousel [value]="images" [numVisible]="3" />`,
    examples: ['Image carousel', 'Responsive carousel', 'Auto-play'],
    notes: 'Supports responsive breakpoints, multiple effects (fade, slide), and navigation styles.',
    visibility: 'public',
  },
  MagaryCascadeSelect: {
    description: 'Hierarchical dropdown selector for choosing from nested category trees.',
    usage: `<magary-cascade-select [options]="categories" placeholder="Select category" />`,
    examples: ['Location picker', 'Category tree'],
    notes: 'Each level loads on demand. Supports keyboard navigation.',
    visibility: 'public',
  },
  MagaryCheckbox: {
    description: 'Binary checkbox input with label support.',
    usage: `<magary-checkbox label="I agree" [(ngModel)]="accepted" />`,
    examples: ['Basic checkbox', 'Checked by default', 'Disabled'],
    notes: 'Supports ngModel and reactive forms.',
    visibility: 'public',
  },
  MagaryConfirmDialog: {
    description: 'Modal confirmation dialog with accept/reject actions.',
    usage: `<magary-confirm-dialog header="Delete item?" [visible]="show" (onAccept)="delete()" />`,
    examples: ['Delete confirmation', 'Save changes prompt'],
    notes: 'Can also be triggered programmatically via MagaryConfirmationService.',
    visibility: 'public',
  },
  MagaryContextMenu: {
    description: 'Right-click context menu attached to a target element.',
    usage: `<magary-context-menu [target]="element" [model]="menuItems" />`,
    examples: ['Table row context menu', 'Tree node menu'],
    notes: 'Automatically positions relative to the mouse click position.',
    visibility: 'public',
  },
  MagaryDataView: {
    description: 'Flexible layout container for displaying data collections in grid or list mode.',
    usage: `<magary-data-view [value]="items" layout="grid">...</magary-data-view>`,
    examples: ['Grid layout', 'List layout', 'With pagination'],
    notes: 'Supports toggling between grid and list layouts.',
    visibility: 'public',
  },
  MagaryDatePicker: {
    description: 'Date picker input with calendar popup for selecting single dates.',
    usage: `<magary-date-picker [(ngModel)]="date" />`,
    examples: ['Basic date picker', 'With min/max dates', 'Spanish locale'],
    notes: 'Supports date formatting, min/max constraints, and custom date formats.',
    visibility: 'public',
  },
  MagaryDialog: {
    description: 'Modal dialog overlay for displaying content on top of the current page.',
    usage: `<magary-dialog header="Settings" [visible]="show" [modal]="true">...</magary-dialog>`,
    examples: ['Modal dialog', 'Closable dialog', 'With custom footer'],
    notes: 'Supports modal and non-modal modes. Can be closed via button or backdrop click.',
    visibility: 'public',
  },
  MagaryDivider: {
    description: 'Visual separator line between content sections with optional label.',
    usage: `<magary-divider align="center" type="solid"><b>Section</b></magary-divider>`,
    examples: ['Horizontal divider', 'Vertical divider', 'With label'],
    notes: 'Supports solid, dashed, and dotted types. Content between tags becomes the label.',
    visibility: 'public',
  },
  MagaryFieldset: {
    description: 'Group of form controls with a legend label and collapsible toggle.',
    usage: `<magary-fieldset legend="Personal Info" [toggleable]="true">...</magary-fieldset>`,
    examples: ['Basic fieldset', 'Toggleable', 'Disabled'],
    notes: 'Use to group related form fields semantically.',
    visibility: 'public',
  },
  MagaryGalleria: {
    description: 'Full-screen image gallery with thumbnail navigation.',
    usage: `<magary-galleria [value]="images" [showThumbnails]="true" />`,
    examples: ['Product gallery', 'Photo album'],
    notes: 'Supports responsive options and custom item templates.',
    visibility: 'public',
  },
  MagaryGrid: {
    description: 'Drag-and-drop grid layout system. Items can be repositioned and resized.',
    usage: `<magary-grid>
  <magary-grid-item>Widget 1</magary-grid-item>
</magary-grid>`,
    examples: ['Dashboard grid', 'Custom layouts', 'Responsive grid'],
    notes: 'Based on gridstack.js. Items must be MagaryGridItem children.',
    visibility: 'public',
  },
  MagaryGridItem: {
    description: 'Individual item inside a MagaryGrid. Supports drag, resize, and position configuration.',
    usage: `<magary-grid-item [x]="0" [y]="0" [w]="4" [h]="2">Widget content</magary-grid-item>`,
    examples: ['Grid widget', 'Resizable panel'],
    notes: 'Must be a direct child of MagaryGrid.',
    visibility: 'companion',
  },
  MagaryImage: {
    description: 'Enhanced image component with lazy loading, preview, and error handling.',
    usage: `<magary-image src="photo.jpg" alt="Description" [preview]="true" />`,
    examples: ['Basic image', 'With preview', 'Error fallback'],
    notes: 'Supports lazy loading and custom error templates.',
    visibility: 'public',
  },
  MagaryInput: {
    description: 'Text input field with multiple variants: outlined, filled. Supports icons and validation.',
    usage: `<magary-input [(ngModel)]="value" placeholder="Name" />`,
    examples: ['Basic input', 'With icon', 'Password type', 'With validation'],
    notes: `Supports type="password", type="email", icons, and floating labels.`,
    visibility: 'public',
  },
  MagaryInputNumber: {
    description: 'Numeric input with increment/decrement buttons and range validation.',
    usage: `<magary-input-number [(ngModel)]="qty" [min]="0" [max]="100" />`,
    examples: ['Basic number input', 'With currency format', 'Step buttons'],
    notes: 'Supports min, max, step, and custom formatting.',
    visibility: 'public',
  },
  MagaryKanban: {
    description: 'Kanban board for drag-and-drop task management across columns.',
    usage: `<magary-kanban [columns]="boardColumns" [items]="tasks" (onMove)="handleMove($event)" />`,
    examples: ['Task board', 'Project workflow'],
    notes: 'Items can be dragged between columns. Emits move events for state management.',
    visibility: 'public',
  },
  MagaryMegaMenu: {
    description: 'Horizontal mega menu with multi-column dropdown panels.',
    usage: `<magary-megamenu [model]="menuItems" orientation="horizontal" />`,
    examples: ['Navigation menu', 'Category menu'],
    notes: 'Supports nested submenus and custom panel templates.',
    visibility: 'public',
  },
  MagaryMenubar: {
    description: 'Horizontal menu bar for application navigation with dropdown submenus.',
    usage: `<magary-menubar [model]="menuItems" />`,
    examples: ['Application menu bar', 'Editor toolbar'],
    notes: 'Each top-level item can have nested child items.',
    visibility: 'public',
  },
  MagaryMessage: {
    description: 'Inline notification message with severity levels: success, info, warn, error.',
    usage: `<magary-message severity="success" text="Operation completed" />`,
    examples: ['Success message', 'Error message', 'Closable message'],
    notes: 'Supports auto-close via life property. Use for inline feedback, not toasts.',
    visibility: 'public',
  },
  MagaryOrderList: {
    description: 'Sortable list where items can be reordered via drag-and-drop.',
    usage: `<magary-order-list [value]="items" (onReorder)="handleReorder($event)" />`,
    examples: ['Playlist reorder', 'Priority list'],
    notes: 'Each item can be dragged to a new position. Supports custom item templates.',
    visibility: 'public',
  },
  MagaryOrganizationChart: {
    description: 'Hierarchical tree visualization for organizational structures.',
    usage: `<magary-organization-chart [value]="nodes">...</magary-organization-chart>`,
    examples: ['Org chart', 'Team hierarchy'],
    notes: 'Supports expand/collapse and custom node templates.',
    visibility: 'public',
  },
  MagaryOverlayPanel: {
    description: 'Floating overlay panel that appears relative to a target element.',
    usage: `<magary-overlay-panel [visible]="show" [target]="element">Content</magary-overlay-panel>`,
    examples: ['Filter dropdown', 'Info popover'],
    notes: 'Automatically positions itself to stay within viewport bounds.',
    visibility: 'public',
  },
  MagaryPaginator: {
    description: 'Pagination control for navigating between pages of data.',
    usage: `<magary-paginator [rows]="10" [totalRecords]="100" (onPageChange)="onPage($event)" />`,
    examples: ['Basic paginator', 'With page size selector'],
    notes: 'Can be used standalone or paired with MagaryTable.',
    visibility: 'public',
  },
  MagaryPanelmenu: {
    description: 'Hierarchical accordion-style navigation menu for sidebars.',
    usage: `<magary-panelmenu [model]="menuItems" />`,
    examples: ['Sidebar navigation', 'Settings menu'],
    notes: 'Supports multiple modes and integrates with MagarySidebar.',
    visibility: 'public',
  },
  MagaryPickList: {
    description: 'Dual-list transfer component for moving items between source and target lists.',
    usage: `<magary-pick-list [source]="available" [target]="selected" />`,
    examples: ['Permission assignment', 'Column selector'],
    notes: 'Supports filtering, reordering, and drag-and-drop between lists.',
    visibility: 'public',
  },
  MagaryRadioButton: {
    description: 'Single radio button input. Use MagaryRadioGroup for exclusive selection.',
    usage: `<magary-radio-button value="option1" label="Option 1" />`,
    examples: ['Basic radio', 'Disabled radio'],
    notes: 'Typically used inside a MagaryRadioGroup parent.',
    visibility: 'public',
  },
  MagaryRadioGroup: {
    description: 'Group of radio buttons for exclusive single-value selection.',
    usage: `<magary-radio-group [(ngModel)]="selected">
  <magary-radio-button value="a" label="A" />
</magary-radio-group>`,
    examples: ['Gender selection', 'Payment method'],
    notes: 'Manages the exclusive selection state for child radio buttons.',
    visibility: 'public',
  },
  MagaryRating: {
    description: 'Star rating input for collecting user ratings from 1 to N stars.',
    usage: `<magary-rating [(ngModel)]="rating" [stars]="5" />`,
    examples: ['Basic rating', 'Disabled rating', 'Read-only rating'],
    notes: 'Supports custom star count and cancellation.',
    visibility: 'public',
  },
  MagarySegmented: {
    description: 'Segmented button group for selecting one option from a horizontal set.',
    usage: `<magary-segmented [options]="segments" [(ngModel)]="selected" />`,
    examples: ['View switcher', 'Time period selector'],
    notes: 'Each option can be a simple string or an object with label/value.',
    visibility: 'public',
  },
  MagarySelect: {
    description: 'Dropdown selector with search, filtering, and templating support.',
    usage: `<magary-select [options]="items" [(ngModel)]="selected" placeholder="Choose..." />`,
    examples: ['Basic select', 'With search', 'Multi-select'],
    notes: 'Supports option groups, custom templates, and virtual scrolling for large lists.',
    visibility: 'public',
  },
  MagarySidebar: {
    description: 'Application sidebar with navigation menus, avatar, theme switcher, and multiple layout modes.',
    usage: `<magary-sidebar [sections]="navSections" layoutMode="classic" [avatar]="userAvatar" />`,
    examples: ['Classic sidebar', 'Rail mode', 'Grid mode'],
    notes: 'The most complex component. Supports classic, rail, rail-labeled, and grid layouts.',
    visibility: 'public',
  },
  MagarySkeleton: {
    description: 'Placeholder loading animation for content that is still being fetched.',
    usage: `<magary-skeleton width="100%" height="2rem" />`,
    examples: ['Text skeleton', 'Card skeleton', 'Table skeleton'],
    notes: 'Use as a loading placeholder while data is being fetched.',
    visibility: 'public',
  },
  MagarySlideMenu: {
    description: 'Sliding panel menu that overlays from the edge of the screen.',
    usage: `<magary-slidemenu [model]="menuItems" [visible]="show" />`,
    examples: ['Mobile menu', 'Slide-out panel'],
    notes: 'Animates in from the configured edge direction.',
    visibility: 'public',
  },
  MagarySlider: {
    description: 'Range slider input for selecting a numeric value within a range.',
    usage: `<magary-slider [(ngModel)]="value" [min]="0" [max]="100" />`,
    examples: ['Basic slider', 'Range slider', 'With steps'],
    notes: 'Supports single and range modes with step increments.',
    visibility: 'public',
  },
  MagarySpeedDial: {
    description: 'Floating action button that expands to show multiple quick actions.',
    usage: `<magary-speed-dial [model]="speedDialItems" icon="plus" />`,
    examples: ['FAB with actions', 'Directional speed dial'],
    notes: 'Supports multiple directions: up, down, left, right.',
    visibility: 'public',
  },
  MagarySplitButton: {
    description: 'Button with a primary action and a dropdown arrow for additional options.',
    usage: `<magary-split-button label="Save" [model]="saveOptions" (onClick)="save()" />`,
    examples: ['Save / Save As', 'Export options'],
    notes: 'Primary click triggers the main action. Arrow opens the dropdown menu.',
    visibility: 'public',
  },
  MagarySteps: {
    description: 'Step indicator for multi-step workflows showing current progress.',
    usage: `<magary-steps [model]="steps" [activeIndex]="1" />`,
    examples: ['Checkout wizard', 'Onboarding flow'],
    notes: 'Each step can be clickable for navigation or read-only for progress display.',
    visibility: 'public',
  },
  MagarySwitch: {
    description: 'Toggle switch for boolean on/off states.',
    usage: `<magary-switch [(ngModel)]="enabled" />`,
    examples: ['Basic toggle', 'With label', 'Disabled toggle'],
    notes: 'Use for binary settings like enable/disable, on/off.',
    visibility: 'public',
  },
  MagaryTab: {
    description: 'Individual tab panel for use inside MagaryTabs. Each tab has a label and content.',
    usage: `<magary-tab label="Tab 1"><p>Tab content</p></magary-tab>`,
    examples: ['Basic tab', 'With icon'],
    notes: 'Must be used as a direct child of MagaryTabs.',
    visibility: 'companion',
  },
  MagaryTable: {
    description: 'Feature-rich data table with sorting, filtering, pagination, and custom templates.',
    usage: `<magary-table [value]="data" [columns]="cols" [paginator]="true" [rows]="10" />`,
    examples: ['Basic table', 'Sortable columns', 'With paginator', 'Custom templates'],
    notes: 'Use MagaryTableColumn for column definitions. MagaryTemplate for custom cell rendering.',
    visibility: 'public',
  },
  MagaryTabs: {
    description: 'Container for tab-based navigation. Manages active tab state.',
    usage: `<magary-tabs>
  <magary-tab label="Tab 1">Content</magary-tab>
</magary-tabs>`,
    examples: ['Basic tabs', 'Scrollable tabs'],
    notes: 'Supports horizontal scrolling when tabs overflow. Children must be MagaryTab.',
    visibility: 'public',
  },
  MagaryTag: {
    description: 'Small label/tag for categorizing, filtering, or displaying status.',
    usage: `<magary-tag severity="success" value="Active" />`,
    examples: ['Status tag', 'Filter tag', 'Removable tag'],
    notes: 'Supports severity colors and optional close/remove action.',
    visibility: 'public',
  },
  MagaryTemplate: {
    description: 'Structural directive for defining custom cell templates in MagaryTable.',
    usage: `<ng-template magaryTemplate="body" let-item><td>{{ item.name }}</td></ng-template>`,
    examples: ['Body template', 'Header template'],
    notes: 'Used with *magaryTemplate directive. Must be inside MagaryTable.',
    visibility: 'companion',
  },
  MagaryTextArea: {
    description: 'Multi-line text input for longer text content.',
    usage: `<magary-text-area [(ngModel)]="description" rows="5" placeholder="Enter text..." />`,
    examples: ['Basic textarea', 'Auto-resize', 'With character count'],
    notes: 'Supports auto-resize mode that grows with content.',
    visibility: 'public',
  },
  MagaryTieredMenu: {
    description: 'Multi-level flyout menu that opens submenus on hover.',
    usage: `<magary-tiered-menu [model]="menuItems" />`,
    examples: ['Navigation menu', 'Category drill-down'],
    notes: 'Submenus appear as flyouts on hover. Supports unlimited nesting levels.',
    visibility: 'public',
  },
  MagaryTimeline: {
    description: 'Vertical timeline for displaying chronological events or steps.',
    usage: `<magary-timeline [value]="events" />`,
    examples: ['Activity log', 'Order history', 'Process timeline'],
    notes: 'Each event can have an icon, status color, and custom content.',
    visibility: 'public',
  },
  MagaryToast: {
    description: 'Temporary notification that appears at the edge of the screen.',
    usage: `this.toastService.show({ severity: 'success', summary: 'Saved', detail: 'Changes applied' })`,
    examples: ['Success toast', 'Error toast', 'With action button'],
    notes: 'Programmatic API via MagaryToastService. Supports severity, duration, and position.',
    visibility: 'public',
  },
  MagaryToolbar: {
    description: 'Horizontal toolbar for grouping action buttons and controls.',
    usage: `<magary-toolbar>
  <magary-button label="New" icon="plus" />
</magary-toolbar>`,
    examples: ['Action toolbar', 'Editor toolbar'],
    notes: 'Provides horizontal layout for action buttons with consistent spacing.',
    visibility: 'public',
  },
  MagaryTooltip: {
    description: 'Directive that shows a floating tooltip on hover/focus over the host element.',
    usage: `<button magaryTooltip="Help text">Hover me</button>`,
    examples: ['Basic tooltip', 'Positioned tooltip', 'Disabled tooltip'],
    notes: 'Attribute directive. Supports top, bottom, left, right positioning.',
    visibility: 'public',
  },
  MagaryTree: {
    description: 'Hierarchical tree component with expand/collapse, selection, and drag-and-drop.',
    usage: `<magary-tree [value]="nodes" selectionMode="checkbox" />`,
    examples: ['File browser', 'Category tree', 'With drag-and-drop'],
    notes: 'Supports single, multiple, and checkbox selection modes. Drag-drop emits MagaryTreeNodeDropEvent.',
    visibility: 'public',
  },
  MagaryUpload: {
    description: 'File upload component with drag-and-drop support, progress indication, and file list.',
    usage: `<magary-upload name="files" url="/api/upload" (onUpload)="onUpload($event)" />`,
    examples: ['Basic upload', 'Drag-and-drop', 'Multiple files', 'With preview'],
    notes: 'Supports single and multiple file modes, custom upload URL, and file type restrictions.',
    visibility: 'public',
  },
  MagaryConfirmationService: {
    description: 'Service for showing modal confirmation dialogs programmatically.',
    usage: `const service = inject(MagaryConfirmationService);
service.confirm({ message: 'Delete item?', accept: () => deleteItem() })`,
    examples: ['Delete confirmation', 'Unsaved changes warning'],
    notes: 'Inject via Angular DI. Returns a promise that resolves on accept.',
    visibility: 'public',
  },
  MagaryThemeService: {
    description: 'Service for managing the application theme across light, dark, and custom themes.',
    usage: `const theme = inject(MagaryThemeService);
theme.setTheme('dark')`,
    examples: ['Toggle theme', 'Set custom theme', 'Detect system preference'],
    notes: 'Persists theme choice to localStorage. Supports 9 built-in themes.',
    visibility: 'public',
  },
  MagaryToastService: {
    description: 'Service for showing toast notifications from anywhere in the application.',
    usage: `const toast = inject(MagaryToastService);
toast.show({ severity: 'info', summary: 'Notice', detail: 'Action completed' })`,
    examples: ['Success notification', 'Error alert', 'With duration'],
    notes: 'Inject via Angular DI. Toasts auto-dismiss after configurable duration.',
    visibility: 'public',
  }
};
