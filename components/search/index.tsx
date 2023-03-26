import { FC, useState } from "react";
import { User } from "@/types";
import CardGrid from "../CardGrid";

export enum FILTERS {
  ID = "id",
  NAME = "name",
  EMAIL = "email",
  LOCATION = "location",
}

interface SearchProps {
  users: User[];
}

const handleFilter = (filter: FILTERS, value: string) => {
  if (filter === FILTERS.ID) {
    return (user: User) =>
      user.login.uuid.toLowerCase().includes(value.toLowerCase());
  }

  if (filter === FILTERS.NAME) {
    return (user: User) =>
      `${user.name.title} ${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(value.toLowerCase());
  }

  if (filter === FILTERS.EMAIL) {
    return (user: User) =>
      user.email.toLowerCase().includes(value.toLowerCase());
  }

  if (filter === FILTERS.LOCATION) {
    return (user: User) =>
      user.location.country.toLowerCase().includes(value.toLowerCase()) ||
      user.location.city.toLowerCase().includes(value.toLowerCase()) ||
      user.location.street.name.toLowerCase().includes(value.toLowerCase());
  }

  // If the filter is not recognized, return a function that always returns false.
  return () => false;
};

const Search: FC<SearchProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState<FILTERS>(FILTERS.ID);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e: any) => {
    e.preventDefault();
    setSearchOption(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const userFilter = handleFilter(searchOption, searchTerm);
    return userFilter(user);
  });


  return (
    <div>
      
    <form>
      <div className="flex flex-col gap-1 sm:flex-row items-center ">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <select
  className=" block appearance-none w-40 h-full  border border-gray-400  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  value={searchOption}
  onChange={handleSelectChange}
>
  <option value="id">ID</option>
  <option value="name">Name</option>
  <option value="email">Email</option>
  <option value="location">Location</option>
</select>
      <div className="relative w-full">
          <input type="search" id="search-dropdown" className="pt-3 border-gray-400 block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  border-l-2 border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required value={searchTerm} onChange={handleInputChange} />
          <button onClick={(e) => {
  e.preventDefault();
  // handle search logic here
}} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-slate-800 pb-3 rounded-r-lg border border-slate-800 focus:ring-4 focus:outline-none ">
  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
  <span className="sr-only">Search</span>
</button>
      </div>
      </div>
</form>
   
  <div className="flex flex-col justify-center items-center py-8">
  <CardGrid users={filteredUsers.length ? filteredUsers : []} />
</div>
      </div>
    
  )
}
export default Search;