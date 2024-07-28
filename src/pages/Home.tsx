import ClassHistory from "components/ClassHistory"
import ClassList from "components/ClassList"
import StudentList from "components/StudentList"
// import AuthNavLayout from "layouts/AuthNavLayout"
import NavLayout from "layouts/NavLayout"

const Home = () => {
  return (
    <NavLayout>
        {/* <AuthNavLayout> */}
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
        {/* </AuthNavLayout> */}
    </NavLayout>
  )
}

export default Home