import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Question } from '@/database/question/entities/question.entity';

type QuestionSearchBarProps = {
    questions: Question[];
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const QuestionSearchBar: React.FC<QuestionSearchBarProps> = ({ questions, setSearch}) => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Question[]>([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);  
      };
    const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Perform search logic here and update searchResults state with the matching results
      // For example, you might filter a list of items based on the input value.
      // const filteredResults = yourSearchLogic(searchTerm);
        // setSearchResults(filteredResults);
        setSearch(searchTerm);
    }
    };
    const handleResultClick = (result: Question) => {
        setSearchTerm(result.title);
        console.log("handle", result.title)
        setIsInputFocused(false); // Close the dropdown after selecting a result
        setSearch(result.title);

  };
    
    useEffect(() => {
       setSearchResults(questions.filter((question) => {
              return question.title.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== "";
          }));
    }, [searchTerm])
    
    return (
     <div className="relative flex flex-col items-center">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm w-full"
        value={searchTerm}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
      </div>

      {/* Dropdown for search results */}
      {isInputFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {searchResults.map((result, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => handleResultClick(result)}>
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
    );
}
export default QuestionSearchBar;