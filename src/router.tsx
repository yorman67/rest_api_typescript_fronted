import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import NewProduct , { action as NewProductAction}from "./views/NewProduct";
import Products, { loader as ProductsLoader, action as updateAvalibilityAction } from "./views/Products";
import EditProduct,{loader as EditProductLoader, action as EditProductAction} from "./views/EditProduct"
import { action as DeleteProductAction } from "./components/ProductDetails";
export const router =  createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: ProductsLoader, // se carga antes de la página
                action: updateAvalibilityAction
                
            },
            {
                path: "products/new",
                element: <NewProduct />,
                action: NewProductAction
            },
            {
                path: "products/:id/edit", // ROA Pattern - resource oriented design
                element: <EditProduct />,
                loader: EditProductLoader,
                action: EditProductAction
            },
            {
                path: "products/:id/delete",
                action: DeleteProductAction
            }
        ]
    }
])