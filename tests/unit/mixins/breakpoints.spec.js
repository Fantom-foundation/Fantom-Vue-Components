import '../../matchMedia.mock';
import { mount } from '@vue/test-utils';
import { Breakpoints } from '@/utils/Breakpoints.js';
import { breakpointsMixin } from '@/mixins/breakpoints.js';

let wrapper = null;

const Foo = {
    template: '<div></div>',
    mixins: [breakpointsMixin],
    created() {
        this.breakpoints = [{ value: '48em' }];
    },
    methods: {
        onBreakpointChange() {},
    },
};

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
    }
}

function createWrapper() {
    return mount(Foo, {
        attachTo: document.body,
    });
}

beforeEach(() => {
    wrapper = createWrapper();
});

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('breakpointsMixin', () => {
    it('should create instance of Breakpoints on `mounted` hook', () => {
        expect(wrapper.vm._breakpointsC).toBeInstanceOf(Breakpoints);
    });

    it('should destroy instance of Breakpoints on `beforeDestroy` hook', () => {
        destroyWrapper(wrapper);

        expect(wrapper.vm._breakpointsC).toBeNull();
    });

    it('should call `onBreakpointChange` method if breakpoint is reached', () => {
        const spy = jest.spyOn(wrapper.vm, 'onBreakpointChange');

        wrapper.vm._breakpointsC._callback();

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();
    });
});
