class MyCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.shapes = [];
    this.draggingShape = null;

    this.canvas.onmousedown = this.select;
    this.canvas.onmousemove = this.drag;
    this.canvas.onmouseup = this.unselect;
    this.canvas.onmouseout = this.unselect;
  }
  drag = (e) => {
    if (this.draggingShape === null) return;
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    this.draggingShape.moveTo(x, y);
    this.draw();
  };
  select = () => {
    this.draggingShape = this.shapes[0];
  };
  unselect = () => {
    this.draggingShape = null;
  };
  getCanvas = () => this.canvas;
  getContext = () => this.context;
  addShape = (shape) => {
    this.shapes.push(shape);
  };

  draw = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      const points = shape.getPoints();
      this.context.beginPath();
      this.context.moveTo(points[0].x, points[0].y);
      for (let j = 0; j < points.length; j++) {
        this.context.lineTo(points[j].x, points[j].y);
      }
      this.context.lineTo(points[0].x, points[0].y);
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
