export const DropdownMenu = ({
  className: declaredClassName,
  as = "ul",
  ...rest
}) => {
  const includeComputedClassName = (className) => ({ className, ...rest });

  const inheritedClassName = "dropdown-menu d-block shadow";

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
