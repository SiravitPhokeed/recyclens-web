import ReactMarkdown from "react-markdown";

const Markdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    className="markdown"
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
);

export default Markdown;
