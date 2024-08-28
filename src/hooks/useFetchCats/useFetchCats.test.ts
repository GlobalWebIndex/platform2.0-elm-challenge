import {expect} from '@jest/globals';
import {renderHook} from '@testing-library/react-hooks';
import {useFetchCats} from './useFetchCats';

describe('useFetchCats', () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve([{id: '1', url: 'https://example.com/cat1.jpg'}]),
      ok: true
    });
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it('should make request to fetch cats on mount', async () => {
    const {waitForNextUpdate} = renderHook(useFetchCats);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search?limit=10');

    await waitForNextUpdate();
  });

  it('should set `isFetching` to true', async () => {
    const {result, waitForNextUpdate} = renderHook(useFetchCats);

    expect(result.current.isFetching).toBe(true);

    await waitForNextUpdate();
  });

  describe('when the request is successful', () => {
    it('should return the response', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetchCats);

      await waitForNextUpdate();

      expect(result.current.list).toStrictEqual([{id: '1', url: 'https://example.com/cat1.jpg'}]);
    });
  });

  describe('when the request completes', () => {
    it('should set `isFetching` to false', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([{id: '1', url: 'https://example.com/cat1.jpg'}]),
        ok: true
      });

      const {result, waitForNextUpdate} = renderHook(useFetchCats);

      await waitForNextUpdate();

      expect(result.current.isFetching).toBe(false);
    });
  });

  describe('when `reFetch` is fired', () => {
    beforeEach(() => {
      mockFetch
        .mockResolvedValueOnce({
          json: () => Promise.resolve([{id: '1', url: 'https://example.com/cat1.jpg'}]),
          ok: true
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve([{id: '2', url: 'https://example.com/cat2.jpg'}]),
          ok: true
        });
    });

    it('should make a new request to fetch cats', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetchCats);

      await waitForNextUpdate();

      await result.current.reFetch();

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://api.thecatapi.com/v1/images/search?limit=10');
      expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://api.thecatapi.com/v1/images/search?limit=10');
    });

    it('should set `isReFetching` to true', async () => {
      const {result, waitForNextUpdate} = renderHook(useFetchCats);

      await waitForNextUpdate();

      void result.current.reFetch();

      expect(result.current.isReFetching).toBe(true);

      await waitForNextUpdate();
    });

    describe('when re-fetching is successful', () => {
      it('should append the response to any existing responses', async () => {
        const {result, waitForNextUpdate} = renderHook(useFetchCats);

        await waitForNextUpdate();

        expect(result.current.list).toStrictEqual([{id: '1', url: 'https://example.com/cat1.jpg'}]);

        await result.current.reFetch();

        expect(result.current.list).toStrictEqual([
          {id: '1', url: 'https://example.com/cat1.jpg'},
          {id: '2', url: 'https://example.com/cat2.jpg'}
        ]);
      });
    });

    describe('when re-fetching completes', () => {
      it('should set `isReFetching` to false', async () => {
        mockFetch.mockResolvedValueOnce({
          json: () => Promise.resolve([{id: '1', url: 'https://example.com/cat1.jpg'}]),
          ok: true
        });

        const {result, waitForNextUpdate} = renderHook(useFetchCats);

        await waitForNextUpdate();

        await result.current.reFetch();

        expect(result.current.isReFetching).toBe(false);
      });
    });
  });
});
