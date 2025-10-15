import { Link } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
export default function Navbar({ user, logout }) {
  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-10">
      <div className="px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl"></Link>

        {/* Links  */}
        <div className="space-x-4">
          {user && (
            <>
              <span className="text-sm mr-2">Hi, {user.username}</span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                <LogoutIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
