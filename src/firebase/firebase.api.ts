import { getStorage, ref, uploadBytes } from "firebase/storage";
import { successToast } from "../shared/components/Toast";

export const uploadPdfFile = (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, "some-child");
  uploadBytes(storageRef, file).then((snapshot) => {
    successToast("Upload File Success");
  });
};
