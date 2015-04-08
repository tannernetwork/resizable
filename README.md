# resizable

jQuery plugin for resizable elements.

## Install

```
npm install jquery-resizable
```

Then include `resizable.js` and `resizable.css` in your webapp.

## Usage

```js
$('#some div').resizable( options )
```

It also applies for multiple elements.

## Options

#### `direction`

Possible values for an array:
* `top`
* `right`
* `bottom`
* `left`

As a string:
* `horizontal` = `left` + `right`
* `vertical` = `top` + `bottom`
* `top`
* `right`
* `bottom`
* `left`

**Example**:
```js
$('#div1').resizable({
    direction: ['bottom', 'left']
})
$('#div2').resizable({
    direction: 'vertical'
})
```

By default each direction is turned on.