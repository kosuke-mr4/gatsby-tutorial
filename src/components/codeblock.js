import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github"; //テーマを選択
import React from "react";

export default function Code({ children, className }) {
  const language = className.replace(/language-/, "");

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: "10px", overflow: "auto" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
