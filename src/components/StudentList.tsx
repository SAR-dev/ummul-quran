import { useNavigate } from "react-router-dom"

const StudentList = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have 12 students</div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="table bg-base-100">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Package</th>
                            <th>Last Class</th>
                            <th>Next Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(3)].map((_, i) => (
                            <tr className="hover:bg-info/20 duration-200 cursor-pointer" onClick={() => navigate("/students/1")} key={i}>
                                <td scope="row">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8">
                                            <img className="h-8 w-8 card" src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
                                        </div>
                                        <div>Sayed Ar Rafi</div>
                                    </div>
                                </td>
                                <td>Japan</td>
                                <td>45 Min</td>
                                <td>28 July, 2024</td>
                                <td>01 Aug, 2024</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default StudentList