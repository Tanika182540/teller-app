import { useContext } from "react";
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
// import { uploadPdfFile } from "../../../firebase/firebase.api";

export default function Step2CustomerVerifyDocuments() {
  const { customerVerifyDocumentsForm, setStep } =
    useContext<ICustomerDetailContext>(CustomerDetailFormContext);
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = customerVerifyDocumentsForm;
  const document = watch("document");
  const documentType = watch("documentType");

  const onSubmit = () => {
    setStep(FormStep.STEP3_DOCUMENT_REVIEW);
  };

  const onDeleteFile = () => {
    setValue("document", undefined, { shouldValidate: true });
  };

  const handleFilePreview = (file?: File) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const onClickBack = () => {
    setStep(FormStep.STEP1_CUSTOMER_DETAIL);
  };

  // const handleFileUpload = async (document?: Document) => {
  //   if (!document || !shouldUploadFile) return;
  //   try {
  //     await uploadPdfFile(document.file);

  //     const updatedDocument = {
  //       ...document,
  //       isUpload: true,
  //     };

  //     setValue("document", updatedDocument, { shouldValidate: true });
  //   } catch (error) {
  //     errorToast("File upload failed:", error);
  //   }
  // };

  // useEffect(() => {
  //   handleFileUpload(document);
  // }, [document]);

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
        {/* <label className="text-gray-700">Upload PDF Files (Max: 5)</label> */}
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
          onChange={(e) => {
            const newFiles = e.target.files?.[0];
            if (!newFiles) return;
            setValue("document.file", newFiles, { shouldValidate: true });
          }}
        />
        <div className="flex flex-col gap-4 grow">
          {document && (
            <PdfFile
              key={document.file.name}
              fileName={document.file?.name ?? ""}
              onClick={() => handleFilePreview(document.file)}
              onDeleteFile={() => onDeleteFile()}
            />
          )}
        </div>
        {errors.document && (
          <p className="text-red-500 text-xs">{errors.document.message}</p>
        )}
        <div className="grid grid-cols-2 h-full items-end gap-2">
          <Button title="Back" onClick={onClickBack} type="outline" />
          <Button title="Next" type="primary" disabled={!isValid} />
        </div>
      </div>
    </form>
  );
}
