import ThemeSwitcher from 'packages/ThemeSwitcher'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="border-b border-base-300 w-full flex justify-between items-center px-5 py-4">
      <div className="flex gap-3 items-center">
        <img className="h-8" src="https://i.ibb.co/qjD26QZ/quran.png" alt="" />
        <div className="font-semibold text-xl">Ummul Quran</div>
      </div>

      <div className="flex gap-3">
        <Link to="" className="btn btn-ghost">Students</Link>
        <Link to="" className="btn btn-ghost">History</Link>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}

export default Navbar