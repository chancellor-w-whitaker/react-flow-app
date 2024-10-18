const props = {
  className: "p-3 my-3 rounded shadow-sm text-bg-dark col-4",
  classTextBg: ["dark"],
  classShadow: ["sm"],
  classRounded: [""],
  classMy: ["3"],
  type: "button",
  classP: ["3"],
  as: "button",
};

const { className = "", as = "div", ...otherProps } = props;

const classProps = Object.fromEntries(
  Object.entries(otherProps).filter(([propName]) =>
    propName.startsWith("class")
  )
);

const classList = className.split(" ").filter((string) => string);

const classes = classList.map((string) => {
  const splitString = string.split("-");

  if (splitString.length < 2) splitString.push("");

  return splitString;
});

const resultingClassProps = {};

classes.forEach((array) => {
  const lastIndex = array.length - 1;

  const value = array[lastIndex];

  const prop = `class${array
    .slice(0, lastIndex)
    .map(
      (string) => string[0].toUpperCase() + string.substring(1).toLowerCase()
    )
    .join("")}`;

  if (!(prop in resultingClassProps)) resultingClassProps[prop] = [];

  resultingClassProps[prop].push(value);
});

const remainingResults = Object.fromEntries(
  Object.entries(resultingClassProps).filter(
    ([propName]) => !(propName in classProps)
  )
);

const allClassProps = { ...classProps, ...remainingResults };

const Component = as;

const normalProps = Object.fromEntries(
  Object.entries(otherProps).filter(
    ([propName]) => !propName.startsWith("class")
  )
);

// handle style as a function

// handle classProps as functions & className as a function

console.log(allClassProps);
