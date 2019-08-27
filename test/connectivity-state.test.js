import { fixture, assert } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../connectivity-state.js';

describe('<connectivity-state>', function() {
  async function basicFixture() {
    return (await fixture(`<connectivity-state></connectivity-state>`));
  }

  async function ariaHiddenFixture() {
    return (await fixture(`<connectivity-state aria-hidden="false"></connectivity-state>`));
  }

  describe('Basics', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Initial online value is set', () => {
      assert.typeOf(element.online, 'boolean');
    });
  });

  function fire(type) {
    document.body.dispatchEvent(new CustomEvent(type, {
      bubbles: true
    }));
  }

  describe('Online/Offline state', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Sets online to false when going offline', () => {
      element.__online = true;
      fire('offline');
      assert.isFalse(element.online);
    });

    it('Sets online to true when going online', () => {
      element.__online = false;
      fire('online');
      assert.isTrue(element.online);
    });
  });

  describe('Events', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Dispatches "change" event when setting value attribute', () => {
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      element._setOnline(false);
      assert.isTrue(spy.called, 'change event called');
      assert.isFalse(spy.args[0][0].detail.value, 'detail.value is false');
    });

    it('Dispatches "online-changed" event when setting value attribute', () => {
      const spy = sinon.spy();
      element.addEventListener('online-changed', spy);
      element._setOnline(false);
      assert.isTrue(spy.called, 'online-changed event called');
      assert.isFalse(spy.args[0][0].detail.value, 'detail.value is false');
    });

    it('Sets event via onchange setter', () => {
      const f = () => {};
      element.onchange = f;
      assert.isTrue(element.onchange === f);
    });

    it('onchange function is called with event argument', () => {
      let event;
      const f = (e) => {
        event = e;
      };
      element.onchange = f;
      element._setOnline(false);
      element.onchange = null;
      assert.isFalse(event.detail.value, 'detail.value is false');
    });

    it('Clears old onchange function', () => {
      let event1;
      const f1 = (e) => {
        event1 = e;
      };
      element.onchange = f1;
      let event2;
      const f2 = (e) => {
        event2 = e;
      };
      element.onchange = f2;
      element._setOnline(false);
      element.onchange = null;
      assert.isUndefined(event1, 'event1 is not set');
      assert.isFalse(event2.detail.value, 'event2 detail.value is false');
    });
  });

  describe('a11y', () => {
    it('Sets aria-hidden attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('aria-hidden'), 'true');
    });

    it('Respects existin aria-hidden', async () => {
      const element = await ariaHiddenFixture();
      assert.equal(element.getAttribute('aria-hidden'), 'false');
    });

    it('ias accessible', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });
  });
});
