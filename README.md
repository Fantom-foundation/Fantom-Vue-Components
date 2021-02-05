# Fantom Vue Components

Library of various Vue 2 components with focus on accessibility.

## Installation
```bash
npm install
```

## Demo with docs
```bash
npm run storybook
```

[Live demo/docs](https://fantom-foundation.github.io/Fantom-Vue-Components/)

## Playground
```bash
npm run serve
```

## Localization

Localization files can be found in `src/locales` directory.

If you want to add your own translations or overwrite existing one, do something like:
```javascript
import { translations } from 'src/mixins/translations.js';
import { myTranlsations } from 'mytranslations.js';

// add new translations (follow structure of translation object from files in the `src/locales` directory)
translations.add('cs', myTranslations);
```

If you want to change locale, do something like:
```javascript
import { translations } from 'src/mixins/translations.js';

// change locale (default is 'en')
translations.setLocale('cs');
```
