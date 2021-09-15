import FAppTheme from './FAppTheme.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FAppTheme',
    component: FAppTheme,
};

export const Default = () => ({
    components: { FAppTheme },
    template: `
        <div>
            <f-app-theme />
        </div>
    `,
});

export const Container = () => ({
    components: { FAppTheme },
    template: `
        <div>
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <f-app-theme container="#test" />
        </div>
    `,
});

export const Theme = () => ({
    components: { FAppTheme },
    template: `
        <div >
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <f-app-theme theme="theme-dark" container="#test" />
        </div>
    `,
});

export const Animate = () => ({
    components: { FAppTheme, FButton },
    template: `
        <div>
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <f-button label="theme-default" @click.native="setTheme('theme-default')" />
            <f-button label="theme-dark" @click.native="setTheme('theme-dark')" />

            <f-app-theme animate container="#test" />
        </div>
    `,
    methods: {
        setTheme(theme) {
            FAppTheme.setTheme(theme);
        },
    },
});

export const Themes = () => ({
    components: { FAppTheme, FButton },
    template: `
        <div>
            <p id="test" class="pa-5"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error explicabo fugit libero quaerat sapiente sed sunt ut velit! Architecto officia quam similique suscipit! Dolorem dolorum exercitationem fugiat pariatur tempore!</span><span>Ad commodi consequatur consequuntur delectus deserunt dolor doloribus, fugit ipsam laboriosam magni maiores maxime nemo numquam odit quam ratione sint suscipit velit vero voluptatibus? Accusamus autem delectus nobis numquam voluptas.</span></p>

            <p>theme: {{ theme }}</p>

            <f-button label="theme-default" @click.native="setTheme('theme-default')" />
            <f-button label="theme-dark" @click.native="setTheme('theme-dark')" />
            <f-button label="theme-foo" @click.native="setTheme('theme-foo')" />

            <f-app-theme :themes="['theme-default', 'theme-dark', 'theme-foo']" @theme-set="onThemeSet" animate container="#test" />
        </div>
    `,
    data() {
        return {
            theme: 'theme-default',
        };
    },
    methods: {
        setTheme(theme) {
            FAppTheme.setTheme(theme);
        },
        onThemeSet(theme) {
            this.theme = theme;
        },
    },
});
