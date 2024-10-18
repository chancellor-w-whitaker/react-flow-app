export const DropdownButton = ({
  className: declaredClassName,
  children = "Dropdown",
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

  const inheritedClassName =
    "btn btn-secondary dropdown-toggle shadow-sm bg-gradient";

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
