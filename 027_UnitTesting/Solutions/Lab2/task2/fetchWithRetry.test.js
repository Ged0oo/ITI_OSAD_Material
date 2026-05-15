jest.mock('./apiClient');

const { getData } = require('./apiClient');
const { fetchWithRetry } = require('./fetchWithRetry');
const url = 'google.com';

describe('fetchWithRetry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('first attempt succeeds', async () => {
    getData.mockResolvedValueOnce({id:1});
    const result = await fetchWithRetry('url');
    expect(result).toEqual({id:1});
    expect(getData).toHaveBeenCalledTimes(1);
  });

  test('first fails, second succeeds', async () => {
    getData.mockRejectedValueOnce(new Error('timeout')).mockResolvedValueOnce({id:2});
    const result = await fetchWithRetry('url');
    expect(result).toEqual({id:2});
    expect(getData).toHaveBeenCalledTimes(2);
  });

  test('all 3 attempts fail', async () => {
    getData
        .mockRejectedValueOnce(new Error('timeout 1'))
        .mockRejectedValueOnce(new Error('timeout 2'))
        .mockRejectedValueOnce(new Error('timeout 3'));
    await expect(fetchWithRetry('url')).rejects.toThrow('Failed after 3 attempts');
    expect(getData).toHaveBeenCalledTimes(3);
  });

   test('maxRetries = 1 fails after one call', async () => {
    getData.mockRejectedValueOnce(new Error('timeout'));
    await expect(fetchWithRetry('url', 1)).rejects.toThrow('Failed after 1 attempts');
    expect(getData).toHaveBeenCalledTimes(1);
  });
});
