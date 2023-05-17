import { createBand } from '../../src/scale';

describe('createBand', () => {
  test('createBand(options) returns scale mapping discrete domain to continuous range', () => {
    const s = createBand({
      domain: ['a', 'b', 'c'],
      range: [0, 32],
      padding: 0.2,
    });


    expect(s('a')).toBe(2);
    expect(s('b')).toBe(12);
    expect(s('c')).toBe(22);
    if (s.bandWidth) {
      expect(s.bandWidth()).toBe(8);
    }
    if (s.step) {
      expect(s.step()).toBe(10);
    }
  });
});
