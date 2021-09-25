import FDetails from '@/components/FDetails/FDetails.vue';

export default {
    title: 'FDetails',
    components: FDetails,
};

export const Default = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-details label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </f-details>
        </div>
    `,
});

export const Open = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-details open  label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </f-details>
        </div>
    `,
});

export const Transition = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-details style="--fdetails-transitions-length: 1s; --fdetails-transitions-func: ease-in-out;"  label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </f-details>
        </div>
    `,
});

export const Slots = () => ({
    components: { FDetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-details label="Label">
                <template #label><b>Label</b></template>
                <template #icon><b>:</b></template>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </f-details>
        </div>
    `,
});
