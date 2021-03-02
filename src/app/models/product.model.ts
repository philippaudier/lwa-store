export class Product {
    constructor(
        public name: string,
        public type: string,
        public price: number,
        public description: string,
        public stock: number,
        public idProduct?: number,
        public quantity?: number
    ) {}
}
