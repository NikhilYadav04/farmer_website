import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useState } from "react";
import list from "../data/list.json";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Dropdown");

  const handleChange = (item) => {
    setName(item);
    setIsOpen(false);
    localStorage.setItem("itemdata", JSON.stringify({
      item:item,
    }))
  }

  return (
    <div className="relative flex flex-col items-center w-full h-full rounded-lg">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-5 w-full border border-neutral-700 hover:border-green-400 hover:bg-green-900/30 flex items-center justify-between font-medium text-base rounded-xl tracking-wide border-3 min-height-10 active:border-green-400 duration-300"
      >
        {name}
        {!isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
      </button>
      {isOpen && (
        <div className="bg-neutral-900/30 mt-2 border flex flex-col items-start rounded-lg p-3 w-full">
          {list.map((item, i) => (
            <div key={i} className="w-full hover:bg-green-500/20 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-2">
              <h3 className="font-medium text-lg border-b py-3 pl-2" onClick={()=>{handleChange(item)}}>{item}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
