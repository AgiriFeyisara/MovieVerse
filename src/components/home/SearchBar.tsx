import { useState } from "react"
const SearchBar = () =>{
    const [query, setQuery] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!query.trim()) return;
        console.log("Search query:", query);
    };
    return(
        <div className="">
            <section className="w-full py-10 bg-black">
                <div className="max-w-3xl mx-auto px-6">
                    <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg shadow-lg">
                        <input type="text" placeholder="Search for a movie..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 px-4 py-3 text-gray-300 outline-none" />
                        <button type="submit" className="bg-red-600 text-white px-6 py-3 font-semibold hover:bg-red-700 transition ">Search</button>
                    </form>
                </div>
            </section>
        </div>
    )
    

}
export default SearchBar