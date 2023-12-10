import React from "react";
import { Link } from "react-router-dom";

const getLink = (to) => window.location.host.includes("github.io") ? `/my-pocket/${to}` : to;

const CustomLink = React.forwardRef(({ children, to, ...props }, ref) => <Link {...props} to={getLink(to)}>{ children }</Link>);

export default CustomLink;