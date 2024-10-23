import { LiaTimesSolid } from "react-icons/lia";

interface ComfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModel: React.FC<ComfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[400px] p-5 relative">
        <div className="absolute top-2 right-2" onClick={onClose}>
          <LiaTimesSolid size={20} />
        </div>
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">Are you want to delete the product</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
