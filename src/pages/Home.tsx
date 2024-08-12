import ClassHistory from "components/ClassHistory"
import ClassList from "components/ClassList"
import StudentList from "components/StudentList"
import TeacherNavLayout from "layouts/TeacherNavLayout"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "stores/authStore"

const Home = () => {
  const navigate = useNavigate()
  const { getLoggedInUserRole, isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn()) {
        navigate("/sign-in")
    }
}, [isLoggedIn, navigate])

  return (
    <>
      {getLoggedInUserRole() == "TEACHER" && (
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
    </>
  )
}

export default Home