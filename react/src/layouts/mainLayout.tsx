import {Outlet} from "react-router";

function MainLayout() {
    return (
        <>
            <header className="flex justify-center items-center h-16 bg-gray-200">
                Header
            </header>
            <main className="container mx-auto max-w-5xl p-4">
                <Outlet />
            </main>
            <footer className="flex justify-center items-center h-16 bg-gray-200">
                Footer
            </footer>
        </>
    );
}

export default MainLayout;