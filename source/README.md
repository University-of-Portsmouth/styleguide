# Overview

Many services within the University are currently using [Bootstrap](https://github.com/twbs/bootstrap) and therefore this styleguide is built on top of it.

This styleguide has been generated with [KSS](https://github.com/kss-node/kss-node) and is automatically built using [Travis](http://travisci.org) on commit to the master branch. You can view its associated GitHub repository [here](https://github.com/University-of-Portsmouth/styleguide).

## How to use

To get started please select a component from the sidebar.

*TBC*

## How to contribute

The `source/` folder contains all the elements of the styleguide. Avoid editing the other files or folders - these are used to generate this styleguide.

The project has the following structure:

```
source/
├── components/
│   ├── component1/
│   │   └── component1.scss
│   │   └── component1.html
│   └── component2/
│       └── component2.scss
│       └── component2.html
├── core/
│   ├── component1/
│   │   └── component1.scss
│   │   └── component1.html
│   └── component2/
│       └── component2.scss
│       └── component2.html
├── _variables.scss
└── main.scss
```

The `main.scss` file imports all the components. For example:

```scss
@import "components/button/button";
```

Each component is stored in its own separate folder containing the scss and and an html example.

The styleguide is generated from comments at the top of the scss file.

```scss
// Button
//
// Your standard button suitable for clicking.
//
// :hover   - Highlights when hovering.
// .shiny   - Do not press this big, shiny, red button.
//
// Markup: button.html
//
// Style guide: components.button
.button {
  ...
}
.button.shiny {
  ...
}
```

The example above is a basic button component. The first line is the component name followed by a description. Next, two modifier are specified followed by the name of an example markup file (*for convention, this file name should be identical to the scss file name*). Finally, the components name and location in the styleguide is specified.

To learn more [refer to the extensive KSS documentation](https://github.com/kss-node/kss/blob/spec/SPEC.md).
