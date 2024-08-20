import ClassHistory from "components/ClassHistory"
import ClassList from "components/ClassList"
import StudentList from "components/StudentList"
import StudentNavLayout from "layouts/StudentNavLayout"
import TeacherNavLayout from "layouts/TeacherNavLayout"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuthStore } from "stores/authStore"
import { constants } from "stores/constantStore"
import StudentSelfProfile from "components/StudentSelfProfile"
import { useEffect } from "react"

const Home = () => {
  const navigate = useNavigate()
  const { isLoggedIn, getLoggedInUserRole } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/sign-in")
    }
  }, [isLoggedIn, navigate])
  
  return (
    <>
      {getLoggedInUserRole() == constants.ROLES.TEACHER && (
        <TeacherNavLayout>
          <div className="grid grid-cols-4 w-full">
            <div className="col-span-3">
              <div className="p-16 w-full grid grid-cols-1 gap-10">
                <ClassList />
                <StudentList />
              </div>
            </div>
            <div className="col-span-1 py-16">
              <ClassHistory />
            </div>
          </div>
        </TeacherNavLayout>
      )}
      {getLoggedInUserRole() == constants.ROLES.STUDENT && (
        <StudentNavLayout>
          <StudentSelfProfile />
        </StudentNavLayout>
      )}
      {getLoggedInUserRole() == constants.ROLES.ADMIN && (
        <Navigate to="/admin" />
      )}
    </>
  )
}

export default Home