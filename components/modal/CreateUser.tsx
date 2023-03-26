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
  const [picture, setPicture] = useState<FileList | null>(null);

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
        medium: picture ? URL.createObjectURL(picture[0]) : "",
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
    setPicture(null);
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
          {/* <div className="mb-4">
                        <label
                            htmlFor="picture"
                            className="block text-gray-800 font-bold mb-2"
                        >
                            Picture
                        </label>
                        <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M27.607 26.93l-4.214 4.215a.6.6 0 01-.849 0l-4.214-4.215a.6.6 0 01.425-1.025h2.101V21.6H8.157v4.305h2.1a.6.6 0 01.425 1.025l-4.214 4.215a.6.6 0 010 .849l4.214 4.215a.6.6 0 01.849 0l4.214-4.215a.6.6 0 010-.849zM16.5 24a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm0-1.2a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
               
                     */}

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
