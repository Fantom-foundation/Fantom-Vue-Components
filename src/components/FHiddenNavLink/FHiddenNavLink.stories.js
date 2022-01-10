import FHiddenNavLink from '@/components/FHiddenNavLink/FHiddenNavLink.vue';

export default {
    title: 'FHiddenNavLink',
    components: FHiddenNavLink,
};

export const Default = () => ({
    components: { FHiddenNavLink },
    //language=HTML
    template: `
        <div style="max-width: 400px; margin: 0 auto">
            <f-hidden-nav-link to="content">Skip to content</f-hidden-nav-link>
            <p><button>button 1</button></p>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate?</div><div>Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias?</div><div>Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit?</div><div>Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate?</div><div>Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias?</div><div>Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit?</div><div>Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate.</div>
            <nav id="content" tabindex="-1"></nav>
            <p><button>button 2</button></p>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut dolorum et inventore quidem unde, vitae? Aliquid, cupiditate error eveniet impedit iste maiores nemo porro provident quasi quod totam voluptate?</div><div>Asperiores consequatur culpa deserunt doloremque eius excepturi exercitationem iusto molestias, nihil officiis perferendis possimus, quo, sapiente sequi ut. Ad blanditiis consectetur ea exercitationem fugiat laborum maiores maxime, nostrum numquam! Molestias?</div><div>Ab alias, amet at deleniti fugit ipsa laboriosam laudantium libero maxime modi molestias natus nihil, odio officiis repudiandae sapiente sequi, sint suscipit vitae voluptatem! Assumenda consectetur eius eligendi nulla velit?</div><div>Architecto cum error provident quae repudiandae soluta vero. Ad aliquid asperiores assumenda distinctio dolor ex facere illum libero magni natus neque, officia officiis perspiciatis possimus quia sapiente veritatis vitae voluptate.</div>
        </div>
    `,
});
