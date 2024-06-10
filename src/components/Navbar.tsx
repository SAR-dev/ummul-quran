import ThemeSwitcher from 'packages/ThemeSwitcher'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="border-b shadow-sm w-full flex justify-between items-center px-5 py-4">
        <div className="flex gap-3 items-center">
          <img className="h-8" src="https://cdn-icons-png.flaticon.com/512/4444/4444363.png" alt="" />
          <div className="font-semibold text-xl">Ummul Quran</div>
        </div>

        <div className="flex gap-3">
          <Link to="" className="btn">Students</Link>
          <Link to="" className="btn">History</Link>
          <button className="btn btn-square">
            <ThemeSwitcher />
          </button>
        </div>
      </nav>
  )
}

export default Navbar