import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/24/solid"
import Navbar from "components/Navbar"

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-base-100">
      <Navbar />

      <div className="grid grid-cols-4 w-full">
        <div className="col-span-3">
          <div className="p-16 w-full max-w-screen-xl">
            <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">
              <div className="flex justify-between">
                <div className="text-xl font-semibold">You have 5 classes today</div>
                <div className="flex gap-3">
                  <button className="btn btn-sm bg-base-100">
                    Schedule a class
                    <PlusIcon className="h-4 w-4" />
                  </button>
                  <button className="btn btn-sm bg-base-100">
                    See all
                  </button>
                </div>
              </div>

              <div className="bg-base-100 px-6 py-3 card flex-row gap-2 items-center">
                <InformationCircleIcon className="h-5 w-5" />
                You have a <b>60 minutes</b> class in <b>35 minutes</b> with <b>Sayed Rafi</b> of Japan
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left table-auto">
                  <thead className="text-xs uppercase bg-base-100/50">
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
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Country
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr className="bg-base-100 border-b border-base-300" key={i}>
                        <th className="px-6 py-4">{(i + 1).toString().padStart(2, "0")}</th>
                        <th scope="row" className="px-6 py-4">
                          12 July, 2024
                        </th>
                        <th className="px-6 py-4">0800 - 0900</th>
                        <td className="px-6 py-4">Sayed Ar Rafi</td>
                        <td className="px-6 py-4">Japan</td>
                        <td className="px-6 py-4 w-64">
                          <div className="flex gap-2">
                            <button className="btn btn-sm">Class Link</button>
                            <button className="btn btn-sm">Cancel</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">

        </div>
      </div>

      {/* ----------------Left---------------- */}

      {/* Class today */}

      {/* Class tomorrow */}

      {/* Student List Accordion */}

      {/* ----------------Right---------------- */}

      {/* Total Class This Month */}


    </div>
  )
}

export default Home