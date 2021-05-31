import { clone, getNestedProp, isArray } from './index.js';

export function isParent(_node) {
    return _node && _node._c && _node._c.length > 0;
}

export function walkTree(_nodes, _callback, _parent = null, _level = 0) {
    const callback = typeof _callback === 'function' ? _callback : null;
    let node;
    let action = '';

    if (_nodes && callback) {
        for (let i = 0, len1 = _nodes.length; i < len1; i++) {
            node = _nodes[i];
            action = callback(node, _parent, _level);

            if (action === 'stop') {
                return 'stop';
            } else if (action === 'skip') {
                continue;
            }

            if (isParent(node)) {
                if (walkTree(node._c, callback, node, _level + 1) === 'stop') {
                    return 'stop';
                }
            }
        }
    }

    return '';
}

export function findNodeBy(_nodes, _value, _prop = 'id') {
    let node = null;
    const parents = [];
    let level = 0;

    walkTree(_nodes, (_node, _parent, _level) => {
        if (_level > level) {
            parents.push(_parent);
        } else if (_level < level) {
            let n = level - _level;

            while (n > 0) {
                parents.pop();
                n--;
            }
        }

        if (getNestedProp(_node, _prop) === _value) {
            node = _node;
            return 'stop';
        }

        level = _level;
    });

    return { node, parents };
}

export class SimpleTree {
    constructor(_data) {
        this._nodes = [];
        this._nodesF = {};

        this.setNodes(_data);
    }

    setNodes(_data) {
        this.clear();

        if (isArray(_data)) {
            this._nodes = clone(_data);
            this._prepareNodes();
        }
    }

    clear() {
        this._nodes = [];
        this._nodesF = {};
    }

    findNodeBy(_value, _prop = 'id') {
        return findNodeBy(this._nodes, _value, _prop);
    }

    walkTree(_callback) {
        return walkTree(this._nodes, _callback);
    }

    isParent(_node) {
        return isParent(_node);
    }

    _prepareNodes() {}
}
