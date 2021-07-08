import { mount } from '@vue/test-utils';
import FTooltip from '@/components/FTooltip/FTooltip.vue';
import FPopover from '@/components/FPopover/FPopover.vue';
import FWindow from '@/components/FWindow/FWindow.vue';
import FButton from '@/components/FButton/FButton.vue';
import { dispatchMouseEvent } from '@/utils/dom-events.js';
import { delay } from '@/utils/function.js';
import { fTooltipElemIdAttr } from '@/components/FTooltip/FTooltip.vue';

let wrapper = null;
let wrapperP = null;

const Playground = {
    components: { FButton },
    template: `
        <div>
            <span id="elem1" data-tooltip="Tooltip text">Elem 1</span>
            <span id="notTarget">Elem 2</span>
            <span id="noTooltipData" data-tooltip="">Elem 3</span>
            <span id="tooltipOptions" data-tooltip='{ "text": "Tooltip text", "withArrow": true }'>Elem 3</span>
            <button id="btn1" data-tooltip="Button tooltip text 1">Button 1</button>
            <f-button id="fbtn2" data-tooltip="Button tooltip text 2">Button 2</f-button>
            <f-button id="noTooltipDataBtn" data-tooltip="">Button 3</f-button>
        </div>
    `,
};

function createWrapper(props = { throttleInterval: 0 }) {
    if (wrapper) {
        wrapper.destroy();
    }

    wrapper = mount(FTooltip, {
        propsData: props,
        parentComponent: wrapperP,
    });
}

describe('FTooltip', () => {
    beforeEach(async () => {
        wrapperP = mount(Playground, {
            attachTo: document.body,
        });
        createWrapper();
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

        it('should have `throttleInterval` prop default to `200`', () => {
            createWrapper({});

            expect(wrapper.props().throttleInterval).toBe(200);
        });

        it('should pass attributes and props to the FPopover', () => {
            createWrapper({ size: 'big' });

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

        it('should show tooltip with text from the `targetAttr` if mouse is hovering target element and `targetAttr` is a JSON string with attribute `text`', async () => {
            const tooltipOptions = wrapperP.find('#tooltipOptions');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');
            await tooltipOptions.trigger('mouseover');

            expect(fWindow.vm.isVisible).toBe(true);
            expect(wrapper.text()).toBe('Tooltip text');
        });

        it('should show tooltip and set popover props if mouse is hovering target element and `targetAttr` is a JSON string representing popover props', async () => {
            const tooltipOptions = wrapperP.find('#tooltipOptions');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');
            await tooltipOptions.trigger('mouseover');

            expect(fWindow.vm.withArrow).toBe(true);
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

        it('should throttle mouseover event listener if `throttleInterval` is greater than `0`', async () => {
            const throttleInterval = 50;

            createWrapper({ throttleInterval });

            const elem1 = wrapperP.find('#elem1');
            const btn1 = wrapperP.find('#btn1');
            const fWindow = wrapper.findComponent(FWindow);

            dispatchMouseEvent(document.body, 'mouseenter');

            await elem1.trigger('mouseover');
            expect(elem1.element.hasAttribute(fTooltipElemIdAttr)).toBe(true);
            expect(fWindow.vm.isVisible).toBe(true);

            await btn1.trigger('mouseover');
            expect(btn1.element.hasAttribute(fTooltipElemIdAttr)).toBe(false);
            expect(fWindow.vm.isVisible).toBe(true);

            await delay(throttleInterval + 5);

            expect(btn1.element.hasAttribute(fTooltipElemIdAttr)).toBe(true);
            expect(fWindow.vm.isVisible).toBe(true);
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
