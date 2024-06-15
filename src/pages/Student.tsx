import { BellIcon, CalendarIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid'
import ClassCreate from 'components/ClassCreate'
import NavLayout from 'components/NavLayout'
import StudentInfo from 'components/StudentInfo'

const Student = () => {
  return (
    <NavLayout>
      <div className="grid grid-cols-4 w-full">
        <div className="col-span-3">
          <div className="p-16 w-full grid grid-cols-1 gap-16">
            <div className="card p-5 bg-info/30">
              <ClassCreate />
            </div>
            <div className="flex flex-col gap-3 border border-base-300 card overflow-hidden">
              <div className="flex items-center gap-3 font-semibold text-xl p-5 border-b border-base-300 mb-3">
                <BellIcon className='h-6 w-6' />
                <div>Upcoming Class</div>
              </div>
              <div className="relative overflow-x-auto">
                <table className="table">
                  <thead >
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Contents</th>
                      <th>Note</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(3)].map((_, i) => (
                      <tr key={i}>
                        <td className='font-semibold'>{(i + 1).toString().padStart(2, "0")}</td>
                        <td>12 July</td>
                        <td>0800 - 0900</td>
                        <td>Sayed Ar Rafi</td>
                        <td>Japan</td>
                        <td className="w-64">
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-square">
                              <PlayIcon className='h-5 w-5' />
                            </button>
                            <button className="btn btn-sm btn-square">
                              <StopIcon className='h-5 w-5' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {[...Array(5)].map((_, i) => (
              <div className="flex flex-col gap-3 border border-base-300 card overflow-hidden" key={i}>
                <div className="flex items-center gap-3 font-semibold text-xl p-5 border-b border-base-300 mb-3">
                  <CalendarIcon className='h-6 w-6' />
                  <div>Jan 2024</div>
                </div>
                <div className="relative overflow-x-auto">
                  <table className="table">
                    <thead >
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Contents</th>
                        <th>Note</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(3)].map((_, i) => (
                        <tr key={i}>
                          <td className='font-semibold'>{(i + 1).toString().padStart(2, "0")}</td>
                          <td>12 July</td>
                          <td>0800 - 0900</td>
                          <td>Sayed Ar Rafi</td>
                          <td>Japan</td>
                          <td className="w-64">
                            <div className="flex gap-2">
                              <button className="btn btn-sm btn-square">
                                <ArrowUpIcon className='h-5 w-5' />
                              </button>
                              <button className="btn btn-sm btn-square">
                                <TrashIcon className='h-5 w-5' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 py-16">
          <StudentInfo />
        </div>
      </div>
    </NavLayout>
  )
}

export default Student