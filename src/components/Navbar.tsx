import ThemeSwitcher from 'packages/ThemeSwitcher'
import { Link } from 'react-router-dom'
import SignInButton from './SignInButton'
import { useAuthStore } from 'stores/authStore'
import { SquaresPlusIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { getLoggedInUserRole } = useAuthStore()

  return (
    <nav className="border-b border-base-300 w-full flex justify-between items-center px-5 py-4">
      <Link className="flex gap-3 items-center" to="/">
        <img className="h-8" src="https://i.ibb.co/qjD26QZ/quran.png" alt="" />
        <div className="font-semibold text-xl">Ummul Quran</div>
      </Link>

      <div className="flex gap-3">
        {getLoggedInUserRole() == "ADMIN" && (
          <Link to="/admin" className="btn btn-ghost">Admin</Link>
        )}
        {getLoggedInUserRole() == "TEACHER" && (
          <Link to="/teacher/create-class" className="btn btn-ghost">
            <SquaresPlusIcon className='h-5 w-5' />
          </Link>
        )}
        <ThemeSwitcher />
        <SignInButton />
      </div>
    </nav>
  )
}

export default Navbar