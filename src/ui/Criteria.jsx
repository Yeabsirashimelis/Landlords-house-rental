import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Criteria({
  width = "200px",
  label,
  children,
  icon = true,
  isOpen,
  onClick,
}) {
  return (
    <div style={{ width }} className="relative">
      <div
        id="criteria-input"
        style={{ width }}
        className="border-2 h-[35px] border-gray-400 outline-none rounded-md px-2 pt-2 pb-1.5"
        onClick={onClick}
      />
      <label
        htmlFor="criteria-input"
        className="absolute left-[20%] top-[20%] text-gray-700 text-base font-bold transition-all 
        transform origin-left pointer-events-none "
      >
        {label}
      </label>
      {icon && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-2 flex items-center"
          onClick={onClick}
        >
          {!isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      )}
      {isOpen && icon && (
        <div className="px-8 pt-2 pb-8 absolute top-[35px] bg-gray-100 z-40">
          {children}
        </div>
      )}
    </div>
  );
}

export default Criteria;
