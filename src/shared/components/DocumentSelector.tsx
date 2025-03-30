import { useState } from "react";

const RadioButtonGroup = (props: {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}) => {
  const { options, selected, onChange } = props;
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-2 cursor-pointer py-2 px-4 w-full border-2 border-gray-300 rounded-md ${
            selected === option.value && "font-semibold !border-blue-500"
          }`}
        >
          <input
            type="radio"
            name="documentType"
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <span
            className={`w-5 h-5 inline-block border-2 rounded-full items-center justify-center transition-all ${
              selected === option.value ? "border-blue-500" : "border-gray-400"
            }`}
          >
            {selected === option.value && (
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            )}
          </span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

const DocumentSelector = () => {
  const [selectedOption, setSelectedOption] = useState("id_card");

  return (
    <div>
      <h2 className="mb-2">Select Document Type:</h2>
      <RadioButtonGroup
        options={[
          { label: "ID Card", value: "id_card" },
          { label: "Passport", value: "passport" },
        ]}
        selected={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
  );
};

export default DocumentSelector;
