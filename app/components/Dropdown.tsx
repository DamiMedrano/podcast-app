import React, { useState, useEffect, useRef } from 'react';
import ArrowDown from '../../public/assets/svgs/arrow-down.svg';
import Image from 'next/image';

type Props = {
    options: string[];
    onOptionSelect: (option: string) => void;
};

const Dropdown: React.FC<Props> = ({ options, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('Order by');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: string) => {
        setSelected(option);
        onOptionSelect(option);
        setIsOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex justify-end" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="group flex items-center space-x-2 p-2 mb-2 rounded shadow-md hover:bg-[#5c67de] min-w-[120px]"
            >
                <span className='text-white'>{selected}</span>
                <Image src={ArrowDown} alt='arrow-down' />
            </button>
            {isOpen && (
                <div className="absolute bg-[#00000050] right-[16%] min-w-[200px] mt-10 rounded-md shadow-lg z-10">
                    {options.map(option => (
                        <div 
                            key={option} 
                            className="block p-2 hover:bg-[#5c67de] text-white cursor-pointer" 
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
