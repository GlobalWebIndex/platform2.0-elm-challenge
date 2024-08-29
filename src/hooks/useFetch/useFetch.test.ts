import {renderHook} from '@testing-library/react-hooks';
import {useFetch} from './useFetch';

describe('useFetch', () => {
  const endpoint = 'test-endpoint';
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({message: 'success'}),
      ok: true
    });
  });

  it('should make request to fetch from the given endpoint', async () => {
    const {waitForNextUpdate} = renderHook(useFetch, {initialProps: endpoint});

    await waitForNextUpdate();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/test-endpoint', {
      signal: new AbortController().signal
    });
  });

  it('should set `isFetching` to true', async () => {
    const {result, waitForNextUpdate} = renderHook(useFetch, {initialProps: endpoint});

    expect(result.current.isFetching).toBe(true);

    await waitForNextUpdate();
  });

  describe('when request is successful', () => {
    it('should return the response', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetch, {initialProps: endpoint});

      await waitForNextUpdate();

      expect(result.current.data).toStrictEqual({message: 'success'});
    });
  });

  describe('when request is not successful', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: false
      });
    });

    it('should return an error', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetch, {initialProps: endpoint});

      await waitForNextUpdate();

      expect(result.current.error).toStrictEqual(new Error('Failed to fetch data'));
    });
  });

  describe('when the request completes', () => {
    it('should set `isFetching` to false', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetch, {initialProps: endpoint});

      await waitForNextUpdate();

      expect(result.current.isFetching).toBe(false);
    });
  });

  describe('when the component unmounts', () => {
    const mockAbort = jest.fn();

    beforeEach(() => {
      global.AbortController = jest.fn().mockImplementation(() => ({
        abort: mockAbort,
        signal: {}
      }));
    });

    it('should abort the request', () => {
      const {unmount} = renderHook(useFetch, {initialProps: endpoint});

      unmount();

      expect(mockAbort).toHaveBeenCalledTimes(1);
      expect(mockAbort).toHaveBeenCalledWith();
    });
  });

  describe('when the request is aborted', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValue({
        name: 'AbortError'
      });
    });

    it('should not return an error', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetch, {initialProps: endpoint});

      await waitForNextUpdate();

      expect(result.current.error).toBeNull();
    });
  });
});
