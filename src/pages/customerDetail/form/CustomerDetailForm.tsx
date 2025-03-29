import * as yup from "yup";
import { ValidationRules } from "../../../shared/regex/validationRules";

export interface ICustomerDetail {
  firstName: string;
  lastName: string;
  idCardNumber: string;
  accountNumber: number;
}

export interface ICustomerVerifyDocuments {
  documents?: File[];
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
  .mixed<File[]>()
  .test(
    "fileType",
    "Only PDF files are allowed",
    (files) => files && files.every((file) => file.type === "application/pdf")
  )
  .test(
    "fileSize",
    "Each file must be less than 5MB",
    (files) => files && files.every((file) => file.size <= 5 * 1024 * 1024)
  )
  .test(
    "fileCount",
    "You can upload up to 5 files",
    (files) => files && files.length >= 1 && files.length <= 5
  );

export const CustomerVerifyDocumentsSchema = yup.object({
  documents: fileSchema,
});
