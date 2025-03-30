import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end mt-4 space-x-4">
          <Button title="Cancel" type="outline" size="small" onClick={onCancel} />
          <Button title="Confirm" size="small" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
