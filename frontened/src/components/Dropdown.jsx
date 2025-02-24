import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { useState, useRef, useEffect } from 'react';
import list from '../data/list.json';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('Select the plant name');
  const dropdownRef = useRef(null);

  const handleChange = (item) => {
    setName(item);
    setIsOpen(false);
    localStorage.setItem(
      'itemdata',
      JSON.stringify({
        item: item,
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(dropdownRef);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md border border-neutral-600 bg-neutral-900/30 px-4 py-2 text-base font-medium text-neutral-400 shadow-sm focus:border-green-500 focus:outline-none"
        >
          {name}
          {!isOpen ? (
            <AiOutlineCaretDown className="h-8" />
          ) : (
            <AiOutlineCaretUp className="h-8" />
          )}
        </button>
        {isOpen && (
          <div className="ring-opacity-4 absolute z-10 mt-2 w-64 divide-y divide-neutral-500 rounded-sm bg-neutral-900/30 shadow-lg ring-2 ring-neutral-500">
            {list.map((item, i) => (
              <div
                key={i}
                className="w-full cursor-pointer rounded-sm px-2 py-1 hover:bg-green-400/20"
                onClick={() => {
                  handleChange(item);
                }}
              >
                <p className="py-2 text-sm text-neutral-400">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
