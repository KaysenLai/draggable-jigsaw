import { calcDistance, calcSlope, isDistanceEqual, isSlopeEqual} from '../js/utils/line.js';
import { VERTICAL } from '../js/constants';

const p = (x, y) => ({ x, y });
const point1 = (x, y) => ({x, y});
const point2 = (x, y) => ({x, y});
const linePoint = (point1, point2) => ({ points: [point1, point2] });
const lineSlope = (slp) => ({slope: slp});

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


describe('test two lines distance less than threshold', () => {
  it('test two lines distance less than threshold 1', () => {
    const result = isDistanceEqual(linePoint(p(0, 0), p(1, 2)), linePoint(p(1, 2), p(0, 0)));
    const expected = true;
    expect(result).toBe(expected);
  });
  it('test two lines distance less than threshold 2', () => {
    const result = isDistanceEqual(linePoint(p(0, 1), p(1, 3)), linePoint(p(2, 4), p(1, 2)));
    const expected = true;
    expect(result).toBe(expected);
  });
  it('test two lines distance less than threshold 3', () => {
    const result = isDistanceEqual(linePoint(p(1, 2), p(2, 4)), linePoint(p(8, 12), p(9, 15)));
    const expected = false;
    expect(result).toBe(expected);
  })
});

describe('test two lines slope less than threshold', () => {
  it('test two lines slope less than threshold 1', () => {
    const result = isSlopeEqual(lineSlope(0.5), lineSlope(0.5));
    const expected = true;
    expect(result).toBe(expected);
  });
  it('test two lines slope less than threshold 2', () => {
    const result = isSlopeEqual(lineSlope(0.1), lineSlope(1.5));
    const expected = false;
    expect(result).toBe(expected);
  });
  it('test two lines slope less than threshold 3', () => {
    const result = isSlopeEqual(lineSlope(VERTICAL), lineSlope(VERTICAL));
    const expected = true;
    expect(result).toBe(expected);
  });
});