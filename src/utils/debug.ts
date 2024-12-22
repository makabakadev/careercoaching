const DEBUG = true;

export const debug = {
  log: (...args: any[]) => {
    if (DEBUG) {
      console.log('[Debug]:', ...args);
    }
  },
  error: (...args: any[]) => {
    if (DEBUG) {
      console.error('[Error]:', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (DEBUG) {
      console.warn('[Warning]:', ...args);
    }
  },
  table: (data: any) => {
    if (DEBUG) {
      console.table(data);
    }
  }
};