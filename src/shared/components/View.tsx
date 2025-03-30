import React from "react";

export default function View({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center flex-1 bg-gray-100 h-full p-4 md:p-0">
      {children}
    </div>
  );
}
