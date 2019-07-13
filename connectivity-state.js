/**
 * A callback function to be called for `onchange` event.
 * @type {Function}
 */
let changeClb;
/**
 * An element that detects online/offline states and informs about it other compopnents.
 *
 * Checking conectivity in browser is a bit tricky task. Browsers
 * vendors can't agree on what the online/offline status means and therefore
 * even if the browser says that it has a connection in reality it may
 * not be connected to the internet. However it may have LAN access.
 *
 * Note: You can be sure that if the status is `offline` then the browser
 * is offline. But when the status is onLine it may mean that there is a
 * network connection but there's no internet connection
 * (and therefore you are offline for the outside world).
 *
 * In the element, if the `online` attribute is set to `false` the app
 * is offline but when it's set to true it probably is online but may not
 * have access to the internet.
 *
 * ## Example
 *
 * ### Polymer template
 *
 * ```html
 * <connectivity-state online="{{isOnline}}"></connectivity-state>
 * ```
 *
 * @customElement
 * @demo demo/index.html
 * @memberof ApiElements
 */
export class ConnectivityState extends HTMLElement {
  /**
   * @return {Boolean} Current conectivity state.
   * If set to false then thete's no networ connection.
   * If true it means that the network is up an running and the app
   * is probably able to connect with the outside world but it's not
   * guaranteed.
   */
  get online() {
    return this.__online;
  }
  /**
   * @return {Function|undefined} A function previously used to register `change`
   * event handler.
   */
  get onchange() {
    return changeClb;
  }
  /**
   * @param {Function} clb Event handler for `change` event.
   */
  set onchange(clb) {
    if (changeClb) {
      this.removeEventListener('change', changeClb);
    }
    if (typeof clb !== 'function') {
      changeClb = null;
      return;
    }
    changeClb = clb;
    this.addEventListener('change', changeClb);
  }

  constructor() {
    super();
    this._onlineHandler = this._onlineHandler.bind(this);
    this._offlineHandler = this._offlineHandler.bind(this);

    this._setOnline(navigator.onLine);
  }

  connectedCallback() {
    window.addEventListener('online', this._onlineHandler);
    window.addEventListener('offline', this._offlineHandler);
    if (!this.hasAttribute('aria-hidden')) {
      this.setAttribute('aria-hidden', 'true');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('online', this._onlineHandler);
    window.removeEventListener('offline', this._offlineHandler);
  }

  _setOnline(state) {
    this.__online = state;
    const detail = { value: state };
    this.dispatchEvent(new CustomEvent('change', { detail }));
    // Polymer compability
    this.dispatchEvent(new CustomEvent('online-changed', { detail }));
  }
  /**
   * Handler for `online` event
   */
  _onlineHandler() {
    this._setOnline(true);
  }
  /**
   * Handler for `online` event.
   */
  _offlineHandler() {
    this._setOnline(false);
  }

  /**
   * Dispatched when connectivity state change
   *
   * @event change
   * @param {Boolean} value True when online, false when not.
   */
}
window.customElements.define('connectivity-state', ConnectivityState);
