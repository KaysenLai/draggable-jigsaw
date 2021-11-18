class Shape {
  constructor(polygon, center, id, color = 'grey') {
    this.polygon = polygon;
    this.center = center;
    this.originCenter = { ...center };
    this.color = color;
    this.strokeStyle = 'blue';
    this.id = id
  }

  getPolygon = () => this.polygon;
  getCenter = () => this.center;
  getColor = () => this.color;
  getId = () => this.id;
  getStrokeStyle = () => this.strokeStyle;
  getDelta = () => ({
    x: this.center.x - this.originCenter.x,
    y: this.center.y - this.originCenter.y,
  });

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
