import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvalibility } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader() {
  const products = await getProducts()
  return products
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateAvalibility(+data.id)
  return {}
}
export default function Products() {

  const products = useLoaderData() as Product []

  return (
    <>
      <div className="max-w-7xl mx-auto flex justify-between text-center py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-500"> Productos </h2>
        <Link to="/products/new" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"> Agregar Productos </Link>

      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </>

  )
}
