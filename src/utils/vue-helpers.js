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
