# Future Additions

## Icon Control

A control could be added to allow quick selection of icons for the user.

### Implementation

Currently, all the library components and icons are passed to a single `library` prop. 
Another prop `iconLibrary` could be implemented to allow icons to be passed in separately.

The `library` prop and the `iconLibrary` prop could be merged and passed to the renderer.
The `iconLibrary` prop could be passed to the icon control to allow.

To know which members to allow the icon control, a custom `@icon` tag could be added
to the dialtone-vue documentation. If a slot contains this `@icon` tag in its documentation
it should allow either the default 'slot' control or 'icon' control to be selected, with
the 'icon' control as the default.

This can be implemented using `getSlotControls()` in option_bar.vue.

## Class Control

A control that allows quick selection and suggestions of dialtone utility classes.

## Implementation

Currently, the user can usually pass a string, array, or object to a 'class' prop
(based on the prop type).

A 'class' control could be implemented to replace these 3 controls for each class prop.

A good idea would be to use the 'combobox with multiselect' Dialtone Vue recipe and
somehow provide a list of all the dialtone utility classes as suggestions.

There should also be functionality to allow the user to type in non dialtone classes
which I think is already supported by the component.

To know which members to allow the icon control, a custom `@class` tag could be added
to the dialtone-vue documentation. If a prop contains this `@class` tag in its documentation
it should disallow selection of the 'string' 'array' and 'object' controls and
allow the 'class' control to be selected with 'class' being the default.

This can be implemented using `getBindingControls()` in option_bar.vue, possibly even
a new `getPropControls()` could be implemented to abstract the logic since
this will only be possible for props.


