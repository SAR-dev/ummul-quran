const StudentList = () => {
    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have 12 students</div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left table-auto">
                    <thead className="text-xs uppercase bg-base-100 border-b border-base-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Next Class
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(3)].map((_, i) => (
                            <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" key={i}>
                                <th scope="row" className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8">
                                            <img className="h-8 w-8 card" src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
                                        </div>
                                        <div>Sayed Ar Rafi</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">Japan</td>
                                <td className="px-6 py-4">45 Min</td>
                                <td className="px-6 py-4">28 July, 2024</td>
                                <td className="px-6 py-4">01 Aug, 2024</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default StudentList