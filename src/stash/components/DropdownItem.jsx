export const DropdownItem = ({
  className: declaredClassName,
  children = "Something here",
  type = "button",
  as = "button",
  ...rest
}) => {
  const includeComputedClassName = (className) => ({
    className,
    children,
    type,
    ...rest,
  });

  const inheritedClassName = "dropdown-item";

  const As = as;

  return (
    <As
      {...includeComputedClassName(
        [inheritedClassName, declaredClassName]
          .filter((element) => element)
          .join(" ")
      )}
    ></As>
  );
};
