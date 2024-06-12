import { ArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline"
import ClassList from "components/ClassList"
import Navbar from "components/Navbar"

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-base-100">
      <Navbar />

      <div className="grid grid-cols-4 w-full">
        <div className="col-span-3">
          <div className="p-16 w-full max-w-screen-xl grid grid-cols-1 gap-10">
            <ClassList />
            <div className="card flex-row border border-base-300 overflow-hidden">
              
              <div className="flex flex-col divide-y divide-base-300 border-r border-base-300">
                {[...Array(5)].map((_, i) => (
                  <button className="flex gap-5 justify-center items-center p-5 hover:bg-base-300" key={i}>
                    <div className="w-16 flex-shrink-0">
                      <img className="w-16 h-16 card" src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
                    </div>
                    <div className="w-32 flex-shrink-0">
                      <div className="font-medium">Sayed Rafi</div>
                      <div className="text-sm text-base-content/75">Bangladesh</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="w-full p-5">
                <div className="card relative overflow-x-auto border border-base-300">
                  <table className="w-full text-sm text-left table-auto">
                    <thead className="text-xs uppercase bg-base-200">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
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
                      {[...Array(10)].map((_, i) => (
                        <tr className="bg-base-100 border-b border-base-300" key={i}>
                          <th className="px-6 py-4">{(i + 1).toString().padStart(2, "0")}</th>
                          <th scope="row" className="px-6 py-4">
                            12 July, 2024
                          </th>
                          <th className="px-6 py-4">0800 - 0900</th>
                          <td className="px-6 py-4 max-w-64">
                            Control the transition styles of conditionally rendered elements, including nested child transitions, using CSS classes.
                          </td>
                          <td className="px-6 py-4 w-28">
                            <div className="flex gap-2">
                              <button className="btn btn-sm btn-square btn-outline border-base-300">
                                <ArrowUpIcon className="h-5 w-5" />
                              </button>
                              <button className="btn btn-sm btn-square btn-outline border-base-300">
                                <TrashIcon className="h-5 w-5" />
                              </button>
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