import { User } from "@/types";
import { FC, useState } from "react";
import Modal from "./Modal";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [firstName, setFirstName] = useState(user.name.first);
  const [lastName, setLastName] = useState( user.name.last);
  const [email, setEmail] = useState( user.email);
  const [streetNumber, setStreetNumber] = useState( user.location.street.number);
  const [streetName, setStreetName] = useState( user.location.street.name);
  const [city, setCity] = useState( user.location.city);
  const [country, setCountry] = useState( user.location.country);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isFormValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [picture, setPicture] = useState( user.picture.medium);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      name: {
        ...user.name,
        first: firstName,
        last: lastName,
      },
      email: email,
      location: {
        ...user.location,
        street: {
          number: streetNumber,
          name: streetName,
        },
        city: city,
        country: country,
      },
      
    };
    console.log("here");
    console.log(updatedUser);
    
    if (!isEmailValid || !isFormValid) return;

    onSave(updatedUser);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleFormValidation = () => {
    if (firstName.trim().length < 3) {
      setFormValid(false);
      setErrorMessage("First name must be at least 3 characters long");
      return;
    }

    if (!isEmailValid) {
      setFormValid(false);
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setFormValid(true);
    setErrorMessage("");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
      <form onSubmit={handleSubmit} onInput={handleFormValidation}>
        <div className="sm:h-[500px] py-4 text-gray-700">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-800 font-bold mb-2"
            >
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full p-2 rounded border-gray-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-800 font-bold mb-2"
            >
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full p-2 rounded border-gray-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-bold mb-2"
            >
              Email*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 rounded border-gray-300"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {!isEmailValid && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="streetNumber"
              className="block text-gray-800 font-bold mb-2"
            >
              Street Number*
            </label>
            <input
              type="text"
              name="streetNumber"
              id="streetNumber"
              className="w-full p-2 rounded border-gray-300"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="streetName"
              className="block text-gray-800 font-bold mb-2"
            >
              Street Name*
            </label>
            <input
              type="text"
              name="streetName"
              id="streetName"
              className="w-full p-2 rounded border-gray-300"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-800 font-bold mb-2"
            >
              City*
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="w-full p-2 rounded border-gray-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-800 font-bold mb-2"
            >
              Country*
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="w-full p-2 rounded border-gray-300"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          {!isFormValid && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
          <div className="flex justify-end">
            <button
              className="mt-4 py-2 px-4 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg shadow-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default EditUserModal;
