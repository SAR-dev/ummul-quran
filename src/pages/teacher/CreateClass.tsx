import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClassPlan, getStudentsByTeacher, StudentListDataType } from 'api/teacher'
import { useNotification } from 'contexts/Notification';
import { getDateTimeWithOffset, getTodayDateInYYYYMMDD } from 'helpers/date';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { constants } from 'stores/constantStore'
import { NotificationType } from 'types/notification';
import { ClassPlanCreateType } from 'types/teacher'

const CreateClass = () => {
  const notification = useNotification()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [studentsId, setStudentsId] = useState<number | undefined>(undefined)
  const [startDate, setStartDate] = useState<string>(getTodayDateInYYYYMMDD())
  const [startTime, setStartTime] = useState<string>("12:00")
  const [endDate, setEndDate] = useState<string>(getTodayDateInYYYYMMDD())
  const [endTime, setEndTime] = useState<string>("13:00")
  const [topic, setTopic] = useState("")
  const [description, setDescription] = useState("")
  const [memo, setMemo] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const studentListData = useQuery<StudentListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_LIST_BY_TEACHER],
    queryFn: () => getStudentsByTeacher(),
  })

  const selectStudentById = (val: string) => {
    setStudentsId(Number(val))
  }

  const parseDateChange = (val: string) => {
    if (constants.REGEX_PATTERN.DATE.test(val)) {
      const date = new Date(val);
      if (date.toISOString().startsWith(val)) {
        return val;
      }
    }
    return startDate;
  }

  const parseTimeChange = (val: string) => {
    if (constants.REGEX_PATTERN.TIME.test(val)) {
      return val;
    }
    return startTime;
  }

  const handleSubmit = () => {
    if (!studentsId) return;
    const payload: ClassPlanCreateType = {
      students_id: studentsId,
      start_at: getDateTimeWithOffset({ date: startDate, time: startTime }),
      finish_at: getDateTimeWithOffset({ date: endDate, time: endTime }),
      topic,
      description,
      memo
    }
    setIsLoading(true)
    createClassPlan(payload).then(res => {
      if (res.error) {
        notification.add({
          title: "Error Occured",
          message: parseErrorMessage(res.error as RawErrorMessageProps).message,
          status: NotificationType.ERROR
        })
      } else {
        notification.add({
          title: "Class Registered",
          message: "The class plan has been registered successfully.",
          status: NotificationType.SUCCESS
        })
        queryClient.invalidateQueries({queryKey: [constants.QUERY_KEYS.CLASS_LIST]})
        navigate(-1)
      }
    })
      .catch(err => {
        notification.add({
          title: "Error Occured",
          message: parseErrorMessage(err as RawErrorMessageProps).message,
          status: NotificationType.ERROR
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <TeacherNavLayout>
      <div className="px-16 py-10">
        <div className='grid grid-cols-1 gap-5 max-w-md'>

          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Select Student</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={studentsId}
              onChange={e => selectStudentById(e.target.value)}
            >
              <option disabled selected>Choose student</option>
              {studentListData.data?.data.map((c, i) => (
                <option
                  value={c.students_id}
                  key={i}
                >
                  {c.user.name} ({c.pack.minutes} Min){c.user.location ? "," : ""} {c.user.location}
                </option>
              ))}
            </select>
            <div className="text-sm opacity-50 mt-1">
              {studentListData.data?.data.find(e => e.students_id == studentsId)?.user.email ?? "No student selected yet"}
            </div>
          </label>

          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Class Starts At</span>
            </div>
            <div className="flex gap-5">
              <input
                type="date"
                value={startDate}
                className='input input-bordered w-full'
                onChange={e => {
                  setStartDate(parseDateChange(e.target.value))
                  setEndDate(parseDateChange(e.target.value))
                }}
              />
              <input
                type="time"
                value={startTime}
                className='input input-bordered w-full'
                onChange={e => setStartTime(parseTimeChange(e.target.value))}
              />
            </div>
          </label>

          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Class Ends At</span>
            </div>
            <div className="flex gap-5">
              <input
                type="date"
                value={endDate}
                className='input input-bordered w-full'
                onChange={e => setEndDate(parseDateChange(e.target.value))}
              />
              <input
                type="time"
                value={endTime}
                className='input input-bordered w-full'
                onChange={e => setEndTime(parseTimeChange(e.target.value))}
              />
            </div>
          </label>

          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Class Topic</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
          </label>

          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Class Details</span>
            </div>
            <textarea
              className='textarea textarea-bordered'
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>

          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Memo</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={memo}
              onChange={e => setMemo(e.target.value)}
            />
          </label>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Create Class Plan
          </button>

        </div>
      </div>
    </TeacherNavLayout>
  )
}

export default CreateClass