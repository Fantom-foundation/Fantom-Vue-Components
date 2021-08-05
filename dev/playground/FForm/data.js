import { isObject } from '@/utils';

export function getValues(_formData) {
    const data = _formData;
    const values = {};

    if (!isObject(data)) {
        return {};
    }

    Object.keys(data).forEach(_key => {
        values[_key] = 'default' in data[_key] ? data[_key].default : '';
    });

    return values;
}

export function resetValues(_values, _formData) {
    const defaultValues = getValues(_formData);

    Object.keys(_values).forEach(_key => {
        if (_key in defaultValues) {
            _values[_key] = defaultValues[_key];
        }
    });
}

export function ffData() {
    return {
        input1: {
            default: 'value',
        },
        input2: {},
        checkbox1: {
            default: false,
        },
        checkbox2: {
            default: true,
        },
        checkboxMulti: {
            default: [],
        },
        radio1: {
            default: '10',
        },
        dropdown1: {},
        listbox1: {
            default: '300',
        },
        select1: {},
    };
}
