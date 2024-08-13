import NavLayout from "layouts/NavLayout"
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <NavLayout>
            <section>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
                            404
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
                            Something's missing.
                        </p>
                        <p className="mb-4 text-lg font-light">
                            Sorry, we can't find that page. You'll find lots to explore on the home
                            page.
                        </p>
                        <Link to="/" className="btn">Back To Homepage</Link>
                    </div>
                </div>
            </section>
        </NavLayout>
    )
}

export default ErrorPage