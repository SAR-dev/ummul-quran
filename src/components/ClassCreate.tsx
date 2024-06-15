const ClassCreate = () => {
    return (
        <div className="grid grid-cols-7 gap-5">
            <select className="select select-bordered w-full">
                <option disabled selected>Year</option>
                <option>2024</option>
            </select>
            <select className="select select-bordered w-full">
                <option disabled selected>Month</option>
                <option>2024</option>
            </select>
            <select className="select select-bordered w-full">
                <option disabled selected>Day</option>
                <option>2024</option>
            </select>
            <select className="select select-bordered w-full">
                <option disabled selected>Hour</option>
                <option>2024</option>
            </select>
            <select className="select select-bordered w-full">
                <option disabled selected>Minute</option>
                <option>2024</option>
            </select>
            <select className="select select-bordered w-full">
                <option disabled selected>AM/PM</option>
                <option>2024</option>
            </select>
            <button className="btn btn-neutral">Create Plan</button>
        </div>
    )
}

export default ClassCreate;