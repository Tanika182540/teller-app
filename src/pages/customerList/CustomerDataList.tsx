import { useEffect, useState } from "react";
import { CustomerData, onCustomersChange } from "../../firebase/firebase.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import PdfFile from "../../shared/components/PdfFile";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";

const DataItem = (props: { customer: CustomerData; index: number }) => {
  const { customer, index } = props;

  const handleFilePreview = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div
      key={customer.detail.idCardNumber}
      className="flex flex-col gap-3 border-2 border-gray-200 hover:border-blue-500 rounded-md p-4"
    >
      <span className="text-gray-600 font-semibold">
        {index + 1}. {customer.detail.firstName} {customer.detail.lastName}
      </span>
      <span className="text-gray-600">
        Id Card: {customer.detail.idCardNumber}
      </span>
      <span className="text-gray-600">
        Account Number: {customer.detail.idCardNumber}
      </span>
      <PdfFile
        fileName="Document"
        onClick={() => handleFilePreview(customer.file)}
      />
    </div>
  );
};

const Nodata = () => (
  <div className="text-xl justify-center text-gray-600">
    No customer data. Let's create!{" "}
    <FontAwesomeIcon icon={faPaperPlane} color="#ffb900" />
  </div>
);

export default function CustomerDataList() {
  const [customers, setCustomers] = useState<CustomerData[]>();
  const navigate = useNavigate();

  useEffect(() => {
    onCustomersChange((data) => {
      if (!data) {
        return;
      }

      setCustomers(data);
    });
  }, []);

  const goToCreateCustomerForm = () => {
    navigate("/customer-details");
  };

  return (
    <div className="flex flex-col size-full justify-center items-center">
      <h2 className="text-2xl font-semibold text-gray-800 bg-white top-0 p-6 flex flex-row justify-between max-w-4xl w-full mb-6yarn global add vercel">
        <div>
          <FontAwesomeIcon icon={faIdCard} /> Customer Data
        </div>
        <Button title="Create Customer Data" onClick={goToCreateCustomerForm} />
      </h2>
      <div className="w-full max-w-4xl h-[672px] p-6 bg-white shadow-md rounded-2xl flex flex-col gap-4 overflow-scroll self-center">
        {customers ? (
          customers?.map((customer, index) => {
            return (
              <DataItem
                key={customer.detail.idCardNumber}
                customer={customer}
                index={index}
              />
            );
          })
        ) : (
          <Nodata />
        )}
      </div>
    </div>
  );
}
