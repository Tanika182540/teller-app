import React, { useContext } from "react";
import {
  CustomerDetailFormContext,
  ICustomerDetailContext,
} from "../context/CustomerFormContext";
import Button from "../../../shared/components/Button";
import { FormStep } from "../constants/formConstant";
import { Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faClose,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import PdfFile from "../../../shared/components/PdfFile";

export default function Step2CustomerVerifyDocuments() {
  const { customerVerifyDocumentsForm, setStep } =
    useContext<ICustomerDetailContext>(CustomerDetailFormContext);
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = customerVerifyDocumentsForm;
  const documents = watch("documents");

  const onSubmit = () => {
    setStep(FormStep.STEP3_DOCUMENT_REVIEW);
  };

  const onDeleteFile = (deleteIndex: number) => {
    const deletedList = documents?.filter((_, index) => {
      return index !== deleteIndex;
    });
    setValue("documents", deletedList, { shouldValidate: true });
  };

  const handleFilePreview = (file: File) => {
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
        <label className="text-gray-700">Upload PDF Files (Max: 5)</label>
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
        <Controller
          control={control}
          name="documents"
          defaultValue={[]}
          render={({ field: { onChange, value = [] } }) => (
            <input
              type="file"
              accept="application/pdf"
              multiple
              id="documentUpload"
              hidden
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                onChange([...value, ...newFiles]);
              }}
            />
          )}
        />
        <div className="flex flex-col gap-4 grow">
          {documents?.map((file, index) => (
            <PdfFile
              key={file.name}
              fileName={file.name}
              onClick={() => handleFilePreview(file)}
              onDeleteFile={() => onDeleteFile(index)}
            />
          ))}
        </div>
        {errors.documents && (
          <p className="text-red-500 text-xs">{errors.documents.message}</p>
        )}
        <div className="grid grid-cols-2 h-full items-end gap-2">
          <Button title="Back" onClick={onClickBack} type="outline" />
          <Button title="Next" type="primary" disabled={!isValid} />
        </div>
      </div>
    </form>
  );
}
