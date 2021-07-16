/**
 * FAccordionNavigationNode item
 * @typedef {Object} FAccordionNavigationNode
 * @property {string} label Specifies a label for navigation node
 * @property {string} [id] Id of navigation node. If not set, id will be generated for the node.
 * @property {string} [route] Specifies route name for `router-link` component
 * @property {string} [icon] Specifies icon name for an iconset component
 * @property {string} [url] Specifies url of node's link element
 * @property {string} [blank] target=_blank attribute will be added to node's link element
 * @property {boolean} [dontRender] If `true`, node won't be rendered, but still remains in navigation tree (for path highlighting etc.)
 * @property {FAccordionNavigationNode[]} [_c] Child nodes
 */
