import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.interface.js";

@Injectable()
export class ProductsService {
    
  private readonly products: Product[] = [
    { id: 1, name: "Laptop", price: 12500000 },
    { id: 2, name: "Keyboard", price: 250000 },
    { id: 3, name: "Mouse", price: 150000 },
  ];

  getAll() {
    return this.products;
  }

  getOne(id:number): Product{
    const prod = this.products.find(x => x.id == id);
    if(!prod){
      throw new NotFoundException('Product not found');
    }
    return prod;
  }

  create(data: Omit<Product, 'id'>): Product {
  const nextId = this.products.length
    ? Math.max(
        ...this.products.map((product) => product.id),
      ) + 1
    : 1;

  const newProduct: Product = {
    id: nextId,
    ...data,
  };

  this.products.push(newProduct);
  return newProduct;
}

update(
  id: number,
  data: Omit<Product, 'id'>,
): Product {
  const product = this.getOne(id);

  product.name = data.name;
  product.price = data.price;

  return product;
}

patch(
  id: number,
  data: Partial<Omit<Product, 'id'>>,
): Product {
  const product = this.getOne(id);

  Object.assign(product, data);
  return product;
}

remove(id: number): Product {
  const index = this.products.findIndex(
    (product) => product.id === id,
  );

  if (index === -1) {
    throw new NotFoundException('Product not found');
  }

  const [removedProduct] = this.products.splice(index, 1);
  return removedProduct;
}


}
