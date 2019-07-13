[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/connectivity-state.svg)](https://www.npmjs.com/package/@advanced-rest-client/connectivity-state)

[![Build Status](https://travis-ci.org/advanced-rest-client/connectivity-state.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/connectivity-state)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@advanced-rest-client/connectivity-state)

# connectivity-state

An element that detects online/offline states and informs about it other compopnents.

Checking conectivity in browser is a bit tricky task. Browser vendors can't agree on what the online/offline status means and therefore even if the browser says that it has a connection in reality it may not be connected to the internet. However it may have LAN access.

Note: You can be sure that if the status is `offline` then the browser is offline. But when the status is onLine it may mean that there is a network connection but there's no internet connection (and therefore you are offline for the outside world).

In the element, if the `online` attribute is set to `false` the app is offline but when it's set to true it probably is online but may not have access to the internet.

## Example

### In a Polymer template

```html
<connectivity-state online="{{isOnline}}"></connectivity-state>
```

### In a LitElement template

```javascript
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/connectivity-state/connectivity-state.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <connectivity-state @change="${this._connectivityHandler}"></connectivity-state>
    `;
  }

  _connectivityHandler(e) {
    const { online } = e.target;
    console.log(`You are now ${online ? 'connected to' : 'dosconnected from'} the interent.`);
  }
}
customElements.define('sample-element', SampleElement);
```

### Imperative use

```html
<script type="module" src="@advanced-rest-client/connectivity-state/connectivity-state.js"></script>
<connectivity-state></connectivity-state>
<script>
{
  document.querySelector('connectivity-state').onchange = (e) => {
    const { online } = e.target;
    console.log(`You are now ${online ? 'connected to' : 'dosconnected from'} the interent.`);
  };
}
</script>
```

## New in version 3

-   Dropped support for Polymer library. It is now a plain web component.
-   Added `aria-hidden` attribute
-   Deprecating `online-changed` event. Use `change` event instead. This event is kept for compatibility with Polymer.

### Development

```sh
git clone https://github.com/@advanced-rest-client/connectivity-state
cd connectivity-state
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```
