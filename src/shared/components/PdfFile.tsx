import { faClose, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PdfFile(props: {
  fileName: string;
  onClick: () => void;
  onDeleteFile?: () => void;
}) {
  const { fileName, onClick, onDeleteFile } = props;

  return (
    <div
      key={fileName}
      className="p-3 rounded-md border border-[#F40F02] flex flex-row gap-2 items-center cursor-pointer"
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
