"use client";

import {Issue} from "@prisma/client";
import MDEditor from "@uiw/react-md-editor";

export default function MarkDown({issue}: {issue: Issue}) {
  return (
    <MDEditor.Markdown
      // rehypePlugins={[rehypeSanitize]}
      source={issue.description}
      style={{
        whiteSpace: "pre-wrap",
        background: "white",
        color: "black",
        marginLeft: "12px",
      }}
    />
  );
}
