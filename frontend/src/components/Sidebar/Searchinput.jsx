import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
function Searchinput() {
	const [search,setsearch] = useState("");
    return (
        <form className="flex items-center gap-2">
          
            <input
				type='text'
				placeholder='Search…'
				value={search}
				onChange={(e) => setsearch(e.target.value)}
				className='input input-bordered rounded-full'
			/>
            	<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<FaSearch className='w-6 h-6 outline-none' />
        
			</button>
            
        </form>
    )
}

export default Searchinput
