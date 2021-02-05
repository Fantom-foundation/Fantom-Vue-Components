import { getNestedProp } from '../utils/index.js';
import { enTranslations } from '../locales/en.js';

class Translations {
    constructor() {
        /** Keys are language codes, values are tranlsation objects */
        this.translations = {};
        /** Current locale */
        this.locale = {
            code: '',
        };
    }

    /**
     * Add new translations
     *
     * @param {string} _locale
     * @param {object} _translations
     */
    add(_locale, _translations) {
        this.translations[_locale] = _translations;
    }

    /**
     * @param {string} [_locale]
     */
    setLocale(_locale = 'en') {
        this.locale.code = _locale;
    }

    /**
     * Get translation by code
     *
     * @param {string} _tCode
     * @return {string}
     */
    _(_tCode) {
        const translations = this.translations[this.locale.code];
        const translation = translations ? getNestedProp(translations, _tCode) : '';

        if (!translation) {
            console.warn(`No translation for '${_tCode}' and for locale ${this.locale.code} exists.`);
        }

        return translation || _tCode;
    }
}

export const translations = new Translations();

translations.add('en', enTranslations);
translations.setLocale();

export const translationsMixin = {
    data() {
        return {
            _locale_: translations.locale,
        };
    },

    methods: {
        _(_tCode) {
            return translations._(_tCode);
        },
    },
};
