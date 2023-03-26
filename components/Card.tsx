import { useAppDispatch } from "@/redux/hooks";
import { userActions } from "@/redux/slices/userSlice";
import { IUpsertUser, User } from "@/types";
import { FC, useState } from "react";
import Modal from "../components/modal/Modal";
import DeleteUserModal from "./modal/DeleteUser";
import EditUserModal from "./modal/EditUser";

interface CardProps {
  user: User | undefined;
}

const Card: FC<CardProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  if (!user) {
    return <div>User not found</div>;
  }

  const handleDelete = () => {
    dispatch(userActions.deleteUser(user.login.uuid));
  };
  const handleSave = (updatedUser: User) => {
    dispatch(
      userActions.upsertUser({
        id: user?.login.uuid,
        email: updatedUser.email,
        city: updatedUser.location.city,
        country: updatedUser.location.country,
        streetName: updatedUser.location.street.name,
        streetNumber: updatedUser.location.street.number,
        firstName: updatedUser.name.first,
        lastName: updatedUser.name.last,
      })
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-gray-200 font-sans">
      <div className="flex flex-wrap justify-center">
        <div className="w-full ">
          <div className="bg-gradient-to-br from-slate-900 to-from-slate-900 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <div className="py-6 px-4">
              <div className="flex justify-center">
                <img
                  src={user.picture.medium}
                  alt="first user"
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.name.title} {user.name.first} {user.name.last}
                </h2>
                <p className="text-md font-semibold text-gray-800 mt-1">
                  {user.location.country}
                  {user.location.city} {user.location.street.name}{" "}
                  {user.location.street.number}
                </p>
                <p className="text-xs sm:text-base text-gray-700 mt-1">
                  {user.email}
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-yellow-500 text-white font-semibold py-2 px-7 mr-4 pl rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={() => {
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-slate-700 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSave}
      />
    </div>

    
  );
};

export default Card;
