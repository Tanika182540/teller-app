import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import {
  CustomerDetailFormContext,
  ICustomerDetailContext,
} from "../context/CustomerFormContext";
import { FormStep } from "../constants/formConstant";

export default function Step1CustomerDetail() {
  const { customerDetailsForm, setStep } = useContext<ICustomerDetailContext>(
    CustomerDetailFormContext
  );
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = customerDetailsForm;

  const onSubmit = () => {
    setStep(FormStep.STEP2_VALIDATE_DOCUMENT);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center space-y-4 size-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <Input
              title="First Name"
              value={value}
              onChange={onChange}
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <Input
              title="Last Name"
              value={value}
              onChange={onChange}
              error={errors.lastName?.message}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="idCardNumber"
        render={({ field: { onChange, value } }) => (
          <Input
            title="National Id Number"
            value={value}
            onChange={onChange}
            error={errors.idCardNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="accountNumber"
        render={({ field: { onChange, value } }) => (
          <Input
            title="Account Number"
            value={value}
            onChange={onChange}
            error={errors.accountNumber?.message}
          />
        )}
      />
      <div className="flex grow" />
      <Button title="Next" type="primary" disabled={!isValid} />
    </form>
  );
}
