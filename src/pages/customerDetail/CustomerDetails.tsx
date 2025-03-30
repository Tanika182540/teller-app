import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../shared/components/Modal";
import Step1CustomerDetail from "./form/Step1CustomerDetail";
import {
  CustomerDetailFormContext,
  ICustomerDetailContext,
} from "./context/CustomerFormContext";
import Step2CustomerVerifyDocuments from "./form/Step2CustomerVerifyDocuments";
import { FormTitle } from "./constants/formConstant";
import View from "../../shared/components/View";
import Step3ReviewInformation from "./form/Step3ReviewInformation";
import {
  CustomerDetailSchema,
  CustomerVerifyDocumentsSchema,
} from "./form/CustomerDetailForm";

const CustomerDetailForm = () => {
  const [step, setStep] = useState(1);

  const customerDetailsForm = useForm({
    resolver: yupResolver(CustomerDetailSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const customerVerifyDocumentsForm = useForm({
    resolver: yupResolver(CustomerVerifyDocumentsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      documentType: "id_card",
    },
  });

  const context: ICustomerDetailContext = {
    setStep,
    customerDetailsForm,
    customerVerifyDocumentsForm,
  };

  return (
    <View>
      <div className="w-full max-w-2xl h-[672px] self-center p-6 bg-white shadow-md rounded-2xl flex flex-col gap-4 overflow-scroll">
        <h2 className="text-2xl font-semibold text-gray-800">
          {FormTitle[step - 1]}
        </h2>
        <CustomerDetailFormContext.Provider value={context}>
          {step === 1 && <Step1CustomerDetail />}
          {step === 2 && <Step2CustomerVerifyDocuments />}
          {step === 3 && <Step3ReviewInformation />}
        </CustomerDetailFormContext.Provider>
        <Modal
          isOpen={false}
          title="Modal"
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
          children={undefined}
        />
      </div>
    </View>
  );
};

export default CustomerDetailForm;
