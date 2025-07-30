"use server"

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas"

type ActionStatetype = {
    errors : string[]
    success : string
}

export async function addProduct(prevState : ActionStatetype, formData : FormData) {

    const product = ProductFormSchema.safeParse({
        name : formData.get('name'),
        price : formData.get('price'),
        image : formData.get('image'),
        inventory : formData.get('inventory'),
        categoryId : formData.get('categoryId'),
    })

    if(!product.success) {
        return {
            errors : product.error.issues.map(issue => issue.message),
            success : ''
        }
    }

    const url = `${process.env.API_URL}/products`

    const req = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : product.data.name,
            price : product.data.price,
            image : product.data.image,
            inventory : product.data.inventory,
            categoryId : product.data.categoryId,
        })
    })

    const json = await req.json()

    if(!req.ok) {
        const errors  = ErrorResponseSchema.parse(json)
        return {
            errors : errors.message.map(error => error),
            success : ''
        }
    }

    return {
        errors : [],
        success : "Producto Agregado Correctamente"
    }

}