import { InferOutput, array, boolean, number, object, string } from "valibot"

export const DraftProductSchema = object({
    name: string(),
    price:number(),
    availability: boolean()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const productsSchema =  array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>