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
