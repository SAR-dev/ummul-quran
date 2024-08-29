import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createBulkClassPlan, getStudentsByTeacher, StudentListDataType } from 'api/teacher';
import { useNotification } from 'contexts/Notification';
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { constants } from 'stores/constantStore'
import { Calendar, DateObject } from "react-multi-date-picker";
import { BulkClassPlanCreateType } from 'types/teacher';
import { getDateTimeWithOffset } from 'helpers/date';
import { NotificationType } from 'types/notification';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';
import { configResponsive, useResponsive } from 'ahooks';
import "react-multi-date-picker/styles/layouts/mobile.css";

configResponsive({
  small: 0,
  medium: 600,
  large: 1000,
});

interface ClassPlanType {
  date: DateObject;
  startTime: string;
  endTime: string;
  topic: string;
}

const CreateClass = () => {
  const responsive = useResponsive();
  const notification = useNotification()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [studentsId, setStudentsId] = useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const [classPlans, setClassPlans] = useState<ClassPlanType[]>([])

  const noOfCalendarCols = useMemo(() => {
    if(responsive["large"]) return 3;
    if(responsive["medium"]) return 2;
    return 1;
  }, [responsive])

  const sortedClassPlans = useMemo(() => {
    return [...classPlans].sort((a, b) => {
      // Compare years
      if (a.date.year !== b.date.year) return a.date.year - b.date.year;

      // Compare months
      if (a.date.month.number !== b.date.month.number) return a.date.month.number - b.date.month.number;

      // Compare days
      return a.date.day - b.date.day;
    });
  }, [classPlans]);

  const studentListData = useQuery<StudentListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_LIST_BY_TEACHER],
    queryFn: () => getStudentsByTeacher(),
  })

  const handleClassDates = (dates: DateObject[]) => {
    setClassPlans(prevClassPlans =>
      dates.map((newDate, index) => {
        const existingPlan = prevClassPlans[index] || {
          startTime: "",
          endTime: "",
          topic: ""
        };

        return {
          ...existingPlan,
          date: newDate,
        };
      })
    );
  };


  const selectStudentById = (val: string) => {
    setStudentsId(Number(val))
  }

  const handleStartTimeChange = (date: DateObject, time: string) => {
    if (!constants.REGEX_PATTERN.TIME.test(time)) return;
    setClassPlans(prevClassPlans =>
      prevClassPlans.map(plan => {
        // Check if the plan's date matches the provided date
        if (
          plan.date.year === date.year &&
          plan.date.month.number === date.month.number &&
          plan.date.day === date.day
        ) {
          // Return a new object with the updated startTime
          return {
            ...plan,
            startTime: time
          };
        }
        // Return the plan unchanged if the date doesn't match
        return plan;
      })
    );
  };

  const handleEndTimeChange = (date: DateObject, time: string) => {
    if (!constants.REGEX_PATTERN.TIME.test(time)) return;
    setClassPlans(prevClassPlans =>
      prevClassPlans.map(plan => {
        // Check if the plan's date matches the provided date
        if (
          plan.date.year === date.year &&
          plan.date.month.number === date.month.number &&
          plan.date.day === date.day
        ) {
          // Return a new object with the updated startTime
          return {
            ...plan,
            endTime: time
          };
        }
        // Return the plan unchanged if the date doesn't match
        return plan;
      })
    );
  };

  const handleTopicChange = (date: DateObject, topic: string) => {
    setClassPlans(prevClassPlans =>
      prevClassPlans.map(plan => {
        // Check if the plan's date matches the provided date
        if (
          plan.date.year === date.year &&
          plan.date.month.number === date.month.number &&
          plan.date.day === date.day
        ) {
          // Return a new object with the updated startTime
          return {
            ...plan,
            topic: topic
          };
        }
        // Return the plan unchanged if the date doesn't match
        return plan;
      })
    );
  };

  const handleDelete = (date: DateObject) => {
    setClassPlans(prevClassPlans => prevClassPlans.filter(e => e.date.format() != date.format()))
  }


  const handleSubmit = () => {
    if (!studentsId) return;
    const payload: BulkClassPlanCreateType = {
      students_id: studentsId,
      class_plans: classPlans.map(e => {
        return {
          start_at: getDateTimeWithOffset({ date: e.date.format("YYYY-MM-DD"), time: e.startTime }),
          finish_at: getDateTimeWithOffset({ date: e.date.format("YYYY-MM-DD"), time: e.endTime }),
          topic: e.topic
        }
      })
    }
    setIsLoading(true)
    createBulkClassPlan(payload).then(() => {
      notification.add({
        title: "Class Registered",
        message: "The class plan has been registered successfully.",
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

  return (
    <TeacherNavLayout>
      <div className="p-5 md:px-16 md:py-10">
        <div className='flex flex-col gap-5 max-w-3xl'>

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

          <div>
            <div className="label">
              <span className="label-text">Select Dates</span>
            </div>
            <Calendar
              value={classPlans.map(e => e.date)}
              onChange={handleClassDates}
              multiple
              numberOfMonths={noOfCalendarCols}
              minDate={new Date()}
              shadow={false}
              className={noOfCalendarCols == 1 ? "rmdp-mobile" : ""}
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
            {sortedClassPlans.map((classPlan, i) => (
              <div className='flex flex-col gap-3' key={i}>
                <div className="flex justify-between w-full items-center">
                  <div className="font-medium">{classPlan.date.format("dddd, DD MMMM YYYY")}</div>
                  <button className="btn btn-xs" onClick={() => handleDelete(classPlan.date)}>Delete</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <input
                    type="time"
                    value={classPlan.startTime}
                    className='input input-bordered w-full'
                    onChange={e => handleStartTimeChange(classPlan.date, e.target.value)}
                  />
                  <input
                    type="time"
                    value={classPlan.endTime}
                    className='input input-bordered w-full'
                    onChange={e => handleEndTimeChange(classPlan.date, e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder='Topic'
                    value={classPlan.topic}
                    className='input input-bordered w-full col-span-2 md:col-span-1'
                    onChange={e => handleTopicChange(classPlan.date, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

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