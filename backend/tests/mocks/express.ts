const express = jest.createMockFromModule('express');

express.Router = jest.fn(() => ({
  post: jest.fn(),
  put: jest.fn(),
}));

export default express;
