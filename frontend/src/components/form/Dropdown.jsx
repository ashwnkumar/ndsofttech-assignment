import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

// Optional: adjust this if you're using your own input component
const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="w-full border border-gray rounded-md px-2 py-1"
    placeholder="Search..."
  />
);

const Dropdown = ({
  className = "",
  outerClassName = "",
  name,
  id,
  label,
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
  showSelected = true,
  helper,
  canSearch = false,
  optionKey = "option",
  optionValue = "value",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownStyles, setDropdownStyles] = useState({});
  const dropdownContainer = useRef(document.getElementById("root"));
  const dropdownRef = useRef(null); // portal dropdown ref
  const buttonRef = useRef(null); // trigger button ref

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option) => {
    if (!disabled) {
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(
      options.filter((opt) => opt.option.toLowerCase().includes(term))
    );
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: "absolute",
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !buttonRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const renderDropdown = () => (
    <div
      ref={dropdownRef} 
      style={dropdownStyles}
      className="bg-white border divide-y divide-gray border-gray rounded-xl shadow-lg max-h-60 overflow-y-auto mt-1"
    >
      {canSearch && (
        <div className="p-2">
          <SearchInput value={searchTerm} onChange={handleSearch} />
        </div>
      )}
      {filteredOptions.length > 0 ? (
        filteredOptions.map((opt) => (
          <button
            key={opt.value}
            className={`px-3 py-2 cursor-pointer w-full flex items-center justify-between transition-colors duration-150 focus:outline-none
              ${
                value === opt.value
                  ? "bg-brand-faded text-brand font-medium"
                  : "hover:bg-hover font-normal"
              }`}
            onClick={() => handleSelect(opt)}
          >
            <div className="flex items-center gap-2">
              {opt.icon && <span>{opt.icon}</span>}
              {opt.option}
            </div>
            {value === opt.value && (
              <span className="text-brand">
                <Check />
              </span>
            )}
          </button>
        ))
      ) : (
        <div className="px-3 py-2 text-placeholder">No options available</div>
      )}
    </div>
  );

  return (
    <div className={`relative w-full text-secondary ${outerClassName}`}>
      {label && (
        <label className="text-md text-heading font-medium">
          {label}
          {required && (
            <span className="text-danger text-lg font-medium">*</span>
          )}
        </label>
      )}

      <button
        type="button"
        id={id}
        name={name}
        ref={buttonRef}
        className={`w-full border rounded-xl px-2 py-2 mt-2 bg-white transition-colors duration-150 flex justify-between items-center
          ${disabled ? "bg-disabled cursor-not-allowed" : "cursor-pointer"}
          ${error ? "border-danger" : "border-gray"}
          ${isOpen && "border-brand"} ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={selectedOption ? "" : "text-placeholder "}>
          {showSelected && selectedOption ? selectedOption.option : placeholder}
        </span>
        <span
          className={`transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      {isOpen &&
        createPortal(
          renderDropdown(),
          document.getElementById("root")
        )}

      {helper && <span className="text-sm text-placeholder">{helper}</span>}
      {error && <span className="text-danger text-sm">{error}</span>}
    </div>
  );
};

export default Dropdown;
