import { FC } from "react";
import Modal from './Modal';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserModal: FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="py-4 text-gray-700">
        <p>Are you sure you want to delete this user?</p>
        <div className="flex justify-end">
          <button
            className="mt-4 py-2 px-4 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg shadow-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;