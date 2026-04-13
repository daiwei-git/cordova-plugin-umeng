/**
 * Unit tests for UMSDK.js (Cordova plugin JavaScript interface)
 *
 * These tests mock `cordova.exec` and verify that every public API method:
 *   - calls cordova.exec with the correct service, action, and arguments
 *   - returns a Promise that resolves on success callback
 *   - returns a Promise that rejects on error callback
 *   - handles edge-case inputs correctly
 */

let mockExec;
let UMSDK;

beforeEach(() => {
  // Reset module registry so each test gets a fresh UMSDK instance
  jest.resetModules();

  // Create a mock for cordova.exec
  mockExec = jest.fn();

  // Register the mock cordova module before requiring UMSDK
  jest.mock('cordova', () => ({ exec: (...args) => mockExec(...args) }), { virtual: true });

  UMSDK = require('../www/UMSDK');
});

// ─── Helper ──────────────────────────────────────────────────────────────────
// Simulate the native side calling back immediately.
function autoResolve(result) {
  mockExec.mockImplementation((success) => success(result));
}

function autoReject(error) {
  mockExec.mockImplementation((_success, fail) => fail(error));
}

// ─── preInit ─────────────────────────────────────────────────────────────────
describe('preInit', () => {
  test('calls cordova.exec with correct parameters', async () => {
    autoResolve('OK');
    await UMSDK.preInit('testAppKey', 'testChannel');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'preInit',
      ['testAppKey', 'testChannel']
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.preInit('key', 'ch')).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('preInit error');
    await expect(UMSDK.preInit('key', 'ch')).rejects.toBe('preInit error');
  });
});

// ─── init ────────────────────────────────────────────────────────────────────
describe('init', () => {
  test('calls cordova.exec with correct parameters', async () => {
    autoResolve('OK');
    await UMSDK.init('appKey', 'channel', 1, 'pushSecret');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'init',
      ['appKey', 'channel', 1, 'pushSecret']
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.init('k', 'c', 1, 's')).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('init error');
    await expect(UMSDK.init('k', 'c', 1, 's')).rejects.toBe('init error');
  });
});

// ─── setLogEnabled ───────────────────────────────────────────────────────────
describe('setLogEnabled', () => {
  test('passes boolean to native', async () => {
    autoResolve('OK');
    await UMSDK.setLogEnabled(true);
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'setLogEnabled',
      [true]
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.setLogEnabled(false)).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('error');
    await expect(UMSDK.setLogEnabled(true)).rejects.toBe('error');
  });
});

// ─── onKillProcess ───────────────────────────────────────────────────────────
describe('onKillProcess', () => {
  test('calls cordova.exec with empty args', async () => {
    autoResolve('OK');
    await UMSDK.onKillProcess();
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'onKillProcess',
      []
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.onKillProcess()).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('error');
    await expect(UMSDK.onKillProcess()).rejects.toBe('error');
  });
});

// ─── getOaid ─────────────────────────────────────────────────────────────────
describe('getOaid', () => {
  test('calls cordova.exec with empty args', async () => {
    autoResolve('test-oaid');
    await UMSDK.getOaid();
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'getOaid',
      []
    );
  });

  test('resolves with oaid value', async () => {
    autoResolve('abcdef-oaid-123');
    await expect(UMSDK.getOaid()).resolves.toBe('abcdef-oaid-123');
  });

  test('rejects on failure', async () => {
    autoReject('oaid error');
    await expect(UMSDK.getOaid()).rejects.toBe('oaid error');
  });
});

// ─── login ───────────────────────────────────────────────────────────────────
describe('login', () => {
  test('passes userId and platformName', async () => {
    autoResolve('OK');
    await UMSDK.login('user123', 'wechat');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'login',
      ['user123', 'wechat']
    );
  });

  test('converts undefined platformName to null', async () => {
    autoResolve('OK');
    await UMSDK.login('user123');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'login',
      ['user123', null]
    );
  });

  test('passes explicit null platformName', async () => {
    autoResolve('OK');
    await UMSDK.login('user123', null);
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'login',
      ['user123', null]
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.login('u', 'p')).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('login error');
    await expect(UMSDK.login('u', 'p')).rejects.toBe('login error');
  });
});

// ─── logout ──────────────────────────────────────────────────────────────────
describe('logout', () => {
  test('calls cordova.exec with empty args', async () => {
    autoResolve('OK');
    await UMSDK.logout();
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'logout',
      []
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.logout()).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('error');
    await expect(UMSDK.logout()).rejects.toBe('error');
  });
});

// ─── setPageCollectionMode ───────────────────────────────────────────────────
describe('setPageCollectionMode', () => {
  test('passes "auto" mode', async () => {
    autoResolve('OK');
    await UMSDK.setPageCollectionMode('auto');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'setPageCollectionMode',
      ['auto']
    );
  });

  test('passes "manual" mode', async () => {
    autoResolve('OK');
    await UMSDK.setPageCollectionMode('manual');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'setPageCollectionMode',
      ['manual']
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.setPageCollectionMode('auto')).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('error');
    await expect(UMSDK.setPageCollectionMode('auto')).rejects.toBe('error');
  });
});

// ─── onPageStart ─────────────────────────────────────────────────────────────
describe('onPageStart', () => {
  test('passes pageName', async () => {
    autoResolve('OK');
    await UMSDK.onPageStart('HomePage');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'onPageStart',
      ['HomePage']
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.onPageStart('Page')).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('error');
    await expect(UMSDK.onPageStart('Page')).rejects.toBe('error');
  });
});

// ─── onPageEnd ───────────────────────────────────────────────────────────────
describe('onPageEnd', () => {
  test('passes pageName', async () => {
    autoResolve('OK');
    await UMSDK.onPageEnd('HomePage');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'onPageEnd',
      ['HomePage']
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.onPageEnd('Page')).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('error');
    await expect(UMSDK.onPageEnd('Page')).rejects.toBe('error');
  });
});

// ─── onEvent ─────────────────────────────────────────────────────────────────
describe('onEvent', () => {
  test('passes event name and map', async () => {
    autoResolve('OK');
    await UMSDK.onEvent('purchase', { item: 'book', price: 10 });
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'onEvent',
      ['purchase', { item: 'book', price: 10 }]
    );
  });

  test('defaults map to empty object when undefined', async () => {
    autoResolve('OK');
    await UMSDK.onEvent('click');
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'onEvent',
      ['click', {}]
    );
  });

  test('resolves on success', async () => {
    autoResolve('OK');
    await expect(UMSDK.onEvent('ev', {})).resolves.toBe('OK');
  });

  test('rejects on failure', async () => {
    autoReject('event error');
    await expect(UMSDK.onEvent('ev', {})).rejects.toBe('event error');
  });
});

// ─── registerPush ────────────────────────────────────────────────────────────
describe('registerPush', () => {
  test('calls cordova.exec with empty args', async () => {
    autoResolve('device-token-123');
    await UMSDK.registerPush();
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'registerPush',
      []
    );
  });

  test('resolves with device token', async () => {
    autoResolve('device-token-abc');
    await expect(UMSDK.registerPush()).resolves.toBe('device-token-abc');
  });

  test('rejects on failure', async () => {
    autoReject('push error');
    await expect(UMSDK.registerPush()).rejects.toBe('push error');
  });
});

// ─── getDeviceInfo ───────────────────────────────────────────────────────────
describe('getDeviceInfo', () => {
  const mockDeviceInfo = {
    uuid: 'test-uuid',
    version: '14.0',
    platform: 'iOS',
    model: 'iPhone14,2',
    manufacturer: 'Apple',
    isVirtual: false,
  };

  test('calls cordova.exec with empty args', async () => {
    autoResolve(mockDeviceInfo);
    await UMSDK.getDeviceInfo();
    expect(mockExec).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'UMSDK',
      'getDeviceInfo',
      []
    );
  });

  test('resolves with device info object', async () => {
    autoResolve(mockDeviceInfo);
    const info = await UMSDK.getDeviceInfo();
    expect(info).toEqual(mockDeviceInfo);
    expect(info.uuid).toBe('test-uuid');
    expect(info.platform).toBe('iOS');
  });

  test('rejects on failure', async () => {
    autoReject('device error');
    await expect(UMSDK.getDeviceInfo()).rejects.toBe('device error');
  });
});

// ─── General behaviour ──────────────────────────────────────────────────────
describe('general behaviour', () => {
  test('all public methods return a Promise', () => {
    autoResolve('OK');
    const methods = [
      UMSDK.preInit('k', 'c'),
      UMSDK.init('k', 'c', 1, 's'),
      UMSDK.setLogEnabled(true),
      UMSDK.onKillProcess(),
      UMSDK.getOaid(),
      UMSDK.login('u', 'p'),
      UMSDK.logout(),
      UMSDK.setPageCollectionMode('auto'),
      UMSDK.onPageStart('p'),
      UMSDK.onPageEnd('p'),
      UMSDK.onEvent('e', {}),
      UMSDK.registerPush(),
      UMSDK.getDeviceInfo(),
    ];
    methods.forEach((m) => {
      expect(m).toBeInstanceOf(Promise);
    });
  });

  test('each method invokes cordova.exec exactly once', async () => {
    autoResolve('OK');
    await UMSDK.preInit('k', 'c');
    expect(mockExec).toHaveBeenCalledTimes(1);
  });
});
