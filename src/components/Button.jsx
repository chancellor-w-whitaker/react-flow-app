export const Button = ({
  className: declaredClassName,
  children = "Button",
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

  const inheritedClassName = "btn btn-secondary shadow-sm bg-gradient";

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
