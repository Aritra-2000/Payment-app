export function Balance({ balance }) {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your Balance
        </div>
        <div className="font-semibold ml-3 text-lg">
        ₹{balance}
        </div>
    </div>
}