import { faClose, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PdfFile(props: {
  fileName: string;
  onClick: () => void;
  onDeleteFile?: () => void;
  iconOnly?: boolean;
}) {
  const { fileName, onClick, onDeleteFile, iconOnly } = props;

  return (
    <div
      key={fileName}
      className={`w-full p-3 h-fit rounded-md border border-[#F40F02] flex flex-row gap-2 items-center cursor-pointer ${
        iconOnly && "!w-fit"
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFilePdf} color="#F40F02" />
      <label className="grow break-words">{fileName}</label>
      {onDeleteFile && (
        <button
          className="text-gray-600 text-xl"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteFile();
          }}
        >
          <FontAwesomeIcon icon={faClose} color="#F40F02" />
        </button>
      )}
    </div>
  );
}
