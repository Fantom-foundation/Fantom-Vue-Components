/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import { destroyWrapper, getVModelComponent } from '@/utils/test.js';
import FChips from '@/components/FChips/FChips.vue';

const REMOVE_BUTTON_CLASS = '.flistbox_list_item_removebutton';
let wrapper = null;

function getData() {
    return [
        {
            label: 'chip 1',
        },
        {
            id: 'chip2',
            label: 'chip 2',
        },
        {
            label: 'chip 3',
        },
    ];
}

const VModelTest = getVModelComponent(FChips, { data: getData(), removable: true });

function createWrapper({
    propsData = {
        data: getData(),
        removable: true,
    },
    slots = {},
} = {}) {
    return mount(FChips, {
        propsData,
        slots,
    });
}

async function deleteChip(wrapper, chipNum) {
    const li = wrapper.find(`li:nth-child(${chipNum})`);

    await li.find(`${REMOVE_BUTTON_CLASS}`).trigger('click');
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('FChips', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should render chips with "remove" button if `removable` prop is set to `true`', () => {
        wrapper = createWrapper();

        expect(wrapper.find(REMOVE_BUTTON_CLASS).exists()).toBeTruthy();
    });

    it('should set proper css class name to the component when `size` prop is given', async () => {
        wrapper = createWrapper();

        wrapper.setProps({ size: 'large' });
        await wrapper.vm.$nextTick();
        expect(wrapper.classes()).toContain('fchips-lg');

        wrapper.setProps({ size: 'small' });
        await wrapper.vm.$nextTick();
        expect(wrapper.classes()).toContain('fchips-sm');

        wrapper.setProps({ size: 'mini' });
        await wrapper.vm.$nextTick();
        expect(wrapper.classes()).toContain('fchips-xs');
    });

    it('should emit `chip-delete` event with chip object and chip index as a payload when a chip is deleted', async () => {
        wrapper = createWrapper();

        await deleteChip(wrapper, 2);

        const emitted = wrapper.emitted('chip-delete');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([{ item: getData()[1], index: 1 }]);
    });

    it('should emit `change` event with chips data as a payload when a chip is deleted', async () => {
        wrapper = createWrapper();

        await deleteChip(wrapper, 2);

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();

        const data = getData();
        data.splice(1, 1);
        expect(emitted[0]).toEqual([data]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: getData() } });

        const fChips = wrapper.findComponent({ name: 'f-chips' });

        expect(fChips.props('data')).toEqual(getData());

        await deleteChip(fChips, 3);

        const data = getData();
        data.splice(2, 1);
        expect(wrapper.vm.dValue).toEqual(data);
    });

    xit('should set default chips color when `color-hs` prop is set', () => {});
    xit('should set chip color when `colorHS` property in the chip data object is set', () => {});
    xit('should set css class to the chip when `class` property in the chip data object is set', () => {});
    xit('should remove a chip when "remove" button is clicked', () => {});
    xit('should fire event `chip-select` with chip object as a payload when chip is focused', () => {});
});

/* eslint-enable no-undef */
