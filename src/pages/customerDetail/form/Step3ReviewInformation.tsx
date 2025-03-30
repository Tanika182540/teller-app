import { useContext } from "react";
import {
  CustomerDetailFormContext,
  ICustomerDetailContext,
} from "../context/CustomerFormContext";
import PdfFile from "../../../shared/components/PdfFile";
import Button from "../../../shared/components/Button";
import { FormStep } from "../constants/formConstant";
import { createCustomer, CustomerData } from "../../../firebase/firebase.api";
import { DocumentOptions } from "../../../shared/components/DocumentSelector";
import { useNavigate } from "react-router-dom";

export default function Step3ReviewInformation() {
  const { customerDetailsForm, customerVerifyDocumentsForm, setStep } =
    useContext<ICustomerDetailContext>(CustomerDetailFormContext);
  const { firstName, lastName, idCardNumber, accountNumber } =
    customerDetailsForm.watch();
  const navigate = useNavigate();

  const { document: document, documentType } =
    customerVerifyDocumentsForm.watch();
  const isIdCardDocument = DocumentOptions[0].value === documentType;
  const docType = isIdCardDocument
    ? DocumentOptions[0].label
    : DocumentOptions[1].label;

  const handleFilePreview = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const onClickBack = () => {
    setStep(FormStep.STEP2_VALIDATE_DOCUMENT);
  };

  const goToCustomerDataList = () => {
    navigate("/");
  };

  const onClickSubmit = async () => {
    const data: CustomerData = {
      detail: customerDetailsForm.watch(),
      file: customerVerifyDocumentsForm.watch("document.file"),
      documentType: customerVerifyDocumentsForm.watch("documentType"),
      submittedAt: ''
    };

    createCustomer(data, goToCustomerDataList);
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
        <div className="font-semibold text-gray-700">
          Documents ({docType}):
        </div>
        {document && (
          <PdfFile
            key={document.file.name}
            fileName={document.file.name}
            onClick={() => handleFilePreview(document.file)}
          />
        )}
      </div>
      <div className="grid grid-cols-2 h-full items-end gap-2">
        <Button title="Back" onClick={onClickBack} type="outline" />
        <Button title="Submit" onClick={onClickSubmit} type="primary" />
      </div>
    </div>
  );
}
