import { calcNearShapes, isInsidePolygon, polygonLines } from './utils/polygon';
import { calcLineOffset, isLineOverlap } from './utils/line';

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
    this.draggingShape.moveTo(x - this.draggingOffset.x, y - this.draggingOffset.y);
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

        if (i !== this.shapes.length - 1) {
          this.shapes.splice(i, 1);
          this.shapes.push(this.draggingShape);
          this.draw();
        }

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

export default MyCanvas;
