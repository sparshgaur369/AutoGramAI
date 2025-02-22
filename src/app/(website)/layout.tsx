import { Navbar } from "./_components/navbar"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col container">
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
