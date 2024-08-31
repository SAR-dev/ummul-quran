import ThemeSwitcher from 'packages/ThemeSwitcher'
import { Link } from 'react-router-dom'
import SignInButton from './SignInButton'
import { useAuthStore } from 'stores/authStore'
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Navbar = () => {
  const { getLoggedInUserRole } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <nav className="border-b border-base-300 w-full flex justify-between items-center px-5 py-4">
        <Link className="flex gap-3 items-center" to="/">
          <img className="h-6" src="https://i.ibb.co/qjD26QZ/quran.png" alt="" />
          <div className="font-bold text-xl hidden md:block">Ummul Quran</div>
        </Link>

        <div className="gap-3 hidden md:flex">
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
        <div className='flex md:hidden'>
          <button className="btn btn-sm btn-ghost" onClick={() => setShowMenu(!showMenu)}>
            <Bars3Icon className='h-5 w-5' />
          </button>
        </div>
      </nav>
      {showMenu && (
        <div className="flex flex-col divide-y divide-base-300 border-b border-base-300 md:hidden shadow">
          {getLoggedInUserRole() == "ADMIN" && (
            <Link to="/admin" className="btn btn-ghost rounded-none justify-start">Admin</Link>
          )}
          {getLoggedInUserRole() == "TEACHER" && (
            <Link to="/teachers/class/create" className="btn btn-icon btn-ghost rounded-none justify-start">
              <PlusIcon className='h-5 w-5' />
              Plan Class
            </Link>
          )}
          <ThemeSwitcher asMobile={true} />
          <SignInButton asMobile={true} />
        </div>
      )}
    </>
  )
}

export default Navbar