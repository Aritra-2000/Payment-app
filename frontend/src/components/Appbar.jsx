


export function Appbar({name}){

    return <div className="shadow h-14 flex justify-between">
        <div className="font-bold text-lg flex flex-col justify-center h-full ml-4">
           Payment App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-3">
                Hello, {name}
            </div>
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-2 mr-2">
                <div className="flex flex-col text-md justify-center">
                    U
                </div>
            </div>
        </div>

    </div>
}