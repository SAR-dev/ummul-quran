import { TrashIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid'
import NavLayout from 'components/NavLayout'

const Student = () => {
  return (
    <NavLayout>
      <div className="grid grid-cols-4 w-full">
        <div className="col-span-3">
          <div className="p-16 w-full grid grid-cols-1 gap-16">
            {/* left class list */}

            {/* add class form show */}
            {/* latest class first */}
            {/* group by month of year*/}

            {/* fields */}
            {/* date */}
            {/* planned time */}
            {/* actual time */}
            {/* planned contents */}
            {/* actual contents */}
            {/* note */}
            <div className="flex flex-col gap-3">
              <div className="font-semibold text-xl">Upcoming Class</div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left table-auto">
                  <thead className="text-xs uppercase bg-base-100 border-b border-base-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time Slot
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Contents
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Note
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(3)].map((_, i) => (
                      <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" key={i}>
                        <th className="px-6 py-4">{(i + 1).toString().padStart(2, "0")}</th>
                        <th scope="row" className="px-6 py-4">
                          12 July
                        </th>
                        <th className="px-6 py-4">0800 - 0900</th>
                        <td className="px-6 py-4">Sayed Ar Rafi</td>
                        <td className="px-6 py-4">Japan</td>
                        <td className="px-6 py-4 w-64">
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
              <div className="flex flex-col gap-3" key={i}>
                <div className="font-semibold text-xl">Jun 2024</div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left table-auto">
                    <thead className="text-xs uppercase bg-base-100 border-b border-base-300">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time Slot
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Contents
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Note
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(3)].map((_, i) => (
                        <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" key={i}>
                          <th className="px-6 py-4">{(i + 1).toString().padStart(2, "0")}</th>
                          <th scope="row" className="px-6 py-4">
                            12 July
                          </th>
                          <th className="px-6 py-4">0800 - 0900</th>
                          <td className="px-6 py-4">Sayed Ar Rafi</td>
                          <td className="px-6 py-4">Japan</td>
                          <td className="px-6 py-4 w-64">
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
          {/* right student info */}
        </div>
      </div>
    </NavLayout>
  )
}

export default Student