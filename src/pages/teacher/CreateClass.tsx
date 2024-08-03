import { useQuery } from '@tanstack/react-query'
import { getStudentsByTeacher, StudentListDataType } from 'api/teacher'
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { constants } from 'stores/constantStore'

const CreateClass = () => {
  const studentListData = useQuery<StudentListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_LIST_BY_TEACHER],
    queryFn: () => getStudentsByTeacher(),
  })

  return (
    <TeacherNavLayout>
      <div className="px-16 py-10">
        <div>Select Student</div> {/* Show Name and location */}
        <div>Show Student avatar, name, email, location, package name, package minutes</div>

        <div>Input start date</div>
        <div>Show teacher, student side date</div>

        <div>Input Start Time</div>
        <div>Show teacher, student side time</div>

        <div>Input end date</div>
        <div>Show teacher, student side date</div>

        <div>Input End Time</div>
        <div>Show teacher, student side time</div>

        <div>Input topic</div>
        <div>Textarea description</div>
        <div>Textarea memo</div>
      </div>
    </TeacherNavLayout>
  )
}

export default CreateClass