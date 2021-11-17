import { DISTANCE_THRESHOLD, SLOPE_THRESHOLD, VERTICAL, VERTICAL_THRESHOLD } from '../constants';

export function calcDistance(point1, point2) {
  const xSquare = Math.pow(point1.x - point2.x, 2);
  const ySquare = Math.pow(point1.y - point2.y, 2);
  return Math.pow(xSquare + ySquare, 0.5);
}

export function calcSlope(point1, point2) {
  if (Math.abs(point1.x - point2.x) < VERTICAL_THRESHOLD) return VERTICAL;
  return (point1.y - point2.y) / (point1.x - point2.x);
}

export function isLineOverlap(line1, line2) {
  return isSlopeEqual(line1, line2) && isDistanceEqual(line1, line2);
}

export function isSlopeEqual(line1, line2) {
  if (line1.slope === VERTICAL && line2.slope === VERTICAL) return true;
  return Math.abs(line1.slope - line2.slope) < SLOPE_THRESHOLD;
}

export function isDistanceEqual(line1, line2) {
  const line1Point1 = line1.points[0];
  const line1Point2 = line1.points[1];
  const line2Point1 = line2.points[0];
  const line2Point2 = line2.points[1];
  const distance1 = Math.min(calcDistance(line1Point1, line2Point1), calcDistance(line1Point1, line2Point2));
  const distance2 = Math.min(calcDistance(line1Point2, line2Point1), calcDistance(line1Point2, line2Point2));
  return distance1 < DISTANCE_THRESHOLD && distance2 < DISTANCE_THRESHOLD;
}

export function calcLineOffset(line1, line2) {
  const line1Point1 = line1.points[0];
  const line1Point2 = line1.points[1];
  const line2Point1 = line2.points[0];
  const line2Point2 = line2.points[1];
  const dx1 = line2Point1.x - line1Point1.x;
  const dx2 = line2Point1.x - line1Point2.x;
  const dx = Math.abs(dx1) - Math.abs(dx2) > 0 ? dx2 : dx1;
  const dy1 = line2Point2.y - line1Point1.y;
  const dy2 = line2Point2.y - line1Point2.y;
  const dy = Math.abs(dy1) - Math.abs(dy2) > 0 ? dy2 : dy1;
  return { dx, dy };
}
