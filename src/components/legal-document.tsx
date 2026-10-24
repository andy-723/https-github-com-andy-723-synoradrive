import ReactMarkdown from "react-markdown";

export function LegalDocument({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => <h3 className="mb-4 mt-10 text-xl font-semibold leading-snug text-foreground">{children}</h3>,
        p: ({ children }) => <p className="my-4 text-sm leading-7 text-muted-foreground">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        blockquote: ({ children }) => <blockquote className="my-6 border-l-4 border-primary bg-muted px-5 py-2">{children}</blockquote>,
        ul: ({ children }) => <ul className="my-4 list-disc space-y-3 pl-6 text-sm leading-7 text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="my-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-muted-foreground">{children}</ol>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}