import FCard from './FCard.vue';

export default {
    title: 'FCard',
    component: FCard,
};

export const Default = () => ({
    components: { FCard },
    template: `
        <div>
            <f-card></f-card>
        </div>
    `,
});

export const DefaultSlot = () => ({
    components: { FCard },
    template: `
        <div>
            <f-card>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium deserunt doloribus eius esse eum excepturi, inventore ipsam iure laboriosam nam natus nobis non nostrum numquam placeat quos rerum tempora totam!</p>
                <p>A consequuntur corporis deleniti dolore dolorem ducimus eius, hic in ipsa iure laboriosam magnam natus obcaecati, placeat possimus provident quasi quos repudiandae sequi tenetur! Alias amet deleniti mollitia odit unde?</p>
                <p>Amet consequuntur cumque deleniti dolores et eveniet excepturi facilis fugiat id laudantium magni nam nemo, nihil, quos repellendus sapiente soluta suscipit temporibus ullam ut. Cum expedita illum minus numquam rem!</p>
                <p>Error facere, mollitia natus nemo nobis porro recusandae sit temporibus velit? Amet assumenda earum esse et facere, ipsam ipsum laboriosam nam, nesciunt nihil non nostrum omnis perspiciatis rem repellendus repudiandae.</p>
            </f-card>
        </div>
    `,
});
