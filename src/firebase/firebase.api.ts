import { ref, set, onValue, get } from "firebase/database";
import { successToast, errorToast } from "../shared/components/Toast";
import { database } from "./firebase.config";
import { ICustomerDetail } from "../pages/customerDetail/form/customerDetailForm";
import dayjs from "dayjs/esm/index.js";

export type CustomerData = {
  detail: ICustomerDetail;
  documentType: string;
  file: File;
  submittedAt: string;
};

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const createCustomer = async (
  form: CustomerData,
  callback: () => void
) => {
  console.log("from", form.file);
  const { detail, file, documentType } = form;
  const { accountNumber, firstName, idCardNumber, lastName } = detail;
  const document = await toBase64(file);
  const documentName = file.name;

  const customerRef = ref(database, `customers/${idCardNumber}`); // Use email as the unique identifier or generate a unique key

  try {
    const current = await get(customerRef);
    if (current.exists()) {
      errorToast(`Customer ${idCardNumber} is already submitted`);
      return;
    }

    const data = {
      accountNumber,
      firstName,
      idCardNumber,
      lastName,
      document,
      documentName,
      documentType,
      submittedAt: dayjs().format(),
    };

    set(customerRef, data);
    successToast("User data submitted successfully!");
    callback();
  } catch (e: unknown) {
    console.error("Error submitting data:", e);
    errorToast("Failed to submit data");
  }
};

const base64ToFile = (dataUri: string, filename: string): File => {
  // Split the data URI into the Base64 part and the metadata part (before the comma)
  const [header, base64String] = dataUri.split(",");

  const match = header.match(/^data:(.*?);/); // Match the part after "data:" and before ";"

  const mimeType = match ? match[1] : "application/pdf"; // Return the MIME type or pdf if not found

  // Create a binary string from the base64 string
  const byteCharacters = atob(base64String); // Decode the base64 string into a byte string
  const byteArrays: number[] = [];

  // Convert each character to a byte value
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    byteArrays.push(byteCharacters.charCodeAt(offset));
  }

  // Create a Blob from the byte array
  const byteArray = new Uint8Array(byteArrays);
  const blob = new Blob([byteArray], { type: mimeType });

  // Convert Blob to File and return it
  return new File([blob], filename, { type: mimeType });
};

export const onCustomersChange = (
  onChange: (list: CustomerData[]) => unknown
) => {
  const customerRef = ref(database, "customers"); // Use email as the unique identifier or generate a unique key
  onValue(customerRef, (snapshot) => {
    const list: CustomerData[] = [];
    snapshot.forEach((child) => {
      if (child.exists()) {
        list.push(toCustomerData(child.val()));
      }
    });

    list.sort((a, b) => (dayjs(b.submittedAt).isAfter(a.submittedAt) ? 1 : 0));

    onChange(list);
  });
};

export const onCustomerChange = (
  idCardNumber: string,
  onChange: (unknown: CustomerData) => unknown
) => {
  const customerRef = ref(database, "customers/" + idCardNumber); // Use email as the unique identifier or generate a unique key
  console.log("ref");
  onValue(customerRef, (snapshot) => {
    onChange(toCustomerData(snapshot.val()));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCustomerData = (value: any): CustomerData => {
  const {
    accountNumber,
    firstName,
    idCardNumber,
    lastName,
    document,
    documentName,
    documentType,
    submittedAt,
  } = value;

  const file = base64ToFile(document, documentName);
  const detail: ICustomerDetail = {
    accountNumber,
    firstName,
    idCardNumber,
    lastName,
  };
  const data: CustomerData = {
    detail,
    file,
    documentType,
    submittedAt,
  };

  return data;
};
