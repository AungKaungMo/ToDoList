import { forwardRef, SVGProps } from "react";

const CellularConnection = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
      >
        <path
          fill="currentColor"
          d="M3 16h2v5H3zm4-3h2v8H7zm4-3h2v11h-2zm4-3h2v14h-2z"
        ></path>
      </svg>
    );
  }
);

export default CellularConnection;

