// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FPasswordField from './FPasswordField.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FPasswordField',
    component: FPasswordField,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <f-password-field label="Large" field-size="large" name="pwd1" />
            <f-password-field label="Default" name="pwd2" />
            <f-password-field label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <f-password-field disabled label="Large" field-size="large" name="pwd1" />
            <f-password-field disabled label="Default" name="pwd2" />
            <f-password-field disabled label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <f-password-field invalid label="Large" field-size="large" name="pwd1" />
            <f-password-field invalid label="Default" name="pwd2" />
            <f-password-field invalid label="Small" field-size="small" name="pwd3" />
        </div>
    `,
});

export const Validation = () => ({
    components: { FPasswordField, FButton },
    template: `
        <div>
            <form action="" @submit="onSubmit">
                <f-password-field
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

export const Slots = () => ({
    components: { FPasswordField, FButton },
    template: `
        <div>
            <f-password-field label="Slot 'button'" name="pwd1">
                <template #button="slotProps">
                    <f-button secondary :size="slotProps.buttonSize">
                        <span v-if="slotProps.type === 'password'">show</span>
                        <span v-else-if="slotProps.type === 'text'">hide</span>
                    </f-button>
                </template>
            </f-password-field>
            <f-password-field label="Slot 'icon'" name="pwd1">
                <template #icon="{ type }">
                    <span v-if="type === 'password'">show</span>
                    <span v-else-if="type === 'text'">hide</span>
                </template>
            </f-password-field>
        </div>
    `,
});

export const InfoText = () => ({
    components: { FPasswordField },
    template: `
        <div>
            <f-password-field info-text="Enter a password please" label="Password" name="pwd2" />
        </div>
    `,
});
