import React, { useContext } from "react";
import View from "../../../shared/components/View";
import {
  CustomerDetailFormContext,
  ICustomerDetailContext,
} from "../context/CustomerFormContext";
import PdfFile from "../../../shared/components/PdfFile";
import Button from "../../../shared/components/Button";
import { FormStep } from "../constants/formConstant";

export default function Step3ReviewInformation() {
  const { customerDetailsForm, customerVerifyDocumentsForm, setStep } =
    useContext<ICustomerDetailContext>(CustomerDetailFormContext);
  const { firstName, lastName, idCardNumber, accountNumber } =
    customerDetailsForm.watch();

  const { documents } = customerVerifyDocumentsForm.watch();

  const handleFilePreview = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const onClickBack = () => {
    setStep(FormStep.STEP2_VALIDATE_DOCUMENT);
  };

  const onClickSubmit = () => {
    // TODO
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between">
        <div className="font-semibold text-gray-700">First Name:</div>
        <div className="text-gray-600">{firstName}</div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold text-gray-700">Last Name:</div>
        <div className="text-gray-600">{lastName}</div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold text-gray-700">ID Card Number:</div>
        <div className="text-gray-600">{idCardNumber}</div>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold text-gray-700">Bank Account Number:</div>
        <div className="text-gray-600">{accountNumber}</div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <div className="font-semibold text-gray-700">Documents:</div>
        <ul className="text-gray-600 flex flex-col gap-2">
          {documents?.map((file) => (
            <PdfFile
              key={file.name}
              fileName={file.name}
              onClick={() => handleFilePreview(file)}
            />
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 h-full items-end gap-2">
        <Button title="Back" onClick={onClickBack} type="outline" />
        <Button title="Submit" onClick={onClickSubmit} type="primary" />
      </div>
    </div>
  );
}
