<template>
    <div>
        <p>
            {{ _('fwindow.closeWindow') }} <f-button @click.native="setLocale('cs')">cs</f-button>
            <f-button @click.native="setLocale('en')">en</f-button>
        </p>
    </div>
</template>

<script>
import { translations, translationsMixin } from '@/mixins/translations.js';
import FButton from '@/components/FButton/FButton.vue';
import { csTranslations } from './tmp.js';

translations.add('cs', csTranslations);

export default {
    name: 'TranslationsPlayground',

    components: { FButton },

    mixins: [translationsMixin],

    data() {
        return {
            eee: false,
        };
    },

    methods: {
        setLocale(_locale) {
            translations.setLocale(_locale);
        },
    },
};
</script>
