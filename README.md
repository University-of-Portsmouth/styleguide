# University of Portsmouth Living Styleguide

This styleguide is for use in University of Portsmouth services. It can be found living at http://port.whealmedia.com and automatically updates when this repo changes.

The styleguide uses [Sass](http://sass-lang.com/) and is based on [Bootstrap](https://github.com/twbs/bootstrap)'s API. It is documented with [KSS](https://github.com/kss-node/kss-node). The styleguide is deployed automatically from the master branch by [Travis CI](http://travisci.org).

## Why?

One problem the University of Portsmouth has found is the lack of consistency across their services. Having a styleguide will help towards solving this problem.

This is also the reason why the styleguide is built on [Bootstrap](https://github.com/twbs/bootstrap) as this is used extensively across the University services already

## Usage

Instructions of usage of this styleguide can be found at http://port.whealmedia.com.

## Bugs, Issues, Feedback, New features

Please raise a GitHub issue for this repository.

## Developing the Styleguide

### Installation

1. Install Node >=5.0.0 and npm
2. Install dependencies: `npm install`
3. Build sass and styleguide: `npm start`

## Copyright and license

Bootstrap is licensed under the [MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).

All rights, including copyright, in the code and documentation (including, but not limited to, the University logo, and
all text, layout, graphics, video and audio material and artwork) are owned or controlled for these purposes by the
University of Portsmouth unless otherwise stated.

In accessing this repository, you agree that you may only download the content for your own personal
non-commercial use. The material on these web pages should not be used, copied, stored or transmitted outside the
University without the prior written consent of the University or in accordance with the Copyright, Designs and Patents
Act 1988.

## Linting

SCSS-Lint is carried out automatically on a Pull Request via Hound. To test linting locally the following must be done:

1. Install Ruby 1.9.3+ and Sass 3.4.20+
2. Install SCSS-Lint `gem install scss_lint`
3. Run linting script `npm run lint`

_Consider using a SCSS-Lint plugin in your editor/IDE_