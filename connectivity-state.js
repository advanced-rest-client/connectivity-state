import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-meta/iron-meta.js';
/**
 * `connectivity-state`
 *
 * An element that detects online/offline states and informs about it other compopnents
 *
 * An element that detects online/offline states and informs about it other
 * compopnents. Checking conectivity in browser is a tricky task. Browsers
 * vendors can't agree on what the online/offline status means and therefore
 * even if the browser says that it has intentet connection in reality it may
 * not (because it may have LAN aceess).
 *
 * This element is doing whatever it's available in current browser to
 * inform the app about current conectivity state.
 *
 * Note: You can be sure that if the status is `offline` the browser
 * is offline. But when the status is onLine it may mean that there is a
 * network connection but there's no internet connection
 * (and therefore you are offline for the outside world).
 *
 * In the element, if the `online` attribute is set to `false` the the app
 * is offline but when it's set to true it probably is online but may not
 * have access to the internet.
 *
 * ### Example
 *
 * ```html
 * <connectivity-state online="{{isOnline}}"></connectivity-state>
 * ```
 *
 * Other elements and/or app can access this information via Polymer's data
 * binding system or:
 *
 * 1) By listening for an event `connectivity-state-changed`
 *
 * ```javascript
 * document.addEventListener('connectivity-state-changed', (e) => {
 *  // e.detail.online; (boolean, false is offline)
 * });
 * ```
 *
 * 2) Reading value from the `<iron-meta>` element
 *
 * ```html
 * <iron-meta key="connectivity-state" value="{{networkOnline}}"></iron-meta>
 * ```
 *
 * 3) In javascript using one of the following methods:
 * ```javascipt
 * // With Polymer
 * new Polymer.IronMetaQuery({key: 'connectivity-state'}).value;
 * // Otherwise
 * document.createElement('iron-meta').byKey('connectivity-state');
 * // false if offline.
 * ```
 *
 * Methods above are equal and can be used with this element.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 */
class ConnectivityState extends PolymerElement {
  static get properties() {
    return {
      /**
       * Current conectivity state.
       * If set to false then thete's no networ connection.
       * If true it means that the network is up an running and the app
       * is probably able to connect with the outside world but it's not
       * guaranteed.
       */
      online: {
        type: Boolean,
        value: function() {
          return navigator.onLine;
        },
        notify: true,
        readOnly: true,
        observer: '_onlineStateChanged'
      }
    };
  }

  constructor() {
    super();
    this._onlineHandler = this._onlineHandler.bind(this);
    this._offlineHandler = this._offlineHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('online', this._onlineHandler);
    window.addEventListener('offline', this._offlineHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('online', this._onlineHandler);
    window.removeEventListener('offline', this._offlineHandler);
  }

  _onlineStateChanged(state) {
    const meta = document.createElement('iron-meta');
    meta.key = 'connectivity-state';
    meta.value = state;

    this.dispatchEvent(new CustomEvent('connectivity-state-changed', {
      bubbles: true,
      composed: true,
      detail: {
        value: state
      }
    }));
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
   * @event connectivity-state-changed
   * @param {Boolean} value True when online, false when not.
   */
}
window.customElements.define('connectivity-state', ConnectivityState);
