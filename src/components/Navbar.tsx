import ThemeSwitcher from 'packages/ThemeSwitcher'
import { Link } from 'react-router-dom'
import SignInButton from './SignInButton'
import { useAuthStore } from 'stores/authStore'

const Navbar = () => {
  const { getLoggedInUserRole } = useAuthStore()

  return (
    <nav className="border-b border-base-300 w-full flex justify-between items-center px-5 py-4">
      <Link className="flex gap-3 items-center" to="/">
        <img className="h-6" src="https://i.ibb.co/qjD26QZ/quran.png" alt="" />
        <div className="font-bold text-xl">Ummul Quran</div>
      </Link>

      <div className="flex gap-3">
        {getLoggedInUserRole() == "ADMIN" && (
          <Link to="/admin" className="btn btn-ghost">Admin</Link>
        )}
        {getLoggedInUserRole() == "TEACHER" && (
          <Link to="/teachers/class/create" className="btn btn-ghost">
            Plan Class
          </Link>
        )}
        <ThemeSwitcher />
        <SignInButton />
      </div>
    </nav>
  )
}

export default Navbar