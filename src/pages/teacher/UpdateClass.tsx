import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ClassPlanDataType,
  deleteClassPlanById,
  getClassPlanById,
  getStudentsByTeacher,
  StudentListDataType,
  updateClassPlan,
} from 'api/teacher';
import { useNotification } from 'contexts/Notification';
import { getDateTimeWithOffset, getTodayDateInYYYYMMDD, timestampToDateTime } from 'helpers/date';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { constants } from 'stores/constantStore'
import { NotificationType } from 'types/notification';
import { ClassPlanUpdateType } from 'types/teacher';

const UpdateClass = () => {
  const { id = "" } = useParams();
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

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getClassPlanById(Number(id))
      .then(res => {
        const data: ClassPlanDataType = res;
        setStudentsId(data.data.students_id)
        setStartDate(timestampToDateTime(data.data.start_at).date)
        setStartTime(timestampToDateTime(data.data.start_at).time)
        setEndDate(timestampToDateTime(data.data.finish_at).date)
        setEndTime(timestampToDateTime(data.data.finish_at).time)
        setTopic(data.data.topic)
        setDescription(data.data.description)
        setMemo(data.data.memo)
      })
      .catch(err => {
        notification.add({
          title: "Error Occured",
          message: parseErrorMessage(err as RawErrorMessageProps).message,
          status: NotificationType.ERROR
        })
      })
      .finally(() => setIsLoading(false))
  }, [id])


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
    const payload: ClassPlanUpdateType = {
      start_at: getDateTimeWithOffset({ date: startDate, time: startTime }),
      finish_at: getDateTimeWithOffset({ date: endDate, time: endTime }),
      topic,
      description,
      memo,
      id: Number(id)
    }
    setIsLoading(true)
    updateClassPlan(payload).then(() => {
      notification.add({
        title: "Class Updated",
        message: "The class plan has been updated successfully.",
        status: NotificationType.SUCCESS
      })
      queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.CLASS_LIST] })
      navigate(-1)
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

  const deleteClassPlan = () => {
    setIsLoading(true)
    deleteClassPlanById(Number(id)).then(() => {
      notification.add({
        title: "Class Deleted",
        message: "The class plan has been deleted successfully.",
        status: NotificationType.SUCCESS
      })
      queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.CLASS_LIST] })
      navigate("/")
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

  const handleDelete = () => {
    notification.add({
      title: "Confirmation Required",
      message: "Are you sure you want to delete this class plan ? If you delete it you can not recover later.",
      status: NotificationType.INFO,
      body: (
        <div className='flex gap-3 justify-center w-full'>
          <button className="btn btn-error" onClick={deleteClassPlan}>Yes, I am Sure</button>
          <button className="btn btn-success" onClick={() => notification.remove()}>No, I will Stay</button>
        </div>
      )
    })
  }

  return (
    <TeacherNavLayout>
      <div className="p-5 md:px-16 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Select Student</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={studentsId}
              onChange={e => selectStudentById(e.target.value)}
              disabled
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

          <div className="col-span-2">
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
          </div>

          <label className="form-control flex flex-col w-full">
            <input
              type="text"
              className="input input-bordered"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder='Write a memo'
            />
          </label>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Update Class Plan
          </button>
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete Class Plan
          </button>

        </div>
      </div>
    </TeacherNavLayout>
  )
}

export default UpdateClass