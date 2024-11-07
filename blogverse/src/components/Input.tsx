// Input.tsx
import { useId, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
 label?: string;
 className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className = "", ...props }, ref) => {
 const id = useId(); // Generates a unique ID for the input field
 return (
  <div className="w-full">
   {label && (
    <label className="inline-block mb-1 pl-1" htmlFor={id}>
     {label}
    </label>
   )}
   <input
    ref={ref}
    {...props}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    id={id} // Set the unique ID on the input element
   />
  </div>
 );
});

export default Input;
