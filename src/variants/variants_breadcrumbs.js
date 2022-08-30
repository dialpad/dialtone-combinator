export default {
  default: {
    props: {
      breadcrumbs: {
        defaultValue: [
          { label: 'Root', href: '#' },
          { label: 'Section', href: '#' },
          { label: 'Section', href: '#' },
          { label: 'Section', href: '#' },
          { label: 'Current Page', href: '#', selected: true },
        ],
      },
    },
  },
};
