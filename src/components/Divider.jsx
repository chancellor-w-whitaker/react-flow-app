export const Divider = ({
  className: declaredClassName,
  as = "div",
  ...rest
}) => {
  const includeComputedClassName = (className) => ({ className, ...rest });

  const inheritedClassName = "my-3 p-3 bg-body rounded shadow-sm";

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
