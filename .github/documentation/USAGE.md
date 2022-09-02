# Usage

The purpose of this document is to instruct how to implement Dialtone Combinator in an external project.

`$COMPONENT$` represents the component you want to combinate™ from Dialtone Vue.

## Combinator
_Required_

### Import

The combinator, a target component, and the Dialtone Vue component documentation
must be imported to use the combinator.

The documentation is provided from the consumer's Dialtone Vue so that it is up to
date with the version they are using.

```js
import documentation from '.../node_modules/@dialpad/dialtone-vue/dist/component-documentation.json';
import { $COMPONENT$ } from '@dialpad/dialtone-vue';
import { DtcCombinator } from '@dialpad/dialtone-combinator';
```

*Ideally component-documentation should be included as an export in dialtone-vue, 
but it isn't currently, so it has to be imported using the node_modules path.

### Use

```vue
<dtc-combinator 
  :component="$COMPONENT$"
  :documentation="documentation"
/>
```

## Component Library
_Optional_, _Recommended_

A library _should_ be provided to allow rendering of external components
in slots, such as Dialtone Vue components or icons.

Without the library, only html content and native Vue components
can be compiled in the renderer.

The `library` prop requires a single layered object with key-value pairs
of export name and component definition, respectively.

*Example using DtButton as target component, and Dialtone Vue components
in the library (no icons).

### Import

```js
import documentation from '.../node_modules/@dialpad/dialtone-vue/dist/component-documentation.json';
import * as dialtoneVue from '@dialpad/dialtone-vue';
import { ref } from 'vue';
```

### Use

```vue
<dtc-combinator 
  :component="dialtoneVue.DtButton"
  :documentation="documentation"
  :library="dialtoneVueComponents"
/>
```

```vue
<script setup>
  const dialtoneVueComponents = ref(
    Object.fromEntries(
      Object.entries(dialtoneVue).filter(([exportName]) => {
        return exportName.startsWith('Dt');
      }),
    ),
  );
</script>
```

### Caveats

Since dialtone icons are not exported in a bundle, there is some sorcery required
to provide them as a library. For implementing this, check out 'App.vue' (using require) or
the dialtone project 'client.js' vuepress config file (import from internal dialtone icon data).

## Variant Bank
_Optional_

A storage of shared variants can be imported to use with the combinator.

*Example using DtButton as target component

### Import

```js
import documentation from '.../node_modules/@dialpad/dialtone-vue/dist/component-documentation.json';
import { variantBank } from '@dialpad/dialtone-combinator';
import { DtButton } from '@dialpad/dialtone-vue';
import { ref } from 'vue';
```

### Use

```vue
<dtc-combinator 
  :component="DtButton"
  :documentation="documentation"
  :variants="componentVariants"
/>
```

```vue
<script setup>
  const componentVariants = ref(variantBank.DtButton);
</script>
```

## Blueprint Mode

Blueprint mode can be activated to remove the sidebar and settings and just show the
renderer/code panel split view.

```vue
<dtc-combinator
  ...
  :blueprint="true"
/>
```

## Styling

Additional styling classes can be given to the header and root sections
of the combinator.

```vue
<dtc-combinator
  ...
  header-class="d-py32"
  root-class="d-px32"
/>
```
