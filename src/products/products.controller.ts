import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common'
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const prodId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
        return {success: true, message: { id: prodId }}
    }

    @Get()
    getAllProducts(): any {
        const products = this.productsService.retrieveAllProducts()
        return {success: true, message: { products }}
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        const product = this.productsService.getProduct(prodId)
        return {success: true, message: { product }}
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const updatedProduct = this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
        return {success: true, message: { product: updatedProduct }}   
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId)
        return {success: true, message: 'Product deleted successfully.'}
    }

}