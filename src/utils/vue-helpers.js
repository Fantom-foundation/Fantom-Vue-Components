import { getUniqueId } from './index.js';

export function getComponentName(_component) {
    return _component?.$options._componentTag;
}

/**
 * @param {Object} _component Vue component
 * @param {function} _callback
 * @return {boolean}
 */
export function traverseVueTree(_component, _callback) {
    const children = _component.$children;
    let child;
    let _continue = true;

    if (children && children.length > 0) {
        for (let i = 0, len = children.length; i < len; i++) {
            child = children[i];

            if (_callback(child)) {
                _continue = traverseVueTree(child, _callback);
            } else {
                _continue = false;
                break;
            }
        }
    }

    return _continue;
}

/**
 * Find child components by name recursively.
 *
 * @param {array} [_children]
 * @param {string} _name
 * @param {boolean} [_notRecursively] Just direct children.
 * @param {function} [_foundCallback] Function called when child is found. If it returns false, finding will continue.
 * @return {[Vue]}
 */
export function findChildrenByName(_children, _name, _notRecursively, _foundCallback) {
    const children = _children;
    let components = [];
    let child;
    let foundChildren;

    if (children && children.length > 0) {
        for (let i = 0, len1 = children.length; i < len1; i++) {
            child = children[i];

            if (child.$options._componentTag === _name) {
                components.push(child);
            }

            if (!_notRecursively) {
                foundChildren = findChildrenByName(child.$children, _name, false, _foundCallback);
                if (foundChildren.length > 0) {
                    if (_foundCallback) {
                        for (let j = 0, len2 = foundChildren.length; j < len2; j++) {
                            if (_foundCallback(foundChildren[j])) {
                                components.push(foundChildren[j]);
                            }
                        }
                    } else {
                        components = components.concat(foundChildren);
                    }
                }
            }
        }
    }

    return components;
}

/**
 * @param {Object} _startComponent Vue component
 * @param {string} id
 * @return {Object|null} Vue component or null
 */
export function findComponentById(startComponent, id) {
    let component = null;

    traverseVueTree(startComponent, comp => {
        if (comp.id === id) {
            component = comp;
            return false;
        }

        return true;
    });

    return component;
}

/**
 * Check the subtree of the vue component tree with the root `_startComponent`, if a component has `isChanged` method
 * and if it returns `true`.
 *
 * @param {Object} _startComponent Vue component
 * @param {Object} _messages Kyes are component names in kebab case, values are messages.
 * @param {boolean} [_noConfirmation] If `true`, no confirmation prompt will be raised
 * @returns {boolean|string} Wether to continue with an action or not.
 */
export function isAnyComponentChanged(_startComponent, _messages = {}, _noConfirmation = false) {
    let changedComponentName = '';

    traverseVueTree(_startComponent, _component => {
        if ('isChanged' in _component && typeof _component.isChanged === 'function' && _component.isChanged()) {
            changedComponentName = getComponentName(_component);
            return false;
        }

        return true;
    });

    if (changedComponentName) {
        if (!_noConfirmation) {
            return !confirm(_messages[changedComponentName]);
        } else {
            return _messages[changedComponentName];
        }
    }

    return !!changedComponentName;
}

/**
 * Generate unique id if there is no 'id' property in object.
 *
 * @param {Object[]} _items
 * @param {string} [_key]
 */
export function setIds(_items, _key = 'id') {
    let item;

    if (_items && _items.length) {
        for (let i = 0, len1 = _items.length; i < len1; i += 1) {
            item = _items[i];
            if (!(_key in item) || item[_key] === null) {
                item[_key] = getUniqueId();
            }
        }
    }
}
