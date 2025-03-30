import * as yup from "yup";
import { ValidationRules } from "../../../shared/regex/validationRules";

export interface ICustomerDetail {
  firstName: string;
  lastName: string;
  idCardNumber: string;
  accountNumber: number;
}

export interface Document {
  file: File;
  isUpload?: boolean;
}

export interface ICustomerVerifyDocuments {
  documentType: string;
  document?: Document;
}

export const CustomerDetailSchema = yup.object({
  firstName: yup
    .string()
    .matches(
      ValidationRules.StringsExceptNumber,
      "Account number must be exactly 13 digits"
    )
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(
      ValidationRules.StringsExceptNumber,
      "Account number must be exactly 13 digits"
    )
    .required("Last name is required"),
  idCardNumber: yup
    .string()
    .matches(
      ValidationRules.nationalIdNumber,
      "National ID card number must be exactly 13 digits"
    )
    .required("National ID card number is required"),
  accountNumber: yup.number().required("Account Number is required"),
});

const fileSchema = yup
  .mixed<Document>()
  .test(
    "documentSize",
    "Each file must be less than 5MB",
    (document) => document && document.file.size <= 5 * 1024 * 1024
  )
  .required();

export const CustomerVerifyDocumentsSchema = yup.object({
  documentType: yup.string().required(),
  document: fileSchema,
});
