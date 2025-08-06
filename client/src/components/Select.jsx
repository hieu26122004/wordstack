import React, { useState, useRef, useEffect, useCallback } from "react";
import MuiTenPhai from "./icons/MuiTenPhai";
import { twMerge } from "tailwind-merge";

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Chọn một tùy chọn",
  className = "",
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleOptionSelect = useCallback(
    (option) => {
      onChange(option.value);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && options[highlightedIndex]) {
            handleOptionSelect(options[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, options, handleOptionSelect]);

  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHighlightedIndex(-1);
      }
    }
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={selectRef} className={"relative"} {...props}>
      <div
        onClick={handleToggle}
        className={twMerge(
          `
          flex items-center justify-between w-full h px-4 py-2
          bg-[#264532] text-white rounded-lg cursor-pointer
          border border-transparent transition-all duration-200
          hover:bg-[#2d4f3a] focus:outline-none focus:ring-2 
          focus:ring-[#39e079] focus:border-transparent
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${isOpen ? "ring-2 ring-[#39e079]" : ""}
        `,
          className
        )}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={placeholder}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <MuiTenPhai
          className={`ml-2 transition-transform duration-200 ${
            isOpen ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="
            absolute top-full left-0 right-0 mt-1 z-50
            bg-[#264532] border border-[#366347] rounded-lg
            shadow-lg max-h-60 overflow-y-auto
            scrollbar-thin scrollbar-thumb-[#39e079] scrollbar-track-[#264532]
          "
          role="listbox"
        >
          {Array.isArray(options) &&
            options.length > 0 &&
            options.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`
                  px-4 py-2 cursor-pointer transition-colors duration-150
                  hover:bg-[#39e079] hover:text-[#122118]
                  ${
                    highlightedIndex === index
                      ? "bg-[#39e079] text-[#122118]"
                      : "text-white"
                  }
                  ${
                    option.value === value
                      ? "bg-[#39e079] text-[#122118] font-medium"
                      : ""
                  }
                `}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Select;
