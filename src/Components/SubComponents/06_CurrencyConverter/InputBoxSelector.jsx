import { useState, useRef, useEffect } from "react";
import { useId } from "react";
import { useColor } from "../../../context/ColorContext/ColorContext";

function InputBoxSelector({
  className,
  label,
  internalValue,
  setInternalValue,
  options,
}) {
  const { palette } = useColor();
  const inputId = useId();
  const wrapperRef = useRef(null);

  const descriptions = Object.entries(options).map(
    ([key, val]) => `${key.toUpperCase()} - ${val}`
  );

  const [displayCurrency, setDisplayCurrency] = useState("");

  // Filtered options for dropdown
  const [filteredOptions, setFilteredOptions] = useState(descriptions);

  // Dropdown open/close
  const [isOpen, setIsOpen] = useState(false);

  // Initialize display value from internal value
  useEffect(() => {
    if (internalValue && options[internalValue]) {
      setDisplayCurrency(
        `${internalValue.toUpperCase()} - ${options[internalValue]}`
      );
    }
  }, [internalValue, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle typing in input
  const handleInputChange = (e) => {
    const query = e.target.value;
    setDisplayCurrency(query);
    setFilteredOptions(
      descriptions.filter((option) =>
        option
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      )
    );
    setIsOpen(true);
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    const [key] = option.split(" - ");
    setInternalValue(key.toLowerCase());
    setDisplayCurrency(option);
    setIsOpen(false);
  };

  // show all options
  const handleInputClick = () => {
    setDisplayCurrency("");
    setFilteredOptions(descriptions);
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className={`${className} relative`}>
      <label
        htmlFor={inputId}
        className={`${className}relative flex flex-col px-3 py-2 rounded-2xl cursor-text shadow-sm`}
        style={{ backgroundColor: palette.bgshade4 }}
      >
        <span
          className="absolute top-1 left-3 text-sm"
          style={{ color: palette.shade4 }}
        >
          {label}
        </span>
        <input
          id={inputId}
          type="text"
          autoComplete="off"
          className="mt-4 w-full bg-transparent border-none outline-none text-base"
          value={displayCurrency || ""} // always controlled
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Enter currency"
        />
      </label>

      {isOpen && filteredOptions.length > 0 && (
        <ul
          className="native-scroll scroll-smooth absolute z-20 mt-1 w-[150%] rounded-lg shadow-lg max-h-40 overflow-auto"
          style={{ backgroundColor: palette.bgshade4 }}
        >
          <style>{`
            ul::-webkit-scrollbar { width: 10px; }
            ul::-webkit-scrollbar-track { background: ${palette.bgshade3}; border-radius: 8px; }
            ul::-webkit-scrollbar-thumb { background-color: ${palette.shade3}; border-radius: 8px; border: 2px solid ${palette.bgshade3}; }
            ul::-webkit-scrollbar-thumb:hover { background-color: ${palette.shade4}; }
          `}</style>

          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer rounded-lg"
              style={{ color: palette.shade4 }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputBoxSelector;
