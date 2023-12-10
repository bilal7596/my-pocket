import * as React from "react";
import {
	useFloating,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
	useMergeRefs,
	FloatingPortal,
	FloatingFocusManager,
	FloatingOverlay,
	useId,
	useTransitionStyles,
} from "@floating-ui/react";
import "../Styles/Dialog.css"

// interface DialogOptions {
// 	initialOpen?: boolean;
// 	open?: boolean;
// 	onOpenChange?: (open: boolean) => void;
// }

export function useDialog({
	initialOpen = false,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
} = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
	const [labelId, setLabelId] = React.useState();
	const [descriptionId, setDescriptionId] = React.useState();

	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;

	const data = useFloating({
		open,
		onOpenChange: setOpen,
	});

	const context = data.context;

	const click = useClick(context, {
		enabled: controlledOpen == null,
	});
	const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
	const role = useRole(context);

	const interactions = useInteractions([click]);

	return React.useMemo(
		() => ({
			open,
			setOpen,
			...interactions,
			...data,
			labelId,
			descriptionId,
			setLabelId,
			setDescriptionId,
		}),
		[open, setOpen, interactions, data, labelId, descriptionId]
	);
}

// type ContextType =
//   | (ReturnType<typeof useDialog> & {
//       setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
//       setDescriptionId: React.Dispatch<
//         React.SetStateAction<string | undefined>
//       >;
//     })
//   | null;

const DialogContext = React.createContext(null);

export const useDialogContext = () => {
	const context = React.useContext(DialogContext);

	if (context == null) {
		throw new Error("Dialog components must be wrapped in <Dialog />");
	}
	return context;
};

export const Dialog = React.forwardRef( ({
  children,
  ...options
}, ref) => {
  const dialog = useDialog(options);
  return (
    	<DialogContext.Provider value={dialog} ref={ref}>
			{children}
		</DialogContext.Provider>
  );
});

// interface DialogTriggerProps {
//   children: React.ReactNode;
//   asChild?: boolean;
// }

export const DialogTrigger = React.forwardRef(function DialogTrigger({ children, asChild = false, ...props }, propRef) {
	const context = useDialogContext();
	const childrenRef = (children).ref;
	const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

	// `asChild` allows the user to pass any element as the anchor
	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(
			children,
			context.getReferenceProps({
				ref,
				...props,
				...children.props,
				// "data-state": context.open ? "open" : "closed",
			})
		);
	}

	return (
		<span
		ref={ref}
		// The user can style the trigger based on the state
		data-state={context.open ? "open" : "closed"}
		{...context.getReferenceProps(props)}
		>
		{children}
		</span>
	);
});

export const DialogContent = React.forwardRef(({ transitionStyles, overLayClassName, ...props}, propRef) => {
  const { context: floatingContext, ...context } = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  const { isMounted, styles } = useTransitionStyles(floatingContext, transitionStyles || {});

//   if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      { isMounted && <FloatingOverlay className={`${overLayClassName || ''}`} lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
			style={styles}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay> }
    </FloatingPortal>
  );
});

export const DialogHeading = React.forwardRef(function DialogHeading({ children, ...props }, ref) {
  const { setLabelId } = useDialogContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {children}
    </h2>
  );
});

export const DialogDescription = React.forwardRef(function DialogDescription({ children, ...props }, ref) {
  const { setDescriptionId } = useDialogContext();
  const id = useId();

  // Only sets `aria-describedby` on the Dialog root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p {...props} ref={ref} id={id}>
      {children}
    </p>
  );
});

export const DialogClose = React.forwardRef(function DialogClose({ children, ...props }, ref) {
  const { setOpen, open } = useDialogContext();
  const context = useDialogContext();

//   if (React.isValidElement(children)) {
// 		return React.cloneElement(
// 			children,
// 			{
// 				...context.getReferenceProps({
// 					ref,
// 					...props,
// 					...children.props,
// 					// "data-state": context.open ? "open" : "closed",
// 				}),
// 				onClick: () => setOpen(false)
// 			}
// 		);
// 	}
	return (
		<span type="button" {...props} ref={ref} onClick={() => setOpen(false)} >{children}</span>
	);
});
