import { calcNearShapes, isInsidePolygon, polygonLines } from './utils/polygon';
import { calcLineOffset, isLineOverlap } from './utils/line';
import Shape from './shape';

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
    let currentIndex = -1;
    const mousePosition = this.getMousePosition(e);

    // this.shapes 中第一项为背景，不可选中，所以 i >= 1
    for (let i = this.shapes.length - 1; i >= 1; i--) {
      if (isInsidePolygon(mousePosition, this.shapes[i].getPolygon())) {
        currentIndex = i;
        break;
      }
    }

    if (currentIndex !== -1) {
      const shape = this.shapes[currentIndex];
      const center = shape.getCenter();

      this.draggingShape = shape;

      if (currentIndex !== this.shapes.length - 1) {
        this.shapes.splice(currentIndex, 1);
        this.shapes.push(this.draggingShape);
        this.draw();
      }

      this.draggingOffset = { x: mousePosition.x - center.x, y: mousePosition.y - center.y };
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

      const color = shape.getColor();

      if (typeof color === 'string') {
        this.context.fillStyle = color;
      } else {
        let {
          stPoint: { x1, y1 },
          endPoint: { x2, y2 },
          colorStops,
        } = color;
        const { x, y } = shape.getDelta();

        x1 = Math.floor(Number(x1)) + x;
        x2 = Math.floor(Number(x2)) + x;
        y1 = Math.floor(Number(y1)) + y;
        y2 = Math.floor(Number(y2)) + y;

        const inearGradient = this.context.createLinearGradient(x1, y1, x2, y2);

        colorStops.forEach((item) => {
          const [_point, _color] = item;
          inearGradient.addColorStop(_point, _color);
        });

        this.context.fillStyle = inearGradient;
      }

      this.context.stroke();
      this.context.fill();
      this.context.closePath();
    }
  };

  toString = () => {
    const data = this.shapes.map((shape) => {
      const { polygon, center, color } = shape;
      return { polygon, center, color };
    });

    return JSON.stringify(data);
  };

  loadFromString = (dataString) => {
    const temp = this.shapes;

    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(dataString);
        this.shapes = [];
        data.forEach((shape) => {
          const { polygon, center, color } = shape;
          if (polygon == null || center == null) {
            throw new Error();
          }
          this.addShape(new Shape(polygon, center, color));
        });
        resolve();
      } catch (err) {
        this.shapes = temp;
        reject();
      } finally {
        this.draw();
      }
    });
  };

  loadFromModel = (model) => {
    const temp = this.shapes;

    return new Promise((resolve, reject) => {
      try {
        this.shapes = [...model];
        resolve();
      } catch (err) {
        this.shapes = temp;
        reject();
      } finally {
        this.draw();
      }
    });
  };
}

export default MyCanvas;
