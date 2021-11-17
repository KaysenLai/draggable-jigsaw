class Shape {
  constructor(polygon, center, id) {
    this.polygon = polygon;
    this.center = center;
    this.id = id;
    this.color = 'grey';
    this.strokeStyle = 'blue';
  }
  getPolygon = () => this.polygon;
  getCenter = () => this.center;
  getColor = () => this.color;
  getId = () => this.id;
  getStrokeStyle = () => this.strokeStyle;

  move = (x, y) => {
    this.polygon.forEach((item) => {
      item.x += x;
      item.y += y;
    });
    this.center.x += x;
    this.center.y += y;
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
  };
}

export default Shape;
