import Header from "./Header/index"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="pt-24 p-4 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

