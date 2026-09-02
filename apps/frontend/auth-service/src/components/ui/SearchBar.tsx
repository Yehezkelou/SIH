
import { Search } from "lucide-react"




export function SearchBar(){
    return(
        <div className="px-3 py-3 w-full flex items-center justify-center bg-white shadow-md rounded-full">
            
            <div className="w-[100px] flex items-center justify-center gap-1.5">
                <Search size={20} />
                <label 
                    className="text-lg cursor-pointer select-none"
                    htmlFor="search"
                >Sih</label>
            </div>

            <div className="h-8 border border-gray-500 opacity-30 self-stretch mr-2"></div>
            <input 
                type="text"
                id="search"
                className="w-[450px] border-none outline-none bg-transparent"
                placeholder="Bafs...."

            />
        </div>
    )
}