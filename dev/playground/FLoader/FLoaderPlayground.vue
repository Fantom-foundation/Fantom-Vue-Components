<template>
    <section>
        <h3>Default</h3>
        <f-loader />

        <h3>text <button @click="toggle('l1')">Toggle</button></h3>
        <f-loader ref="l1" text="Loading..." />

        <h3>animations <button @click="toggle('l2')">Toggle</button></h3>
        <f-loader
            ref="l2"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            text="Loading..."
            style="text-align: center"
        />

        <h3>visible <button @click="l3Visible = !l3Visible">Toggle</button></h3>
        <f-loader
            ref="l3"
            :visible="l3Visible"
            animation-in="fade-enter-active"
            animation-out="fade-leave-active"
            text="Loading..."
        />

        <h3>fixed, append-to: body <button @click="toggle('l4')">Toggle</button></h3>
        <f-loader ref="l4" fixed with-overlay append-to="body" text="Loading..." />

        <!--        <h3>Absolute, parent: parent</h3>-->

        <div>
            <p class="co-grey-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam commodi consequatur cupiditate,
                deleniti, eligendi id iusto laboriosam molestiae odit pariatur quaerat quam quas repudiandae sint sunt
                vitae. Id, quibusdam!
            </p>
            <p class="co-grey-4">
                Alias aliquid amet aperiam debitis dicta ipsam, magni obcaecati voluptatem? Delectus, dicta facilis hic
                id in laborum libero nobis quae qui veniam. Eum maiores natus officiis pariatur quisquam sint totam!
            </p>
            <p class="co-grey-4">
                Adipisci alias aliquam animi aperiam atque blanditiis consequatur dicta distinctio dolorem dolorum error
                est eum illum ipsa magni mollitia nobis perspiciatis quam quibusdam quidem quod rem suscipit tenetur, ut
                vel?
            </p>
            <p class="co-grey-4">
                Accusamus aliquid animi aspernatur atque consequatur cum dolor doloribus eius est ex laboriosam, laborum
                minus modi nemo placeat quasi quisquam ratione recusandae repellendus reprehenderit repudiandae sequi,
                sunt totam veritatis, vero!
            </p>
            <p class="co-grey-4">
                Aliquid asperiores at consequatur culpa cum debitis delectus dolore, error hic illum impedit libero
                magnam odit, perspiciatis quam quo reiciendis ullam voluptate? Ad commodi eligendi ipsam magnam nulla
                odio quod!
            </p>
            <p class="co-grey-4">
                Accusamus aut consectetur consequuntur culpa dicta dignissimos dolorum ducimus et incidunt inventore
                iste itaque maiores minus modi mollitia odio odit officiis optio quae saepe tempora, temporibus vero?
                Est recusandae, reprehenderit.
            </p>
            <p class="co-grey-4">
                Alias aperiam architecto cumque ipsa iusto magni necessitatibus reprehenderit! Adipisci aliquid animi
                atque, cumque debitis dicta enim laborum mollitia nihil odio officiis quidem quos reprehenderit sequi
                similique totam vel. Recusandae!
            </p>
            <p class="co-grey-4">
                Accusamus aliquam consequuntur debitis ducimus exercitationem illo repellat sequi veritatis. Beatae
                cumque dolores earum harum in inventore ipsa iste, itaque labore, modi nisi nostrum possimus, provident
                quas repudiandae veniam voluptas.
            </p>
            <p class="co-grey-4">
                Animi dicta impedit labore nihil nobis pariatur, provident quam quasi quisquam quo soluta sunt tempore
                voluptate? Animi consectetur dolore incidunt itaque libero qui, quod sint ullam voluptatem voluptates.
                Delectus, dicta?
            </p>
            <p class="co-grey-4">
                At delectus distinctio error ipsa minus nisi odit rem sapiente sunt voluptate? Adipisci aliquam
                architecto autem corporis, dolores doloribus facilis iure laborum nesciunt nostrum perferendis quibusdam
                sed sequi unde voluptates?
            </p>
            <p class="co-grey-4">
                Delectus illo nisi non voluptatum! Atque blanditiis, culpa delectus dolor eaque earum eos fugiat id
                magnam magni nihil non numquam obcaecati placeat provident quae quia ratione soluta veritatis vitae
                voluptate!
            </p>
            <p class="co-grey-4">
                Alias cumque est facilis impedit neque odit quam quod recusandae! Accusamus aliquam dolor non obcaecati
                possimus quam quas rerum velit. Commodi distinctio ipsa ipsum laboriosam quia ratione soluta veniam
                voluptatem.
            </p>
            <p class="co-grey-4">
                Deserunt excepturi magnam odit ratione repellendus? Ad aliquid blanditiis culpa cum cumque delectus
                doloribus et exercitationem fugiat, in ipsa ipsum odit perspiciatis quam, quas quo ullam unde, veritatis
                voluptate voluptatem!
            </p>
            <p class="co-grey-4">
                Autem delectus minima molestias nostrum obcaecati porro repellendus reprehenderit? Distinctio dolorum
                fugit nesciunt perspiciatis quia? Aspernatur commodi consectetur dolorum ducimus exercitationem ipsa
                odit ratione sint tempore voluptate. Ea, facilis similique.
            </p>
            <p class="co-grey-4">
                Ab animi corporis deleniti dignissimos, dolorem eius error excepturi, exercitationem explicabo facere,
                illo iste nesciunt nobis perspiciatis praesentium quam similique sit tempora. Ab aliquid, eos id itaque
                quam quibusdam tempora?
            </p>
            <p class="co-grey-4">
                Animi eius laudantium quidem saepe sequi. Adipisci aspernatur dolorum quasi soluta voluptas? Accusamus
                autem, consequatur consequuntur dolore error eum ex excepturi exercitationem maxime numquam quae quaerat
                quos recusandae sit unde.
            </p>
            <p class="co-grey-4">
                Assumenda at culpa cupiditate debitis deleniti deserunt eum ex facere, ipsum iste labore magni modi nam
                obcaecati odio possimus praesentium quos recusandae repudiandae rerum sed sit ut voluptates. Nihil,
                sequi!
            </p>
            <p class="co-grey-4">
                Dolorem molestias officiis possimus quod veritatis voluptatum. Amet animi architecto assumenda
                consequuntur deserunt earum eligendi explicabo itaque, maiores, minus praesentium quaerat quibusdam
                quidem quos repellat rerum sed tenetur veniam! Aliquam.
            </p>
            <p class="co-grey-4">
                Aliquam aliquid autem blanditiis commodi consequuntur cum deserunt eligendi eos explicabo iusto laborum
                nemo neque quam quidem, quis sit temporibus, voluptate! Adipisci assumenda excepturi ipsa laboriosam
                molestias porro qui unde.
            </p>
            <p class="co-grey-4">
                Adipisci architecto corporis enim eveniet nam numquam quae, unde. Amet autem cum, eius eos
                necessitatibus optio repudiandae veniam vero. Amet consectetur et soluta? Alias assumenda ea libero,
                natus tenetur vel!
            </p>
            <p class="co-grey-4">
                Dolorum minus non optio? Accusamus assumenda consequatur delectus explicabo, facilis non praesentium
                quia. Animi aut, doloremque dolorum earum facilis harum in nisi provident quaerat, quidem reprehenderit
                sed sequi tenetur velit.
            </p>
            <p class="co-grey-4">
                Cum dignissimos ducimus eveniet expedita hic illo ipsam neque nihil nisi, optio quaerat quas quos rerum
                sit vel veniam vero. Beatae nam omnis velit vitae! Alias deleniti esse iusto minus.
            </p>
            <p class="co-grey-4">
                Aut dignissimos dolor doloremque expedita hic pariatur sit soluta veritatis? Architecto asperiores
                consequuntur cupiditate deleniti deserunt laborum minus, nam quisquam repudiandae tempore temporibus
                veritatis voluptates? Deserunt explicabo molestiae quia sed.
            </p>
            <p class="co-grey-4">
                At eum nostrum provident? Cum magnam maxime natus obcaecati voluptas. Asperiores deleniti et molestias
                possimus quasi repellendus reprehenderit soluta velit. Asperiores dolor minus modi nesciunt officiis
                quia quis reiciendis rem!
            </p>
            <p class="co-grey-4">
                Repudiandae sapiente sunt totam. Accusamus aperiam beatae cupiditate debitis dignissimos dolore error
                est expedita fugiat, fugit id illum ipsa minima molestiae officia officiis, pariatur perferendis, quae
                sed sunt veritatis vitae?
            </p>
            <p class="co-grey-4">
                Alias architecto, asperiores assumenda commodi cumque deserunt facilis illum incidunt laborum laudantium
                magni maiores minima natus, nobis nostrum numquam officia omnis pariatur perferendis, quia quis
                repellendus sunt tenetur voluptatibus voluptatum.
            </p>
            <p class="co-grey-4">
                Ab amet architecto asperiores consectetur cumque deserunt dolor dolorum earum error expedita fugiat
                impedit ipsa ipsam iste itaque, iure laudantium nemo officiis provident quaerat, quas quia quidem sequi
                suscipit vero.
            </p>
            <p class="co-grey-4">
                At corporis distinctio, eos magnam molestias numquam placeat quas quisquam quo, ut velit voluptates? Ea
                expedita libero modi perferendis, quaerat ratione voluptatum! At corporis dolores eaque laborum nisi
                numquam sunt?
            </p>
            <p class="co-grey-4">
                Asperiores delectus ea facere fuga illum labore minima neque nulla, soluta voluptates? Deleniti dicta
                dolor enim eos facilis, fugiat ipsa laboriosam magnam molestiae nam officia praesentium ratione voluptas
                voluptatem voluptates.
            </p>
            <p class="co-grey-4">
                Ad asperiores assumenda esse hic laboriosam laudantium neque qui vero? Accusantium ad, beatae,
                consectetur consequatur debitis dicta dolorum eaque inventore itaque magnam nemo non numquam, placeat
                repellat sint? Nesciunt, voluptates!
            </p>
            <p class="co-grey-4">
                Alias aliquam at corporis cum cumque ea fugiat, harum iusto laboriosam magni minus molestiae nam natus
                nulla obcaecati odit optio sequi similique suscipit unde veniam voluptatem voluptates! Fuga, possimus,
                rem?
            </p>
            <p class="co-grey-4">
                Accusantium ad aliquid commodi eaque esse, exercitationem facilis fugiat illum, incidunt iste iure
                minus, necessitatibus neque obcaecati perferendis possimus quaerat quasi repellat reprehenderit sint
                tenetur vel vero vitae? Libero, possimus.
            </p>
            <p class="co-grey-4">
                Consequuntur corporis deleniti eos excepturi illum, laudantium nihil odit sint tempore totam. Autem
                cupiditate dolore eius iure nisi. Animi architecto excepturi hic inventore iure maiores natus nemo odio
                omnis, possimus.
            </p>
            <p class="co-grey-4">
                A ad, aspernatur blanditiis consectetur dignissimos est eveniet illo ipsa minima repellendus veritatis,
                voluptas voluptatem voluptates? Animi architecto corporis, dolorem eligendi esse, et odio odit porro
                sequi ullam voluptate voluptatum?
            </p>
            <p class="co-grey-4">
                Amet assumenda cumque doloribus expedita fuga quasi quidem suscipit. Atque dicta dignissimos eum in
                laudantium odio officia! Magni maiores perferendis quae sit voluptates! Beatae consequuntur eos quis rem
                velit! Eligendi!
            </p>
            <p class="co-grey-4">
                Ab accusantium aspernatur dolorum et facere quis quod reprehenderit sed velit. A ab adipisci at cumque
                dignissimos doloribus excepturi itaque iusto magnam minus, modi, natus odio pariatur placeat sunt
                tenetur?
            </p>
            <p class="co-grey-4">
                Consectetur delectus deserunt est eum id in, ipsa maiores odit porro quae quam qui quis recusandae
                repudiandae sequi sunt voluptas? Itaque, molestias, voluptatibus. Amet aperiam, aspernatur atque in
                ipsum recusandae?
            </p>
            <p class="co-grey-4">
                Asperiores atque beatae consectetur cumque deserunt dolor, dolore, enim ex excepturi ipsum itaque iure
                labore laudantium, molestias nesciunt placeat porro provident ratione repellendus reprehenderit rerum
                suscipit temporibus vel veritatis vitae.
            </p>
            <p class="co-grey-4">
                Aspernatur, eos labore modi nisi nostrum pariatur quo similique. A ab at atque consequuntur culpa
                delectus, doloribus ducimus ea eius error et illo illum laudantium mollitia neque, nihil officiis
                repellendus.
            </p>
            <p class="co-grey-4">
                Alias autem cumque doloribus ducimus earum eos et facilis ipsam ipsum laborum libero maiores modi
                molestias natus nisi, nostrum pariatur possimus quae quis reiciendis sint sunt temporibus velit vero
                voluptatem!
            </p>
            <p class="co-grey-4">
                Aperiam debitis dolores doloribus illum iusto magnam modi, necessitatibus nesciunt quos voluptas!
                Facilis, fuga, sed? Accusantium blanditiis, exercitationem harum ipsum necessitatibus non omnis
                perspiciatis qui! Aut ducimus magnam maxime nam!
            </p>
            <p class="co-grey-4">
                Aliquid assumenda beatae culpa cum cumque delectus deleniti dignissimos dolor earum eos eveniet fugiat
                harum, laborum numquam obcaecati omnis perferendis quam quos repellat sapiente similique tempora
                temporibus totam vero voluptatum?
            </p>
        </div>
    </section>
</template>

<script>
import FLoader from '@/components/FLoader/FLoader.vue';

export default {
    name: 'FLoaderPlayground',

    components: { FLoader },

    data() {
        return {
            l3Visible: false,
        };
    },

    methods: {
        toggle(_ref) {
            const loader = this.$refs[_ref];

            console.log(loader);
            if (loader) {
                loader.toggle();
            }
        },
    },
};
</script>
