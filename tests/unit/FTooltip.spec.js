import { mount } from '@vue/test-utils';
import FTooltip from '@/components/FTooltip/FTooltip.vue';
import FPopover from '@/components/FPopover/FPopover.vue';
import FWindow from '@/components/FWindow/FWindow.vue';
import FButton from '@/components/FButton/FButton.vue';
import { dispatchMouseEvent } from '@/utils/dom-events.js';

let wrapper = null;
let wrapperP = null;
const propsData = {};

const Playground = {
    components: { FButton },
    template: `
        <div>
            <span id="elem1" data-tooltip="Tooltip text">Elem 1</span>
            <span id="notTarget">Elem 2</span>
            <span id="noTooltipData" data-tooltip="">Elem 3</span>
            <button id="btn1" data-tooltip="Button tooltip text 1">Button 1</button>
            <f-button id="fbtn2" data-tooltip="Button tooltip text 2">Button 2</f-button>
            <f-button id="noTooltipDataBtn" data-tooltip="">Button 3</f-button>
        </div>
    `,
};

describe('FTooltip', () => {
    beforeEach(async () => {
        wrapperP = mount(Playground, {
            attachTo: document.body,
        });
        wrapper = mount(FTooltip, {
            propsData,
            parentComponent: wrapperP,
        });
    });

    afterEach(() => {
        wrapper.destroy();
        wrapperP.destroy();
    });

    describe('on init', () => {
        it('should contain FPopover component', () => {
            const fPopover = wrapper.findComponent(FPopover);

            expect(fPopover.exists()).toBe(true);
        });

        it("should have `targetAttr` prop default to 'data-tooltip'", () => {
            expect(wrapper.props().targetAttr).toBe('data-tooltip');
        });

        it('should pass attributes and props to the FPopover', () => {
            wrapper.destroy();

            wrapper = mount(FTooltip, {
                propsData: { size: 'big' },
            });

            const fPopover = wrapper.findComponent(FPopover);

            expect(fPopover.props().size).toBe('big');
        });
    });

    describe('hover target element', () => {
        it('should show tooltip with text from the `targetAttr` if mouse is hovering target element', async () => {
            const elem1 = wrapperP.find('#elem1');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');
            await elem1.trigger('mouseover');

            expect(fWindow.vm.isVisible).toBe(true);
            expect(wrapper.text()).toBe('Tooltip text');
        });

        it('should hide tooltip if mouse is leaving target element', async () => {
            const elem1 = wrapperP.find('#elem1');
            const notTargetElem = wrapperP.find('#notTarget');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');
            await elem1.trigger('mouseover');
            await notTargetElem.trigger('mouseover');

            expect(fWindow.vm.isVisible).toBe(false);
        });

        it('should show tooltip if mouse is hovering a target element and then moving to the next target element', async () => {
            const elem1 = wrapperP.find('#elem1');
            const btn1 = wrapperP.find('#btn1');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');
            await elem1.trigger('mouseover');
            await btn1.trigger('mouseover');

            expect(fWindow.vm.isVisible).toBe(true);
            expect(wrapper.text()).toBe('Button tooltip text 1');
        });

        it('should not show tooltip if mouse is hovering a target element with empty `targetAttr`', async () => {
            const noTooltipData = wrapperP.find('#noTooltipData');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');
            await noTooltipData.trigger('mouseover');

            expect(fWindow.vm.isVisible).toBe(false);
        });
    });

    describe('focus/blur target element', () => {
        it('should show tooltip if target element has a focus', async () => {
            const btn1 = wrapperP.find('#btn1');
            const fWindow = wrapper.findComponent(FWindow);

            await btn1.trigger('focusin');

            expect(fWindow.vm.isVisible).toBe(true);
            expect(wrapper.text()).toBe('Button tooltip text 1');
        });

        it('should show tooltip if target element is a FButton component and has a focus', async () => {
            const fbtn2 = wrapperP.find('#fbtn2');
            const fWindow = wrapper.findComponent(FWindow);

            await fbtn2.trigger('focusin');

            expect(fWindow.vm.isVisible).toBe(true);
            expect(wrapper.text()).toBe('Button tooltip text 2');
        });

        it('should hide tooltip if target element has a focus and then loses focus', async () => {
            const btn1 = wrapperP.find('#btn1');
            const fWindow = wrapper.findComponent(FWindow);

            await btn1.trigger('focusin');
            await btn1.trigger('focusout');

            expect(fWindow.vm.isVisible).toBe(false);
        });

        it('should show tooltip if target element has a focus and then moving to the next target element', async () => {
            const btn1 = wrapperP.find('#btn1');
            const fbtn2 = wrapperP.find('#fbtn2');
            const fWindow = wrapper.findComponent(FWindow);

            await btn1.trigger('focusin');
            await fbtn2.trigger('focusin');

            expect(fWindow.vm.isVisible).toBe(true);
            expect(wrapper.text()).toBe('Button tooltip text 2');
        });

        it('should not show tooltip if target element has focus and empty `targetAttr`', async () => {
            const noTooltipDataBtn = wrapperP.find('#noTooltipDataBtn');
            const fWindow = wrapper.findComponent(FWindow);

            await noTooltipDataBtn.trigger('focusin');

            expect(fWindow.vm.isVisible).toBe(false);
        });
    });
});
