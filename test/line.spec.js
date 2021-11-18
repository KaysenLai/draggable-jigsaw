import { calcDistance, calcSlope } from '../js/utils/line.js';
import { VERTICAL } from '../js/constants';

const p = (x, y) => ({ x, y });

describe('test calculate distance between two points', () => {
  it('test calculate distance between two points 1', () => {
    const result = calcDistance(p(0, 0), p(3, 4));
    const expected = 5;
    expect(result).toBe(expected);
  });

  it('test calculate distance between two points 2', () => {
    const result = +calcDistance(p(4.25, 0), p(0, 5.8)).toFixed(2);
    const expected = 7.19;
    expect(result).toBe(expected);
  });

  it('test calculate distance between two points 3', () => {
    const result = calcDistance(p(0, 0), p(0, 0));
    const expected = 0;
    expect(result).toBe(expected);
  });
});

describe('test calculate slope between two points', () => {
  it('test calculate slope between two points 1', () => {
    const result = calcSlope(p(0, 0), p(1, 2));
    const expected = 2;
    expect(result).toBe(expected);
  });

  it('test calculate slope between two points 3', () => {
    const result = calcSlope(p(3.5, 6), p(3.5, 8));
    const expected = VERTICAL;
    expect(result).toBe(expected);
  });

  it('test calculate slope between two points 4', () => {
    const result = +calcSlope(p(5.2, 7.9), p(3.5, 2.3)).toFixed(2);
    const expected = 3.29;
    expect(result).toBe(expected);
  });
});
