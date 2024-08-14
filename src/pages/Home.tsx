import ClassHistory from "components/ClassHistory"
import ClassList from "components/ClassList"
import StudentList from "components/StudentList"
import TeacherNavLayout from "layouts/TeacherNavLayout"

const Home = () => {
  return (
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
  )
}

export default Home