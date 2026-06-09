import ReactMarkdown from "react-markdown";

const Markdown = ({ children }: { children: string }) => (
  <div className="markdown">
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);

export default Markdown;
