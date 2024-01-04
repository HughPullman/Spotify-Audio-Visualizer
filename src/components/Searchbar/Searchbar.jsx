import React, { useCallback, useState } from 'react';
import './Searchbar.scss';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = (props) => {

  const [term, setTerm] = useState("");
  
  const handleTermChange = useCallback((event) =>{
    setTerm(event.target.value);
  },[]);

  const search = useCallback(() =>{
    props.onSearch(term);
  }, [props.onSearch, term]);

  return (
    <div className='searchbar'>
        <div className="left">
            <SearchIcon className='icon'></SearchIcon>
        </div>
        <div className="right">
            <input type="text" placeholder='Search . . .' onChange={handleTermChange} onKeyDown={(e) => {if (e.key === "Enter")search();}}/>
        </div>
    </div>
  )
}

export default Searchbar