class Shape {
  constructor(points, center) {
    this.points = points;
    this.center = center;
    this.color = 'grey';
    this.strokeStyle = 'blue';
  }
  getPoints = () => this.points;
  getCenter = () => this.center;
  getColor = () => this.color;
  getStrokeStyle = () => this.strokeStyle;

  move = (x, y) => {
    this.points.forEach((item) => {
      item.x += x;
      item.y += y;
    });
    this.center.x += x;
    this.center.y += y;
  };
  moveTo = (x, y) => {
    const dx = x - this.center.x;
    const dy = y - this.center.y;
    this.points.forEach((item) => {
      item.x += dx;
      item.y += dy;
    });
    this.center.x += dx;
    this.center.y += dy;
  };
}

export default Shape;
