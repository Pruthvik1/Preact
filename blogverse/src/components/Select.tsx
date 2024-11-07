import React, { useId } from "react";

// Define the type for the options
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
 options: string[]; // or you could use { label: string, value: string }[] for more complex options
 label?: string;
 className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ options, label, className = "", ...props }, ref) => {
 const id = useId();

 return (
  <div className="w-full">
   {label && (
    <label htmlFor={id} className="">
     {label}
    </label>
   )}
   <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
    {options?.map((option) => (
     <option key={option} value={option}>
      {option}
     </option>
    ))}
   </select>
  </div>
 );
});

export default Select;
