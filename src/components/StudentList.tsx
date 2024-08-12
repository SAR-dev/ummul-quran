import { useQuery } from "@tanstack/react-query";
import { getStudentsByTeacher, StudentListDataType } from "api/teacher";
import { constants } from "stores/constantStore";
import StudentTable from "./StudentTable";

const StudentList = () => {
    const studentListData = useQuery<StudentListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.STUDENT_LIST_BY_TEACHER],
        queryFn: () => getStudentsByTeacher(),
    })

    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have {studentListData.data?.data.length} students</div>
            </div>

            {studentListData.data && studentListData.data?.data.length > 0 && (
                <StudentTable students={studentListData.data.data} />
            )}

        </div>
    )
}

export default StudentList