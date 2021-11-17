import { DISTANCE_THRESHOLD, SLOPE_THRESHOLD, VERTICAL, VERTICAL_THRESHOLD } from './constants';

class MyCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.shapes = [];
    this.draggingShape = null;
    this.draggingOffset = null;
    this.canvas.onmousedown = this.select;
    this.canvas.onmousemove = this.drag;
    this.canvas.onmouseup = this.unselect;
    this.canvas.onmouseout = this.unselect;
  }
  drag = (e) => {
    if (this.draggingShape === null) return;
    const { x, y } = this.getMousePosition(e);
    const alignOffset = this.align();
    this.draggingShape.moveTo(x - this.draggingOffset.x, y - this.draggingOffset.y);
    // this.draggingShape.moveTo(x - this.draggingOffset.x + alignOffset.dx, y - this.draggingOffset.y + alignOffset.dy);
    this.draw();
  };
  getMousePosition = (e) => {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    return { x, y };
  };
  select = (e) => {
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      const center = shape.getCenter();
      const mousePosition = this.getMousePosition(e);
      if (isInsidePolygon(mousePosition, shape.getPolygon())) {
        this.draggingShape = this.shapes[i];
        this.draggingOffset = { x: mousePosition.x - center.x, y: mousePosition.y - center.y };
        return;
      }
    }
  };
  unselect = () => {
    if (this.draggingShape === null) return;
    const alignOffset = this.align();
    this.draggingShape.move(alignOffset.dx, alignOffset.dy);
    this.draw();
    this.draggingShape = null;
    this.draggingOffset = null;
  };
  getCanvas = () => this.canvas;
  getContext = () => this.context;
  addShape = (shape) => {
    this.shapes.push(shape);
  };

  align = () => {
    if (this.draggingShape === null) return;
    const copyShapes = [...this.shapes].filter((shape) => shape.getId() !== this.draggingShape.getId());
    const nearShapes = calcNearShapes(this.draggingShape, copyShapes);
    let lineOverlapFlag = false;
    let alignOffset = { dx: 0, dy: 0 };
    for (let nearShapeIndex = 0; nearShapeIndex < nearShapes.length; nearShapeIndex++) {
      const nearShape = nearShapes[nearShapeIndex];
      const nearPolygonLines = polygonLines(nearShape);
      const draggingPolygonLines = polygonLines(this.draggingShape);

      for (let draggingLineIndex = 0; draggingLineIndex < draggingPolygonLines.length; draggingLineIndex++) {
        const draggingLine = draggingPolygonLines[draggingLineIndex];

        for (let nearLinesIndex = 0; nearLinesIndex < nearPolygonLines.length; nearLinesIndex++) {
          const nearLine = nearPolygonLines[nearLinesIndex];
          if (isLineOverlap(draggingLine, nearLine)) {
            lineOverlapFlag = true;
            alignOffset = calcLineOffset(draggingLine, nearLine);
            return alignOffset;
          }
        }
      }
    }
    return alignOffset;
  };
  draw = () => {
    const path = new Path2D('M0 15L4 27L5.5 54L19 75.5L18 69.5L19 58.5L12 22.5H9.5L6.5 16L10.5 15.5L4 0.5L0 15Z');
    this.context.fill(path);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      const polygon = shape.getPolygon();
      this.context.beginPath();
      this.context.moveTo(polygon[0].x, polygon[0].y);
      for (let j = 0; j < polygon.length; j++) {
        this.context.lineTo(polygon[j].x, polygon[j].y);
      }
      this.context.lineTo(polygon[0].x, polygon[0].y);
      this.context.strokeStyle = shape.getStrokeStyle();
      this.context.lineWidth = '3';
      this.context.fillStyle = shape.getColor();
      this.context.stroke();
      this.context.fill();
      this.context.closePath();
    }
  };
}

function polygonLines(shape) {
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
function isLineOverlap(line1, line2) {
  return isSlopeEqual(line1, line2) && isDistanceEqual(line1, line2);
}
function isSlopeEqual(line1, line2) {
  if (line1.slope === VERTICAL && line2.slope === VERTICAL) return true;
  return Math.abs(line1.slope - line2.slope) < SLOPE_THRESHOLD;
}
function isDistanceEqual(line1, line2) {
  const line1Point1 = line1.points[0];
  const line1Point2 = line1.points[1];
  const line2Point1 = line2.points[0];
  const line2Point2 = line2.points[1];
  const distance1 = Math.min(calcDistance(line1Point1, line2Point1), calcDistance(line1Point1, line2Point2));
  const distance2 = Math.min(calcDistance(line1Point2, line2Point1), calcDistance(line1Point2, line2Point2));
  return distance1 < DISTANCE_THRESHOLD && distance2 < DISTANCE_THRESHOLD;
}

function calcLineOffset(line1, line2) {
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

function calcNearShapes(shape, shapes) {
  const center = shape.getCenter();
  const shapeDistances = shapes.map((shape) => ({ shape, distance: calcDistance(center, shape.getCenter()) }));
  shapeDistances.sort((obj1, obj2) => obj1.distance - obj2.distance);
  return shapeDistances.slice(0, 3).map((item) => item.shape);
}

function calcDistance(point1, point2) {
  const xSquare = Math.pow(point1.x - point2.x, 2);
  const ySquare = Math.pow(point1.y - point2.y, 2);
  return Math.pow(xSquare + ySquare, 0.5);
}

function calcSlope(point1, point2) {
  if (Math.abs(point1.x - point2.x) < VERTICAL_THRESHOLD) return VERTICAL;
  return (point1.y - point2.y) / (point1.x - point2.x);
}

function isInsidePolygon(p, polygon) {
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

export default MyCanvas;
