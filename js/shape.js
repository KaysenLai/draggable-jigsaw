class Shape {
  constructor(polygon, center, id, color) {
    this.polygon = polygon;
    this.center = center;
    this.color = color;
    this.strokeStyle = '#451B4E';
    this.lineWidth = 5;
    this.id = id;
  }

  getPolygon = () => this.polygon;
  getCenter = () => this.center;
  getColor = () => this.color;
  getId = () => this.id;
  getStrokeStyle = () => this.strokeStyle;
  getLineWidth = () => this.lineWidth;

  move = (dx, dy) => {
    this.polygon.forEach((point) => {
      point.x += dx;
      point.y += dy;
    });
    this.center.x += dx;
    this.center.y += dy;
    this.moveLinearGradient(dx, dy);
  };

  moveTo = (x, y) => {
    const dx = x - this.center.x;
    const dy = y - this.center.y;
    this.polygon.forEach((item) => {
      item.x += dx;
      item.y += dy;
    });
    this.center.x += dx;
    this.center.y += dy;
    this.moveLinearGradient(dx, dy);
  };

  moveLinearGradient = (dx, dy) => {
    const { stPoint, endPoint } = this.color;
    stPoint.x1 += dx;
    stPoint.y1 += dy;
    endPoint.x2 += dx;
    endPoint.y2 += dy;
  };
}

export default Shape;
