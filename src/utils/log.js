export function clog(_text, _style) {
    let style = _style;

    if (_style === 'red') {
        style = 'color: red';
    } else if (_style === 'green') {
        style = 'color: green';
    } else if (_style === 'blue') {
        style = 'color: blue';
    } else if (_style === 'pink') {
        style = 'color: #f0f';
    }

    if (style) {
        console.log(`%c${_text}`, style);
    } else {
        console.log(_text);
    }
}
