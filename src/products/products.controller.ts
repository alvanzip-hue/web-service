import { Body, Controller,Delete,Get,Param,ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service.js";
import { Product } from "./product.interface.js";

@Controller("products")
export class ProductsController {

constructor(
    private readonly prod:ProductsService
) {

}

  @Get() 
  getAll() {
    return this.prod.getAll();
  }

  @Get(":id")
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.prod.getOne(id);
  }

  @Post()
create(
  @Body() body: Omit<Product, 'id'>,
) {
  return this.prod.create(body);
}

@Put(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: Omit<Product, 'id'>,
) {
  return this.prod.update(id, body);
}

@Patch(':id')
patch(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: Partial<Omit<Product, 'id'>>,
) {
  return this.prod.patch(id, body);
}

@Delete(':id')
remove(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.prod.remove(id);
}


}
