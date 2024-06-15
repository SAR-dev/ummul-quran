const StudentInfo = () => {
    return (
        <div className="sticky top-0 card rounded-r-none border border-base-300 p-5">
            <div className="h-32 w-full flex flex-col gap-5 items-start">
                <img className='h-32 card w-32 object-cover' src="https://avatar.iran.liara.run/public/38" alt="" />
            </div>
            <div className="border border-base-300 card overflow-hidden mt-5">
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="w-48">Full Name</th>
                            <td>Sayed Ar Rafi</td>
                        </tr>
                        <tr>
                            <th className="w-48">Nick Name</th>
                            <td>Rafi</td>
                        </tr>
                        <tr>
                            <th className="w-48">Gender</th>
                            <td>Male</td>
                        </tr>
                        <tr>
                            <th className="w-48">Country</th>
                            <td>Japan</td>
                        </tr>
                        <tr>
                            <th className="w-48">Contact No</th>
                            <td>None</td>
                        </tr>
                        <tr>
                            <th className="w-48">Whatsapp No</th>
                            <td>None</td>
                        </tr>
                        <tr>
                            <th className="w-48">Package</th>
                            <td>40 Min, 3 Days a week</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentInfo