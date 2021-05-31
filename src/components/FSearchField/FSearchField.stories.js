import { withA11y } from '@storybook/addon-a11y';

import FSearchField from './FSearchField.vue';
import FButton from '../FButton/FButton.vue';
import FSvgIcon from '../FSvgIcon/FSvgIcon.vue';
import IconAngleLeft from '../icons/IconAngleLeft.vue';

export default {
    title: 'FSearchField',
    component: FSearchField,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FSearchField },
    template: `
        <div>
            <f-search-field label="Large" field-size="large" name="pwd1" />
            <f-search-field label="Default" name="pwd2" value="initial text" />
            <f-search-field label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FSearchField },
    template: `
        <div>
            <f-search-field disabled label="Large" field-size="large" name="pwd1" />
            <f-search-field disabled label="Default" name="pwd2" value="initial text" />
            <f-search-field disabled label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FSearchField },
    template: `
        <div>
            <f-search-field invalid label="Large" field-size="large" name="pwd1" />
            <f-search-field invalid label="Default" name="pwd2" value="initial text" />
            <f-search-field invalid label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

/*
export const Validation = () => ({
    components: { FSearchField, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-search-field
                    ref="passwordfield"
                    :validator="validator"
                    validate-on-change
                    label="Validation"
                    name="pwd1"
                />
                <br /><br />
                <f-button type="submit" size="small">Submit</f-button>
            </form>
        </div>
    `,
    methods: {
        validator(_value) {
            return _value.length < 9 ? 'Password must be at least 8 characters long' : '';
        },
        onSubmit(_event) {
            this.$refs.passwordfield.validate();

            _event.preventDefault();
        },
    },
});
*/

export const Slots = () => ({
    components: { FSearchField, FButton, FSvgIcon, IconAngleLeft },
    template: `
        <div>
            <f-search-field label="Slot 'button'" name="pwd1">
                <template #button="slotProps">
                    <f-button secondary :size="slotProps.buttonSize" :style="{ visibility: slotProps.value ? 'visible' : 'hidden' }">
                        clear
                    </f-button>
                </template>
            </f-search-field>
            <f-search-field label="Slot 'icon'" name="pwd1">
                <template #icon>
                    <f-svg-icon size="1.2em" rotate="180deg"><icon-angle-left /></f-svg-icon>
                </template>
            </f-search-field>
        </div>
    `,
});
