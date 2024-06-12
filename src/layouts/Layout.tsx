import { Outlet } from "react-router-dom"
export default function Layout() {
    return (
        <>
            <header className="bg-slate-800">
                <div className="max-w-7xl mx-auto text-center py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl text-white font-extrabold">
                        Administrador de productos
                    </h1>
                
                </div>
            </header>

            <main className="mt-10 mx-auto bg-white max-w-6xl p-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 shadow">
                <Outlet />
            </main>
        </>


    )
}
