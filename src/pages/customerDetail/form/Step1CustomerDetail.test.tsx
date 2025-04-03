/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Step1CustomerDetail from "./Step1CustomerDetail";
import { CustomerDetailFormContext } from "../context/CustomerFormContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerDetailSchema } from "./CustomerDetailForm";
import { FormStep } from "../constants/formConstant";

describe("Step1CustomerDetail Component", () => {
  let mockSetStep: jest.Mock;

  beforeEach(() => {
    mockSetStep = jest.fn(); // Mock setStep

    // Mock context provider and form hook
    const Wrapper = ({ children = <></> }) => {
      const mockForm = useForm({
        resolver: yupResolver(CustomerDetailSchema),
        mode: "onChange",
        reValidateMode: "onChange",
      });

      return (
        <CustomerDetailFormContext.Provider
          value={{ customerDetailsForm: mockForm, setStep: mockSetStep } as any}
        >
          {children}
        </CustomerDetailFormContext.Provider>
      );
    };

    render(
      <Wrapper>
        <Step1CustomerDetail />
      </Wrapper>
    );
  });

  test("displays error when required fields are empty", async () => {
    const firstNameInput = screen.getByTestId(
      "firstNameInput"
    ) as HTMLInputElement;
    const lastNameInput = screen.getByTestId(
      "lastNameInput"
    ) as HTMLInputElement;
    const idCardNumberInput = screen.getByTestId(
      "idCardNumberInput"
    ) as HTMLInputElement;
    const accountNumberInput = screen.getByTestId(
      "accountNumberInput"
    ) as HTMLInputElement;
    const nextButton = screen.getByTestId("button-next") as HTMLButtonElement;

    // Initially, the "Next" button should be disabled because the form is invalid
    expect(nextButton.disabled).toBe(true);

    // Simulate filling the first name with an invalid value
    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.change(idCardNumberInput, { target: { value: "" } });
    fireEvent.change(accountNumberInput, { target: { value: "" } });

    expect(nextButton.disabled).toBe(true);

    // Check input error
    fireEvent.change(firstNameInput, { target: { value: 123 } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "firstNameInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
    fireEvent.change(lastNameInput, { target: { value: "!@#" } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "lastNameInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
    fireEvent.change(idCardNumberInput, { target: { value: "123" } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "idCardNumberInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
    fireEvent.change(accountNumberInput, { target: { value: "hello" } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "accountNumberInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
  });

  test("check input error", async () => {
    const firstNameInput = screen.getByTestId(
      "firstNameInput"
    ) as HTMLInputElement;
    const lastNameInput = screen.getByTestId(
      "lastNameInput"
    ) as HTMLInputElement;
    const idCardNumberInput = screen.getByTestId(
      "idCardNumberInput"
    ) as HTMLInputElement;
    const accountNumberInput = screen.getByTestId(
      "accountNumberInput"
    ) as HTMLInputElement;
    // Check input error
    fireEvent.change(firstNameInput, { target: { value: 123 } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "firstNameInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
    fireEvent.change(lastNameInput, { target: { value: "!@#" } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "lastNameInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
    fireEvent.change(idCardNumberInput, { target: { value: "123" } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "idCardNumberInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
    fireEvent.change(accountNumberInput, { target: { value: "hello" } });
    await waitFor(() => {
      const errorElement = screen.getByTestId(
        "accountNumberInput-error"
      ) as HTMLLabelElement;
      expect(errorElement).toBeDefined();
    });
  });

  test("correct input", async () => {
    const firstNameInput = screen.getByTestId(
      "firstNameInput"
    ) as HTMLInputElement;
    const lastNameInput = screen.getByTestId(
      "lastNameInput"
    ) as HTMLInputElement;
    const idCardNumberInput = screen.getByTestId(
      "idCardNumberInput"
    ) as HTMLInputElement;
    const accountNumberInput = screen.getByTestId(
      "accountNumberInput"
    ) as HTMLInputElement;
    const nextButton = screen.getByTestId("button-next") as HTMLButtonElement;

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(idCardNumberInput, { target: { value: 1112223334445 } });
    fireEvent.change(accountNumberInput, { target: { value: 555666777 } });

    await waitFor(() => expect(nextButton.disabled).toBe(false));

    // Click Next step
    fireEvent.click(nextButton);

    await waitFor(() =>
      expect(mockSetStep).toHaveBeenCalledWith(FormStep.STEP2_VALIDATE_DOCUMENT)
    );
  });
});
