import { forwardRef, SVGProps } from "react";

const Dropdown = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill="currentColor"
          d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0"
        ></path>
      </svg>
    );
  }
);

export default Dropdown;
