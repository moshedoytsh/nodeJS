class Shape {
    info(): string {
        return 'This is a shape';
    }
}

const shape1 = new Shape();
console.log(shape1.info());

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }

    scale(factor: number): Rectangle {
        const scaleFactor = Math.sqrt(factor);
        this.height *= scaleFactor;
        this.width *= scaleFactor;
        return this;
    }

    info(): string {
        return 'This is a rectangle';
    }

    static mergeRectangles(rectangle1: Rectangle, rectangle2: Rectangle): Rectangle {
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
    color: string;

    constructor(width: number, height: number, color: string) {
        super(width, height);
        this.color = color;
    }

    info(): string {
        return `This is a ${this.color} rectangle`;
    }
}

class Square extends Rectangle {

    constructor(width: number) {
        super(width, width);
    }

    area(): number {
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

function renderShapes (shapes: Shape2[]) {
    shapes.forEach(el => el.draw());
}

