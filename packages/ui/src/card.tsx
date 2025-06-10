import React, { JSX } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="p-4 border border-slate-700 text-white rounded-lg shadow-sm"
    >
      <h1 className="text-xl border-b-slate-700 pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}