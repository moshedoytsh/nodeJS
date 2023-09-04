"use strict";
class Shape {
    info() {
        return 'This is a shape';
    }
}
const shape1 = new Shape();
console.log(shape1.info());
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    scale(factor) {
        const scaleFactor = Math.sqrt(factor);
        this.height *= scaleFactor;
        this.width *= scaleFactor;
        return this;
    }
    info() {
        return 'This is a rectangle';
    }
    static mergeRectangles(rectangle1, rectangle2) {
        const area = rectangle1.area() + rectangle2.area();
        const ratio = (rectangle1.width + rectangle2.width) / (rectangle1.height + rectangle2.height);
        const height = Math.sqrt(area / ratio);
        const width = area / height;
        return new Rectangle(width, height);
    }
}
const rectangle1 = new Rectangle(4, 3);
const rectangle2 = new Rectangle(4, 3);
console.log(Rectangle.mergeRectangles(rectangle1, rectangle2));
class ColoredRectangle extends Rectangle {
    constructor(width, height, color) {
        super(width, height);
        this.color = color;
    }
    info() {
        return `This is a ${this.color} rectangle`;
    }
}
class Square extends Rectangle {
    constructor(width) {
        super(width, width);
    }
    area() {
        return this.width ** 2;
    }
}
// 5
class Shape2 {
    draw() {
        console.log('Drawing a shape');
    }
}
class Rectangle2 extends Shape {
    draw() {
        console.log('Drawing a rectangle');
    }
}
class Circle extends Shape {
    draw() {
        console.log('Drawing a circle');
    }
}
class Triangle extends Shape {
    draw() {
        console.log('Drawing a triangle');
    }
}
function renderShapes(shapes) {
    shapes.forEach(el => el.draw());
}
