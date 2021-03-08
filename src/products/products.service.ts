import {Injectable, NotFoundException} from '@nestjs/common'

import {Product} from './products.model'

@Injectable()
export class ProductsService {
    private products: Product[] = []

    private findProduct(prodId): [Product, number] {
        const index = this.products.findIndex((prod) => prod.id === prodId)
        const product = this.products[index]
        if (!product) {
            throw new NotFoundException('Could not find product.')
        }
        return [product, index]
    }
    insertProduct (title: string, desc: string, price: number): string {
        const prodId = this.products.length.toString()
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }

    retrieveAllProducts (): any {
        return [...this.products] // Spread operator for sending new Array and not the copy
    }

    getProduct(prodId: string) {
        const product = this.findProduct(prodId)[0]
        return {...product}
    }

    updateProduct(prodId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(prodId)
        const updatedProduct = {...product}
        if(title) {
            updatedProduct.title = title
        }
        if(desc) {
            updatedProduct.description = desc
        }
        if(price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
        return updatedProduct        
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1]
        this.products.splice(index, 1)
    }
}