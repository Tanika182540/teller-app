export default function Input(props: {
  title: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  testid: string;
}) {
  const { title, onChange, error, value, testid } = props;

  return (
    <div className="relative w-full mx-auto flex flex-col gap-2">
      <label> {title}</label>
      <input
        data-testid={testid}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="peer input-field w-full px-3 py-2 text-lg border-1 border-gray-300 rounded-md focus:outline-none focus:ring-0 placeholder-transparent"
      />
      {error && (
        <label
          data-testid={`${testid}-error`}
          className="text-sm text-red-600 mt-1"
        >
          {error}
        </label>
      )}
    </div>
  );
}
