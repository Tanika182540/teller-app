import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { ICustomerDetail, ICustomerVerifyDocuments } from "../form/customerDetailForm";

export interface ICustomerDetailContext {
  setStep: (step: number) => void;
  customerDetailsForm: UseFormReturn<ICustomerDetail, unknown, ICustomerDetail>;
  customerVerifyDocumentsForm: UseFormReturn<
    ICustomerVerifyDocuments,
    unknown,
    ICustomerVerifyDocuments
  >;
  customerVerifyDocuments: File[];
  setCustomerVerifyDocuments: (files: File[]) => void;
}

export const CustomerDetailFormContext = createContext<ICustomerDetailContext>({
  setStep: () => {},
  customerDetailsForm: {} as never,
  customerVerifyDocumentsForm: {} as never,
  customerVerifyDocuments: [],
  setCustomerVerifyDocuments: () => {},
});
