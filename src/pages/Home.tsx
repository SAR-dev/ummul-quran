import ClassHistory from "components/ClassHistory"
import ClassList from "components/ClassList"
import NavLayout from "components/NavLayout"
import StudentList from "components/StudentList"

const Home = () => {
  return (
    <NavLayout>
      <div className="grid grid-cols-4 w-full">
        <div className="md:col-span-3 col-span-4 md:p-16 p-5">
          <div className="w-full grid grid-cols-1 gap-10">
            <ClassList />
            <StudentList />
          </div>
        </div>
        <div className="md:col-span-1 col-span-4 md:py-16 p-5">
          <ClassHistory />
        </div>
      </div>
    </NavLayout>
  )
}

export default Home