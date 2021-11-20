import { calcDistance, calcSlope } from './line';

export function isInsidePolygon(p, polygon) {
  let isInside = false;
  let minX = polygon[0].x;
  let maxX = polygon[0].x;
  let minY = polygon[0].y;
  let maxY = polygon[0].y;
  for (let n = 1; n < polygon.length; n++) {
    const q = polygon[n];
    minX = Math.min(q.x, minX);
    maxX = Math.max(q.x, maxX);
    minY = Math.min(q.y, minY);
    maxY = Math.max(q.y, maxY);
  }

  if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
    return false;
  }

  let i = 0;
  let j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {
    if (
      polygon[i].y > p.y !== polygon[j].y > p.y &&
      p.x < ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) / (polygon[j].y - polygon[i].y) + polygon[i].x
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
}

export function polygonLines(shape) {
  const polygon = shape.getPolygon();
  const lines = [];
  for (let i = 0; i < polygon.length; i++) {
    let j = i !== polygon.length - 1 ? i + 1 : 0;
    const point1 = polygon[i];
    const point2 = polygon[j];
    const length = calcDistance(point1, point2);
    const slope = calcSlope(point1, point2);
    lines.push({ points: [point1, point2], length, slope });
  }
  return lines;
}

export function calcNearShapes(shape, shapes) {
  const center = shape.getCenter();
  const shapeDistances = shapes.map((shape) => ({ shape, distance: calcDistance(center, shape.getCenter()) }));
  shapeDistances.sort((obj1, obj2) => obj1.distance - obj2.distance);
  return shapeDistances.slice(0, 10).map((item) => item.shape);
}

export function calcCenter(points) {
  let offset = points[0];
  let twiceArea = 0;
  let x = 0;
  let y = 0;
  let p1, p2;
  let f;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    p1 = points[i];
    p2 = points[j];
    f = (p1.x - offset.x) * (p2.y - offset.y) - (p2.x - offset.x) * (p1.y - offset.y);
    twiceArea += f;
    x += (p1.x + p2.x - 2 * offset.x) * f;
    y += (p1.y + p2.y - 2 * offset.y) * f;
  }
  f = twiceArea * 3;
  return {
    x: x / f + offset.x,
    y: y / f + offset.y,
  };
}
