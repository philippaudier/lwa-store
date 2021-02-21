export class Product {
    constructor(
        public name: string,
        public type: string,
        public price: number,
        public idProduct?: number,
        public quantity?: string
    ) {}
}
