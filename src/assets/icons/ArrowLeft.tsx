import { forwardRef, SVGProps } from "react";

const ArrowLeft = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
          d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
        ></path>
      </svg>
    );
  }
);

export default ArrowLeft;
