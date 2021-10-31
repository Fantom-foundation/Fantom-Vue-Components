import FDatetimeField from '@/components/FDatetimeField/FDatetimeField.vue';
import FButton from '@/components/FButton/FButton.vue';

export default {
    title: 'FDatetimeField',
    components: FDatetimeField,
};

export const Default = () => ({
    components: { FDatetimeField },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <f-datetime-field field-size="large" label="Large" />
            <f-datetime-field label="Default" />
            <f-datetime-field field-size="small" label="Small" />
            <f-datetime-field field-size="mini" label="Mini" />
        </div>
    `,
});

export const Disabled = () => ({
    components: { FDatetimeField },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <f-datetime-field disabled field-size="large" label="Large" />
            <f-datetime-field disabled label="Default" />
            <f-datetime-field disabled field-size="small" label="Small" />
            <f-datetime-field disabled field-size="mini" label="Mini" />
        </div>
    `,
});

export const Invalid = () => ({
    components: { FDatetimeField },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <f-datetime-field invalid field-size="large" label="Large" />
            <f-datetime-field invalid label="Default" />
            <f-datetime-field invalid field-size="small" label="Small" />
            <f-datetime-field invalid field-size="mini" label="Mini" />
        </div>
    `,
});

export const Validation = () => ({
    components: { FDatetimeField, FButton },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 400px">
            <form action="" @submit="onSubmit">
                <f-datetime-field
                    :validator="validator"
                    error-message="Input 1 is required."
                    info-text="hint: foo"
                    ref="inp1"
                    label="Validate on submit"
                />
                <f-datetime-field
                    :validator="validator"
                    validate-on-change
                    error-message="Input 2 is required."
                    info-text="hint: foo"
                    ref="inp2"
                    label="Validate on change"
                />
                <f-datetime-field
                    :validator="validator"
                    validate-on-change
                    validate-on-input
                    error-message="Input 3 is required."
                    info-text="hint: foo"
                    ref="inp3"
                    label="Validate on change and input"
                />
                <br /><br />
                <f-button type="submit" size="small">Submit</f-button>
            </form>
        </div>
    `,
    methods: {
        validator(value) {
            console.log('validator', value);
            return value === '';
        },
        onSubmit(event) {
            this.$refs.inp1.validate();
            this.$refs.inp2.validate();
            this.$refs.inp3.validate();

            event.preventDefault();
        },
    },
});

export const Model = () => ({
    components: { FDatetimeField, FButton },
    template: `
        <div>
            <f-datetime-field v-model="value" />
            <f-button secondary @click.native="onButtonClick">set value to '222'</f-button>
            <span>value: {{ value }}</span>
        </div>
    `,
    data() {
        return { value: '2021-10-31T14:16' };
    },
    methods: {
        onButtonClick() {
            this.value = '2021-10-31T14:10';
        },
    },
});
