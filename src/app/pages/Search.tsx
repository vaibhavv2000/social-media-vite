import Searchbar from "../components/search/Searchbar";
import {useEffect} from "react";

const Search = () => {

 useEffect(() => {
  document.title = `Search users`;
 }, []);
  
 return (
  <div className="flex flex-1 h-[calc(100vh-0px)] xs:h-[calc(100vh-130px)] md:h-auto justify-center dark:bg-[#191919]">
   <Searchbar />
  </div>
 );
};

export default Search;
