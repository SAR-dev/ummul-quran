const StudentInfo = () => {
    return (
        <div className="sticky top-0 card border border-base-300">
            <div className="h-32 w-full flex flex-col gap-5 items-center my-5">
                <img className='h-32 card w-32 object-cover' src="https://avatar.iran.liara.run/public/38" alt="" />
            </div>
            <div className="overflow-hidden">
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="w-32">Full Name</th>
                            <td>Sayed Ar Rafi</td>
                        </tr>
                        <tr>
                            <th className="w-32">Nick Name</th>
                            <td>Rafi</td>
                        </tr>
                        <tr>
                            <th className="w-32">Gender</th>
                            <td>Male</td>
                        </tr>
                        <tr>
                            <th className="w-32">Country</th>
                            <td>Japan</td>
                        </tr>
                        <tr>
                            <th className="w-32">Contact No</th>
                            <td>None</td>
                        </tr>
                        <tr>
                            <th className="w-32">Whatsapp No</th>
                            <td>None</td>
                        </tr>
                        <tr>
                            <th className="w-32">Package</th>
                            <td>40 Min, 3 Days a week</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentInfo