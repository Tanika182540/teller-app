import { useContext, useRef } from "react";
import {
  CustomerDetailFormContext,
  ICustomerDetailContext,
} from "../context/CustomerFormContext";
import Button from "../../../shared/components/Button";
import { FormStep } from "../constants/formConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import PdfFile from "../../../shared/components/PdfFile";
import DocumentSelector from "../../../shared/components/DocumentSelector";

export default function Step2CustomerVerifyDocuments() {
  const { customerVerifyDocumentsForm, setStep } =
    useContext<ICustomerDetailContext>(CustomerDetailFormContext);
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = customerVerifyDocumentsForm;
  const document = watch("document");
  const documentType = watch("documentType");

  const onSubmit = () => {
    setStep(FormStep.STEP3_DOCUMENT_REVIEW);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onDeleteFile = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    reset();
  };

  const handleFilePreview = (file?: File) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const onClickBack = () => {
    setStep(FormStep.STEP1_CUSTOMER_DETAIL);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col size-full gap-4"
    >
      <div className="flex flex-col gap-4 size-full">
        <DocumentSelector
          selectedOption={documentType}
          setSelectedOption={(option: string) => {
            setValue("documentType", option, { shouldValidate: true });
          }}
        />
        <label
          htmlFor="documentUpload"
          className="group flex w-fit gap-2 items-center cursor-pointer px-4 py-2 rounded-md border-2 border-blue-500 text-blue-500 
             transition-transform"
        >
          <FontAwesomeIcon
            icon={faUpload}
            className="group-hover:translate-y-[-2px] transition-transform"
          />
          <span className="group-hover:translate-y-[-2px] transition-transform">
            Upload
          </span>
        </label>
        <input
          type="file"
          accept="application/pdf"
          multiple
          id="documentUpload"
          hidden
          ref={fileInputRef}
          onChange={(e) => {
            const newFiles = e.target.files?.[0];
            if (!newFiles) return;
            setValue("document", newFiles, { shouldValidate: true });
          }}
        />
        <div className="flex flex-col gap-4 grow">
          {document && (
            <PdfFile
              key={document.name}
              fileName={document?.name ?? ""}
              onClick={() => handleFilePreview(document)}
              onDeleteFile={() => onDeleteFile()}
            />
          )}
        </div>
        {errors.document && (
          <div className="text-red-500 text-xs">{errors.document.message}</div>
        )}
        <div className="grid grid-cols-2 h-full items-end gap-2">
          <Button title="Back" onClick={onClickBack} type="outline" />
          <Button title="Next" type="primary" disabled={!isValid} />
        </div>
      </div>
    </form>
  );
}
