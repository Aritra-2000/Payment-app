import {Link} from "react-router-dom"

export function Bottom({query, text, to}){
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {query}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {text}
      </Link>
    </div>
}