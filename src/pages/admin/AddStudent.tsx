import { useMemo, useState } from 'react';
import { useNotification } from 'contexts/Notification';
import { NotificationType } from 'types/notification';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { constants } from 'stores/constantStore';
import { getPackages, PackageListDataType } from 'api/package';
import { StudentAddType } from 'types/student';
import { addStudent } from 'api/student';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminNavLayout from 'layouts/AdminNavLayout';
import { getTeachers, TeacherListDataType } from 'api/teacher';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const AddStudent = () => {
  const { teacherId = "" } = useParams();
  const notification = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [whatsAppNo, setWhatsAppNo] = useState("")
  const [classLink, setClassLink] = useState("")
  const [price, setPrice] = useState(0)
  const [packageId, setPackageId] = useState<number | null>(null)
  const [conatctNo, setConatctNo] = useState("")
  const [gender, setGender] = useState("MALE")
  const [utc, setUtc] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const teacherListData = useQuery<TeacherListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.TEACHER_LIST],
    queryFn: () => getTeachers(),
  })

  const packageListData = useQuery<PackageListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.PACKAGE_LIST],
    queryFn: () => getPackages(),
  })

  const teacher = useMemo(() => {
    return teacherListData.data?.data.find(e => e.teachers_id == Number(teacherId))?.user
  }, [teacherListData, teacherId]);

  const handlePackageChange = (id: string) => {
    setPackageId(Number(id))
    setPrice(packageListData.data?.data.find(e => e.id == Number(id))?.price_bdt ?? 0)
  }

  const handleSubmit = () => {
    if (packageId == null) return;
    setIsLoading(true)
    const payload: StudentAddType = {
      student: {
        email: email,
        teachers_id: Number(teacherId),
        packages_id: packageId,
        class_link: classLink,
        price_bdt: price,
      },
      user: {
        name: name,
        whatsapp_no: whatsAppNo,
        location,
        utc
      }
    }
    addStudent(payload)
      .then(() => {
        notification.add({
          title: "Student Registered",
          message: "The student has been registered successfully. The student can login now.",
          status: NotificationType.SUCCESS
        })
        queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.TEACHER_LIST] })
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
    <AdminNavLayout>
      <div className="p-5 md:px-16 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          <div className="col-span-1 md:col-span-2">
            <div className="label">
              <span className="label-text">Teacher</span>
            </div>
            <div className="card flex-row items-center gap-3 border border-base-300 p-2">
              <img className='h-12 card w-12 object-cover' src={teacher?.avatar.thumbnail_url} alt="" />
              <div className="flex flex-col">
                <div className='font-medium'>{teacher?.name}</div>
                <div>{teacher?.whatsapp_no}</div>
              </div>
              <Link to={`https://wa.me/${teacher?.whatsapp_no}`} target='_blank' className="btn ml-auto btn-sm btn-icon">
                Open WhatsApp
                <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>
          </div>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Email Address</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">WhatsApp No</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={whatsAppNo}
              onChange={e => setWhatsAppNo(e.target.value)}
            />
          </label>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Contact No</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={conatctNo}
              onChange={e => setConatctNo(e.target.value)}
            />
          </label>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </label>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Select Gender</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </label>
          <label className="form-control flex flex-col w-full">
            <div className="label">
              <span className="label-text">Class Link</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={classLink}
              onChange={e => setClassLink(e.target.value)}
            />
          </label>
          <div>
            <div className="label">
              <span className="label-text">Package</span>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <select className="select select-bordered w-full max-w-xs" onChange={e => handlePackageChange(e.target.value)}>
                <option disabled selected={packageId == null}>Select Package</option>
                {packageListData.data?.data.map((e, i) => (
                  <option selected={packageId == e.id} value={e.id} key={i}>{e.name}</option>
                ))}
              </select>
              <label className="input input-bordered flex items-center gap-2 relative">
                <div className="font-semibold opacity-75">Price</div>
                <input type="text" className='grow' placeholder='1000' value={price} onChange={e => setPrice(Number(e.target.value))} />
                <kbd className="kbd kbd-sm absolute right-0 top-0 mt-3 mr-2">TK</kbd>
              </label>
            </div>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <div className="font-semibold opacity-75 w-20">UTC</div>
            <input type="text" className='grow' placeholder='+0900' value={utc} onChange={e => setUtc(Number(e.target.value))} />
          </label>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>Add Student</button>
        </div>
      </div>
    </AdminNavLayout>
  )
}

export default AddStudent