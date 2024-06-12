import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData());
  let error = ''
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  if (error) {
    return error
  }

  await addProduct(data);
  return redirect('/')

}

export default function NewProduct() {

  const error = useActionData() as string;
  console.log(error);

  return (
    <>
      <div className="max-w-7xl mx-auto flex justify-between text-center py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-600"> Nuevo Prodcucto </h2>
        <Link to="/" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"> vovlver a productos </Link>
      </div>

      {
        error && <ErrorMessage>{error}</ErrorMessage>
      }

      <Form
        className="mt-10"
        method="post"
      >
        <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
