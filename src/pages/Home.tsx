import ClassHistory from "components/ClassHistory"
import ClassList from "components/ClassList"
import Navbar from "components/Navbar"
import StudentList from "components/StudentList"

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-base-100">
      <Navbar />

      <div className="grid grid-cols-4 w-full">
        <div className="col-span-3">
          <div className="p-16 w-full max-w-screen-xl grid grid-cols-1 gap-10">
            <ClassList />
            <StudentList />
          </div>
        </div>

        <div className="col-span-1 py-16">
          <ClassHistory />
        </div>
      </div>

      {/* ----------------Left---------------- */}

      {/* Class history */}

      {/* ----------------Right---------------- */}


    </div>
  )
}

export default Home