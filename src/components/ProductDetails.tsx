import { Product } from "../types"
import { formatCurrency } from "../helpers"
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { deleteProduct } from "../services/ProductService"


type PruductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {

    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }

}


export default function ProductDetails({ product }: PruductDetailsProps) {

    const fetcher = useFetcher()
    const isAvailable = product.availability
    const navigate = useNavigate()

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? "w-full text-black text-center hover:text-black border font-bold border-black hover:bg-gray-300 rounded-full p-1" : "w-full text-red-600 text-center hover:text-red-800 border font-bold border-red-600 hover:bg-red-300 rounded-full p-1"} w-full font-bold text-center rounded-full p-1`}>
                        {isAvailable ? "Disponible" : "No Disponible"}
                    </button>
                </fetcher.Form  >
               
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center ">
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className=" w-full text-indigo-600 text-center hover:text-indigo-800 border font-bold border-indigo-600 hover:bg-indigo-300 rounded-full p-1">
                        editar
                    </button>


                    <Form
                        method="delete"
                        action={`products/${product.id}/delete`}
                        className="w-full"
                        onSubmit={e => {
                            if (!confirm('¿Desea eliminar el producto?')) {
                            e.preventDefault()
                        }
                        }}>
                        <input
                            type="submit"
                            value="Eliminar"
                            className=" w-full text-red-600 text-center hover:text-red-800 border font-bold border-red-600 hover:bg-red-300 rounded-full p-1"
                        />

                    </Form>
                </div>
            </td>
        </tr>

    )
}
