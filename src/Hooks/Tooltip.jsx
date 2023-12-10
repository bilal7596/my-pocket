import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  arrow,
  FloatingArrow
} from "@floating-ui/react";
import "../Styles/Tooltip.css"

// interface TooltipOptions {
//   initialOpen?: boolean;
//   placement?: Placement;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
// }

export const toolTipInit = {
  initialOpen: false,
  placement: "top",
  open: "",
  onOpenChange: "",
  arrowRef: null
}

export function useTooltip({
  initialOpen = false,
  placement = "bottom",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  arrowRef
} = toolTipInit) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5
      }),
      arrow({
        element: arrowRef
      }),
      shift({ padding: 5 })
    ]
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef
    }),
    [open, setOpen, interactions, data]
  );
}

// type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
        throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export const Tooltip = React.forwardRef( ({
  children,
  ...options
}, ref) => {

    const arrowRef = React.useRef();
    const tooltip = useTooltip({
        ...options,
        arrowRef
    });

    return (
        <TooltipContext.Provider value={tooltip} ref={ref}>
            {children}
        </TooltipContext.Provider>
    );
});

export const TooltipTrigger = React.forwardRef(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    const newEle = React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed"
      })
    );
    console.log(newEle);
    return newEle;
  }

  return (
    <span
      type="button"
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </span>
  );
});

export const TooltipContent = React.forwardRef(function TooltipContent({ style, children, ...props }, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        className={"tooltip".concat(props.className || "")}
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...style
        }}
        {...context.getFloatingProps(props)}
      >
        <FloatingArrow ref={context.arrowRef} context={context} />
        { children}
      </div>


    </FloatingPortal>
  );
});