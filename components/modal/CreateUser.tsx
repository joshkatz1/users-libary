import { FC, useState } from "react";
import Modal from "./Modal";
import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: User) => void;
}

const NewUserModal: FC<NewUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [title, setTitle] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isFormValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      name: {
        title: title,
        first: firstName,
        last: lastName,
      },
      email: email,
      login: {
        uuid: uuidv4(),
      },
      location: {
        street: {
          number: streetNumber,
          name: streetName,
        },
        city: city,
        country: country,
      },
      picture: {
        medium: picture,
      },
    };

    if (!isEmailValid || !isFormValid) return;
    onSave(newUser);

    // Clear form values
    setFirstName("");
    setLastName("");
    setEmail("");
    setStreetNumber("");
    setStreetName("");
    setCity("");
    setCountry("");
    setEmailValid(true);
    setFormValid(true);
    setErrorMessage("");
    
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
    <Modal isOpen={isOpen} onClose={onClose} title="Add User">
      <form onSubmit={handleSubmit} onInput={handleFormValidation}>
        <div className="py-4 text-gray-700">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Street Number*
            </label>
            <input
              type="text"
              name="streetNumber"
              id="streetNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="streetName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Street Name*
            </label>
            <input
              type="text"
              name="streetName"
              id="streetName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City*
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country*
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default NewUserModal;
