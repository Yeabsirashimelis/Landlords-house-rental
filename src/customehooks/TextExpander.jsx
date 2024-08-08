import { useState } from "react";

function TextExpander({
  expanded = false,
  collapsedNumWords = 10,
  expandButtonText = "show more",
  collapseButtonText = "show less",
  buttonColor = "blue",
  className = "",
  children,
}) {
  const [exp, setExp] = useState(expanded);

  let firstPart = children.split(" ").slice(0, collapsedNumWords).join(" ");

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    font: "inherit",
    marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{exp ? children : firstPart + "...."}</span>
      <button onClick={() => setExp((exp) => !exp)} style={buttonStyle}>
        {exp ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

export default TextExpander;
