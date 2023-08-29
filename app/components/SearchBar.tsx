import { useState, useEffect } from 'react';
import MagnifyingGlass from '../../public/assets/svgs/magnifying-glass.svg';
import Image from 'next/image';


type Props = {
    onSearch: (term: string) => void;
    searchBy: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, searchBy }) => {
    const [term, setTerm] = useState<string>("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            onSearch(term);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [term, onSearch]);

    return (
        <div className='w-full flex justify-center items-center'>
          <div className='relative w-full h-[100px]'>
            <Image src={MagnifyingGlass} alt='search' className='absolute left-5 top-4'/>
              <input 
                className='w-full h-[50px] p-2 rounded-[15px] bg-[#1D1D1D] px-14'
                  value={term} 
                  onChange={(e) => setTerm(e.target.value)} 
                  placeholder={`Search ${searchBy}...`}
              />
          </div>
        </div>
    );
};

export default SearchBar;
