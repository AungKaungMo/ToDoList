import { forwardRef, SVGProps } from "react";

const Battery = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        <g fill="currentColor">
          <path d="M6 15a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"></path>
          <path
            fillRule="evenodd"
            d="M18 6H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13a3 3 0 0 0 3-3a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1a3 3 0 0 0-3-3m0 2H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1"
            clipRule="evenodd"
          ></path>
        </g>
      </svg>
    );
  }
);

export default Battery;
