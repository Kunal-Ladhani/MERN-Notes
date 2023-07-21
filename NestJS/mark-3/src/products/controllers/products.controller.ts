import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { UpdateProductDto } from '../dtos/updateProduct.dto';
import { ProductsService } from '../services/products.service';

@Controller('/products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { };

    @Get()
    private async listProducts(@Req() req, @Res() res) {
        console.log("--------------REQUEST---------------------");
        console.log(req);
        console.log("--------------RESPONSE--------------------");
        console.log(res);
        return await this.productService.findAllProducts();
    }

    @Get('/:id')
    private async seeOneProduct(@Param('id') id: string) {
        return await this.productService.findOneProduct(id);
    }

    @Post()
    private async createProduct(@Body() createProductDto: CreateProductDto) {
        return await this.productService.createProduct(createProductDto);
    }

    @Put('/:id')
    private async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.updateProduct(id, updateProductDto);
    }

    // @Patch('/:id')
    // private async updateProductField(
    //     @Param('id') id: string,
    //     @Body() productDto: UpdateProductDto) {
    //     return await this.productService.updateProduct(id, productDto);
    // }

    @Delete('/:id')
    private async deleteOneProduct(@Param('id') id: string) {
        return await this.productService.deleteProduct(id);
    }

}
