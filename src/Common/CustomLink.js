import React from "react";
import { Link } from "react-router-dom";

const CustomLink = React.forwardRef(({ children, to, ...props }, ref) => <Link ref={ref} {...props}>{ children }</Link>);

export default CustomLink;