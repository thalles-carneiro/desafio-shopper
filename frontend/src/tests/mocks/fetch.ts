import csvFileInvalid from './csvFileInvalid';
import csvFileValid from './csvFileValid';
import responseToInvalidFile from './responseToInvalidFile';
import responseToValidFile from './responseToValidFile';

const fetchMock = (
  _: RequestInfo | URL,
  init: RequestInit | undefined,
) => init && Promise.resolve({
  status: init.method === 'POST' ? 200 : 204,
  ok: true,
  json: () => {
    if (
      init.method === 'POST'
      && JSON.stringify(init.body) === JSON.stringify(csvFileInvalid)
    ) {
      return Promise.resolve(responseToInvalidFile);
    }

    if (
      init.method === 'POST'
      && JSON.stringify(init.body) === JSON.stringify(csvFileValid)
    ) {
      return Promise.resolve(responseToValidFile);
    }
    if (
      init.method === 'PUT'
      && JSON.stringify(init.body) === JSON.stringify(csvFileValid)
    ) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid URL'));
  },
});

export default fetchMock;
