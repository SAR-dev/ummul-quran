const ClassHistory = () => {
    return (
        <div className="card divide-y divide-base-300 w-full border border-base-300 rounded-r-none sticky top-0">
            <div className="px-5 py-3 bg-base-200 flex justify-between items-center">
                <div className="font-semibold">
                    Recent Classes
                </div>
                <button className="btn btn-sm bg-base-100">
                    See all
                </button>
            </div>
            {[...Array(6)].map((_, i) => (
                <div className="p-5" key={i}>
                    <div className="flex items-center gap-2">
                        <div className="w-8">
                            <img className="h-8 w-8 card" src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-medium">Sayed Rafi</div>
                            <div className="text-sm">Japan</div>
                        </div>
                    </div>
                    <div className="text-sm mt-2">
                        12 Jul, 2024 (0800 - 0900)</div>
                </div>
            ))}
        </div>
    )
}

export default ClassHistory