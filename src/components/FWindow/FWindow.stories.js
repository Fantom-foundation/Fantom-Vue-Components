// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withA11y } from '@storybook/addon-a11y';

import FWindow from './FWindow.vue';
import FInput from '../FInput/FInput.vue';
import FButton from '../FButton/FButton.vue';

export default {
    title: 'FWindow',
    component: FWindow,
    decorators: [withA11y],
};

export const Default = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window
                modal
                title="Default window"
                style="max-width: 500px;"

                ref="win"
            >
                <div>
                    <f-input name="t1" label="Input 1" />
                    <f-input name="t2" label="Input 2" />
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolor ducimus enim impedit minima molestias quae qui! At culpa cum debitis explicabo harum ipsa, ipsam modi nemo, nostrum porro rerum.</div><div>Deleniti eaque error, eum incidunt ipsum labore nobis obcaecati omnis qui sequi soluta unde. Accusamus, dignissimos doloremque, enim, est eveniet excepturi in iusto maiores odit officiis ratione repudiandae velit voluptatibus!</div><div>Ab aliquam architecto consectetur culpa delectus deserunt dicta doloremque esse facere illo iure libero maiores modi, quis reprehenderit sunt vel vero voluptas. A cumque, eius fuga officiis quo soluta vitae!</div><div>Ab accusamus aspernatur cum cupiditate debitis delectus dignissimos dolores ea eaque, exercitationem facere in libero neque nobis non numquam pariatur perspiciatis porro ratione recusandae sint suscipit tempora tempore voluptates voluptatum!</div><div>Incidunt officia, rem repellendus sapiente velit vero. Blanditiis consequuntur delectus distinctio dolores doloribus eius, esse est impedit in ipsam laudantium natus odio perferendis possimus saepe sit soluta velit voluptate voluptatem?</div>
            </f-window>

            <div style="padding-top: 100px">
                <f-button @click.native="$refs.win.show()">show</f-button>

                <div style="opacity: 0.5">
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa delectus dolorum earum facere impedit in incidunt libero magnam officiis rem soluta, tempore ullam vero voluptate? Minus, quia, sed? Fugit?</div><div>Alias, aliquid aut debitis dignissimos dolor, dolore dolorem dolorum enim et exercitationem id modi mollitia nisi nobis quam qui quis recusandae sapiente sit tempore tenetur vel, veritatis vitae voluptates voluptatum.</div><div>Aliquam aut doloremque dolorum in labore minus necessitatibus nemo, tempora tempore voluptate. A, aperiam consequatur dolore doloribus fuga nobis sunt vero voluptatum? Cumque deleniti doloribus voluptates? Expedita maxime quis repudiandae?</div><div>Autem dolorum illum, libero magnam nostrum tempora tempore. Asperiores at debitis earum, harum nemo optio? Aut corporis expedita illo officiis perferendis. Culpa explicabo id, nihil porro quae reiciendis reprehenderit voluptates.</div><div>Amet dolore dolores inventore labore laborum minus modi molestiae nesciunt, nihil perspiciatis quaerat quas quos sit, tenetur unde. Ab consectetur distinctio dolores quae quaerat. Blanditiis nemo quidem sunt totam veritatis?</div><div>A amet consequatur cumque ea error excepturi, explicabo impedit itaque, libero modi neque non, numquam omnis quia ratione sit velit? Delectus esse eum fuga quam quibusdam ratione repellendus tempora vitae!</div><div>Ab accusamus adipisci assumenda blanditiis commodi consequatur cum eius eveniet facere illo ipsum iste labore libero maiores, odio officiis omnis, porro quae quam quia quod rem repudiandae rerum voluptatem, voluptatum.</div><div>Accusamus ad consequatur debitis ea eaque exercitationem inventore, laudantium natus nobis, praesentium quas tempora ut voluptas. Accusantium consectetur explicabo id labore libero molestiae quo sit soluta suscipit vel. Eaque, maiores?</div><div>A accusamus aliquid amet at autem cum dolores ducimus fugit ipsum, laboriosam magnam minus molestias nostrum optio qui quisquam totam veniam. Distinctio dolore fuga, fugit inventore labore magni nostrum vero.</div><div>Aliquid at atque aut, cumque dolor doloribus, dolorum ducimus eaque eos eveniet iste maiores maxime necessitatibus nemo quam quo reiciendis repudiandae similique voluptate voluptatem. Culpa ducimus eius et libero ratione!</div><div>Accusamus, architecto asperiores cumque deleniti dignissimos dolores doloribus earum enim eos est expedita in, incidunt iusto libero magnam molestiae neque quos, recusandae repellat repudiandae temporibus tenetur totam veritatis. Nesciunt, tempore?</div><div>Ab animi aspernatur autem deleniti dolor eos error excepturi exercitationem ipsam, ipsum iste iure iusto nam necessitatibus nisi obcaecati optio perspiciatis quaerat quis quos recusandae sed suscipit totam, velit, vero!</div><div>A aliquam, consequatur consequuntur excepturi illo magnam natus officia pariatur possimus provident rem repellendus tenetur unde. Assumenda, beatae dolorem enim hic inventore magnam provident quaerat reprehenderit rerum. Earum, fuga, nulla!</div><div>Assumenda eius enim expedita facilis labore minima odio officiis pariatur provident quam ratione, totam! Ad aliquam culpa deserunt doloremque ducimus, error fuga ipsam, nobis quam quas qui repellat vel voluptatibus?</div><div>Asperiores consequatur cumque esse est non quisquam quo similique suscipit. Consectetur cupiditate enim eum expedita iure nemo nulla porro qui, repellat temporibus? Debitis error exercitationem illum natus nisi placeat quod?</div><div>Alias aliquid asperiores cupiditate debitis eaque enim exercitationem fuga fugiat illum inventore nostrum officiis, omnis porro quaerat qui quibusdam sequi soluta tenetur ullam voluptates! Asperiores necessitatibus nihil qui recusandae repudiandae!</div><div>A aut, cum deleniti distinctio dolor dolorem in ipsum magnam maxime modi odio odit pariatur porro quam quas quisquam ratione recusandae repellat reprehenderit rerum temporibus tenetur veniam vitae voluptatem voluptates!</div><div>Ab alias, asperiores autem consectetur corporis dolore eius in, ipsam minima nemo neque nesciunt nisi nobis odio omnis optio, perspiciatis porro quam recusandae similique sunt tempora temporibus velit vitae voluptates!</div><div>Accusantium asperiores deserunt doloribus ducimus eligendi et ex ipsam magni odit, officia praesentium quas sunt voluptatum. A atque deserunt fugiat impedit, inventore ipsa itaque minima nesciunt quasi quibusdam reprehenderit ullam!</div><div>Accusantium aperiam asperiores, autem delectus deserunt dolorem dolorum ea ex expedita explicabo fugiat incidunt laudantium libero, nemo non numquam, omnis praesentium quaerat quibusdam ratione sequi voluptates voluptatum? Aut error, similique.</div>
                </div>
            </div>
        </div>
    `,
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                win.show();
            }
        },
    },
});

export const FocusInput = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window modal title="Default window" with-footer ref="win" style="max-width: 500px;">
                <div>
                    <f-input name="t1" label="Input 1" data-focus />
                </div>
            </f-window>

            <div>
                <f-button @click.native="$refs.win.show()">show</f-button>
            </div>
        </div>
    `,
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                win.show();
            }
        },
    },
});

export const FocusButton = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window modal title="Default window" with-footer ref="win" style="max-width: 500px;">
                <div>
                    <f-input name="t1" label="Input 1" />
                    <f-input name="t2" label="Input 2" />
                </div>
                <template #footer>
                    <f-button data-focus>Save</f-button>
                </template>
            </f-window>

            <div>
                <f-button @click.native="$refs.win.show()">show</f-button>
            </div>
        </div>
    `,
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                win.show();
            }
        },
    },
});

export const Animations = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window
                animation-in="fade-enter-active"
                animation-out="fade-leave-active"
                modal
                title="Fade"
                style="max-width: 500px;"

                ref="winFade"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.</div>
            </f-window>

            <f-window
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                modal
                title="Scale"
                style="max-width: 500px;"

                ref="winScale"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.</div>
            </f-window>

            <f-window
                animation-in="scale-center-enter-active"
                animation-out="scale-center-forward-leave-active"
                modal
                title="Scale Out Forward"
                style="max-width: 500px;"

                ref="winScaleForward"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.</div>
            </f-window>

            <p>
                <f-button @click.native="$refs.winFade.show()">Fade</f-button>
                <f-button @click.native="$refs.winScale.show()">Scale</f-button>
                <f-button @click.native="$refs.winScaleForward.show()">Scale Out Forward</f-button>
            </p>

            <p class="co-grey-5 tes-4">You need to create your own animations or import some predefined from <code>src/assets/scss/utilities/_vue-animations.scss</code> </p>
        </div>
    `,
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                win.show();
            }
        },
    },
});

export const ContextAnimations = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window
                animation-in="fade-enter-active"
                animation-out="fade-leave-active"
                modal
                title="Fade"
                style="max-width: 500px;"

                ref="winFade"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.</div>
            </f-window>

            <f-window
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                modal
                title="Scale"
                style="max-width: 500px;"

                ref="winScale"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.</div>
            </f-window>

            <f-window
                animation-in="fade-enter-active"
                animation-out="fade-leave-active"
                modal
                with-footer
                title="Fade"
                style="max-width: 760px;"

                ref="winFade2"
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.</div>
                <template #footer>
                    <f-button @click.native="$refs.winFade2.hide('scale-center-leave-active')">
                        <code>'scale-center-leave-active'</code>
                    </f-button>
                    <f-button @click.native="$refs.winFade2.hide('scale-center-forward-leave-active')">
                        <code>'scale-center-forward-leave-active'</code>
                    </f-button>
                </template>
            </f-window>

            <p>Different animations when calling <code>show()</code> method</>
            <div>
                <f-button @click.native="$refs.winFade.show('scale-center-enter-active')">
                    Fade <code>'scale-center-enter-active'</code>
                </f-button>
                <f-button @click.native="$refs.winScale.show('fade-enter-active')">Scale
                    <code>'fade-enter-active'</code>
                </f-button>
            </div>
            <br />
            <p>Different animations when calling <code>hide()</code> method</p>
            <p>
                <f-button @click.native="$refs.winFade2.show()">Fade</f-button>
            </p>
            <p class="co-grey-5 tes-4">You need to create your own animations or import some predefined from <code>src/assets/scss/utilities/_vue-animations.scss</code> </p>
        </div>
    `,
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                win.show();
            }
        },
    },
});

export const ResizeObserver = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window
                modal
                title="Resize observer"
                style="max-width: 500px;"

                ref="win"
            >
                <div>{{ content }}</div>
            </f-window>

            <p>Window position and size will be automatically corrected according to its content.</p>
            <div>
                <f-button @click.native="onBtnClick">Show window</f-button>
            </div>
        </div>
    `,
    data() {
        return {
            content: '',
        };
    },
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                this.content = 'Loading content...';

                win.show();
                setTimeout(() => {
                    this.content =
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, iusto neque officiis qui quisquam temporibus! Accusamus ad at consectetur dignissimos dolorem esse illum laudantium, necessitatibus praesentium quidem, repudiandae, sed sint.</div><div>Aut cupiditate, rem. A accusamus consequuntur cupiditate deleniti enim fuga impedit in iste laboriosam magnam minus nam nobis nulla officiis omnis praesentium provident quam quas quod repellat, saepe vitae voluptatem.</div><div>Cupiditate dignissimos eos esse est facere fugiat in magnam molestiae necessitatibus nostrum officiis optio pariatur porro, quas quibusdam quo quod repellendus similique tempora veniam. Aperiam minus molestias quia tenetur veniam.</div><div>Adipisci asperiores autem doloremque ipsam, iste necessitatibus nemo officiis porro provident quam quidem recusandae rem sapiente sequi tempora tempore veniam? Alias culpa hic iusto nihil quae velit vero. Libero, suscipit.';
                }, 1000);
            }
        },
    },
});

export const Drilldown = () => ({
    components: { FWindow, FInput, FButton },
    template: `
        <div>
            <f-window modal title="First" style="max-width: 600px;" ref="win">
                <div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur assumenda beatae consequatur consequuntur, fugiat impedit iure labore maxime omnis praesentium quo reiciendis repellendus sapiente sequi sit, soluta vitae voluptatem.</div><div>Ab consectetur deleniti dignissimos doloremque dolores, est et excepturi exercitationem facere, hic ipsum iste libero nesciunt possimus praesentium quas recusandae sit voluptas. Animi cumque fugiat nemo quos soluta tempore ullam.</div><div>Cumque dolorem ea est mollitia natus, nostrum quod ratione temporibus unde ut? A at, cumque ea error harum, id ipsam ipsum iure non odio porro quae quam, reiciendis tempora totam!</div><div>Accusamus alias animi asperiores aspernatur assumenda commodi debitis delectus dicta dolor dolorem dolorum, error esse expedita facere inventore nesciunt provident quaerat quis recusandae rerum tempora tempore temporibus tenetur! Cum, incidunt?</div><div>Aut culpa doloribus dolorum eaque, et eum fuga harum itaque iure labore modi necessitatibus nesciunt, quod reiciendis rem suscipit vero? Alias harum impedit in modi natus praesentium quas quod ullam.</div>
                    <f-button @click.native="onBtn2Click">Show second window</f-button>
                </div>

                <f-window modal title="Second" style="max-width: 500px;" ref="win2">
                    <div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea est exercitationem magni neque tempore! A ad blanditiis laboriosam libero molestias nemo odit rem voluptas voluptatum. Consequuntur deleniti natus perferendis velit.</div><div>Aperiam asperiores aspernatur aut dolores ducimus, eos fugiat illo in incidunt itaque labore laboriosam magni nobis obcaecati placeat porro quidem ratione reiciendis reprehenderit sequi, temporibus vero voluptatem. Ducimus, nulla vitae.</div>
                        <f-button @click.native="onBtn3Click">Show third window</f-button>
                    </div>

                    <f-window modal title="Third" style="max-width: 400px;" ref="win3">
                        <div>
                            <div><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut deleniti dignissimos dolor earum et facere fugiat inventore ipsam laudantium molestiae nulla officia quaerat quasi sequi, tempora tempore vitae voluptates.</div></div>
                        </div>
                    </f-window>
                </f-window>
            </f-window>

            <div>
                <f-button @click.native="onBtnClick">Show window</f-button>
            </div>
        </div>
    `,
    methods: {
        onBtnClick() {
            const { win } = this.$refs;

            if (win) {
                win.show();
            }
        },

        onBtn2Click() {
            const { win2 } = this.$refs;

            if (win2) {
                win2.show();
            }
        },

        onBtn3Click() {
            const { win3 } = this.$refs;

            if (win3) {
                win3.show();
            }
        },
    },
});

export const HideAfter = () => ({
    components: { FWindow, FButton },
    template: `
        <div>
            <f-window
                modal
                :hide-after="3000"
                title="Hide After"
                ref="win"
                style="max-width: 360px;"
            >
                This window will be hidden automatically in 3 seconds.
            </f-window>

            <div>
                <f-button @click.native="$refs.win.show()">Show window</f-button>
            </div>
        </div>
    `,
});

export const NoTitle = () => ({
    components: { FWindow, FButton },
    template: `
        <div>
            <f-window
                modal
                ref="win"
                style="max-width: 360px;"
            >
                Lorem ipsum dolor sit amet, consectetur 1234 adipisicing elit. Adipisci animi aut cupiditate ducimus et
            </f-window>

            <div>
                <f-button @click.native="$refs.win.show()">Window with no title</f-button>
            </div>
        </div>
    `,
});

export const Popover = () => ({
    components: { FWindow, FButton },
    template: `
        <div>
            <f-window
                popover
                :attach-to="attachTo"
                :attach-position="attachPosition"
                :attach-margin="[4, 4, 4, 4]"
                :with-header="false"
                :hide-after="1000"
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                title="Popover window"
                ref="win"
                style="width: auto; max-width: 360px;"
            >
                Lorem ipsum
            </f-window>

            <div style="padding: 40px; text-align: center">
                <f-button id="attach-top" @click.native="onAttachTopClick">attach top</f-button>
                <f-button id="attach-right" @click.native="onAttachRightClick">attach right</f-button>
                <f-button id="attach-bottom" @click.native="onAttachBottomClick">attach bottom</f-button>
                <f-button id="attach-left" @click.native="onAttachLeftClick">attach left</f-button>
            </div>
        </div>
    `,
    data() {
        return {
            attachPosition: 'right',
            attachTo: '#attach-right',
        };
    },
    methods: {
        onAttachTopClick() {
            this.onBtnClick('top');
        },

        onAttachRightClick() {
            this.onBtnClick('right');
        },

        onAttachBottomClick() {
            this.onBtnClick('bottom');
        },

        onAttachLeftClick() {
            this.onBtnClick('left');
        },

        async onBtnClick(_position) {
            const { win } = this.$refs;

            if (win) {
                this.attachPosition = _position;
                this.attachTo = `#attach-${_position}`;

                console.log(this.attachPosition, this.attachTo);

                win.hide();
                win.show();
            }
        },
    },
});

export const PopoverInText = () => ({
    components: { FWindow, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto;">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur deleniti inventore non numquam, porro recusandae! At, error exercitationem fugiat nemo placeat quasi qui quis tempora. Nam non tenetur vel!</div><div>Deleniti, dolores odio. Adipisci at atque cupiditate debitis dignissimos earum error explicabo harum impedit laboriosam libero molestias nobis perferendis quam voluptas voluptate, voluptates. Cum dolorum eius hic, nesciunt quam quis?</div><div>Deserunt nihil optio quis quos reprehenderit, unde velit. Atque dignissimos, incidunt laudantium nulla quia sint velit voluptatibus. Aliquid dolor ea magni, maxime nam obcaecati perspiciatis praesentium repellendus, tempore vero voluptas?</div>
            <f-window
                popover
                attach-to="#attach-top"
                attach-position="top"
                :attach-margin="[4, 4, 4, 4]"
                :with-header="false"
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                ref="win"
                style="width: auto; max-width: 360px;"
            >
                Lorem ipsum
            </f-window>
            <f-button id="attach-top" @click.native="$refs.win.show()">attach top</f-button>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem mollitia nesciunt quis ut voluptatibus. Alias atque, cumque distinctio dolor, impedit laudantium nihil numquam obcaecati, optio possimus reprehenderit sequi velit voluptates!</div><div>Aspernatur blanditiis cum eaque illum iusto quas qui quidem recusandae rerum temporibus? Ad aspernatur dolor dolores eius eveniet, excepturi hic itaque nam neque nisi nobis, nulla obcaecati velit. Amet, tenetur?</div><div>Asperiores doloremque et eum expedita fugiat, id incidunt neque nihil, possimus quia quos repellendus repudiandae rerum saepe, sed? Cumque dolorum eaque error explicabo iusto nemo odio quidem quo repudiandae voluptatem.</div><div>Animi aperiam doloremque ea, incidunt magni nostrum numquam obcaecati placeat quasi quidem! Aliquam culpa est facilis odit optio. Alias corporis, illum modi mollitia porro quae quam quas reiciendis totam vel.</div><div>Aperiam aspernatur exercitationem iusto molestiae quis! Corporis culpa cum, dignissimos dolor eveniet ex harum laudantium mollitia, nostrum possimus quia quis quos repellendus, suscipit tempora! Eum iste laudantium molestiae natus pariatur.</div>
        </div>
    `,
});

export const PopoverHide = () => ({
    components: { FWindow, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto;">
            <f-window
                popover
                hide-on-document-mousedown
                attach-to="#win"
                attach-position="bottom"
                :attach-margin="[4, 4, 4, 4]"
                :with-header="false"
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                ref="win"
                style="width: auto; max-width: 360px;"
            >
                Hide on document mousedown
            </f-window>
            <f-window
                popover
                hide-on-document-resize
                attach-to="#win2"
                attach-position="bottom"
                :attach-margin="[4, 4, 4, 4]"
                :with-header="false"
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                ref="win2"
                style="width: auto; max-width: 360px;"
            >
                Hide on document resize
            </f-window>
            <br><br>
            <f-button id="win" @click.native="$refs.win.show()">Hide on document mousedown</f-button>
            <br><br>
            <f-button id="win2" @click.native="$refs.win2.show()">Hide on document resize</f-button>
        </div>
    `,
});

export const PopoverCloseable = () => ({
    components: { FWindow, FButton },
    template: `
        <div style="max-width: 400px; margin: 0 auto;">
            <f-window
                popover
                hide-on-document-mousedown
                attach-to="#win"
                attach-position="bottom"
                :attach-margin="[4, 4, 4, 4]"
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                ref="win"
                style="width: auto; max-width: 360px;"
            >
                Lorem ipsum dolor sit amet, consectetur 1234 adipisicing elit. Adipisci animi aut cupiditate ducimus et
            </f-window>
            <br><br>
            <f-button id="win" @click.native="$refs.win.show()">Closeable</f-button>
        </div>
    `,
});
