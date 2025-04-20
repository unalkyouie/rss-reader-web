// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure Testing Library
configure({
  asyncUtilTimeout: 1000,
});

if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = class {
    encoding = 'utf-8';

    encode(str: string) {
      return new Uint8Array(str.split('').map((c) => c.charCodeAt(0)));
    }
    encodeInto(str: string, target: Uint8Array): { read: number; written: number } {
      const encoded = this.encode(str);
      target.set(encoded);
      return {
        read: encoded.length,
        written: encoded.length,
      };
    }
  };
}

// Redirect to React.act from react-dom/test-utils.act
jest.mock('react-dom/test-utils', () => {
  const original = jest.requireActual('react-dom/test-utils');
  return {
    ...original,
    act: jest.requireActual('react').act,
  };
});

// Suppress unwanted warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    if (/Warning.*ReactDOM.render is no longer supported/.test(args[0])) {
      return;
    }
    if (/Warning.*ReactDOMTestUtils.act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
