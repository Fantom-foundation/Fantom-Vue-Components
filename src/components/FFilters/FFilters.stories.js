import FFilters from './FFilters.vue';
import FFormInput from '@/components/FFormInput/FFormInput.vue';

export default {
    title: 'FFilters',
    component: FFilters,
};

export const Default = () => ({
    components: { FFilters, FFormInput },
    template: `
        <div>
            <f-filters @submit="data = { ...$event, event: undefined, form: undefined }">
                <f-form-input type="text" :throttle-input-interval="150" placeholder="Search..." name="search" />
                <f-form-input type="combobox" select-mode label="combobox" name="combobox" :data="[
                    { label: '---', value: '' },
                    { label: 'Option 1', value: '10' },
                    { label: 'Option 2', value: '20' },
                    { label: 'Option 3', value: '30' },
                ]" />
            </f-filters>
            <pre class="fos-4 pat-5">{{ data }}</pre>
        </div>
    `,
    data() {
        return {
            data: {},
        };
    },
});
