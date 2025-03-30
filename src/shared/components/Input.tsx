import React, { useRef } from "react";
import classNames from "classnames";

export default function Input(props: {
  title: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
}) {
  const { title, value, onChange, error } = props;
  const inputRef = useRef(null);

  return (
    <div className="relative w-full mx-auto">
      <input
        ref={inputRef}
        id="inputField"
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className="peer input-field w-full px-3 py-4 text-lg border-1 border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent"
      />
      <label
        htmlFor="inputField"
        onClick={() => inputRef.current?.focus()}
        className={classNames({
          "absolute left-3 text-lg text-gray-500 transition-all cursor-pointer":
            true,
          "top-0 text-sm text-blue-500": value,
          "top-14 transform -translate-y-10": !value,
        })}
      >
        {title}
      </label>
      {error && <label className="text-sm text-red-600 mt-1">{error}</label>}
    </div>
  );
}
