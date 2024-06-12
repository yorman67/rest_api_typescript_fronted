
import axios from "axios"
import { DraftProductSchema, Product, productsSchema, ProductSchema } from "../types"
import { safeParse } from "valibot"
import { toBoolean } from "../helpers"
type ProductData = {
    [k: string]: FormDataEntryValue
}
export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price,
            availability: true
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            console.log(url)
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price,
                availability: result.output.availability
            })
        } else {
            throw new Error("Error al crear el producto, Datos no validos")
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)
        const result = safeParse(productsSchema, data.data)

        if (result.success) {
            return result.output
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)
        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(request: ProductData, id: Product['id']) {

    try {
        const result = safeParse(ProductSchema, {
            id,
            name: request.name,
            price: +request.price,
            availability: toBoolean(request.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

        console.log(result)

    } catch (error) {
        console.log(error)
    }

}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`    
        await axios.delete(url)

    } catch (error) {
        console.log(error)
    }
}

export async function updateAvalibility( id: Product['id']) {
    try {

    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)

    } catch (error) {
        console.log(error)
    }
}   

