import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PackageType } from 'types/package'

const PackageInList = ({ pac }: { pac: PackageType }) => {
    return (
        <div className='card p-5 border border-base-300 flex-row justify-between group hover:shadow-md'>
            <div className="flex flex-col">
                <div className='font-semibold'>{pac.name}</div>
                <div className="mt-1">{pac.description}</div>
                <div className="flex flex-col gap-1 mt-3 text-sm">
                    <div>Time Duration: {pac.minutes} minutes</div>
                    <div>Default Price: {pac.default_price} TK</div>
                </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                <div className="tooltip" data-tip="Edit">
                    <button className="btn btn-sm btn-square">
                        <PencilIcon className='h-4 w-4' />
                    </button>
                </div>
                <div className="tooltip" data-tip="Delete">
                    <button className="btn btn-sm btn-square">
                        <TrashIcon className='h-4 w-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PackageInList