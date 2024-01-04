import React, { useState } from 'react'
import './ThemeChanger.scss'

const ThemeChanger = () => {
    
    const [theme, setTheme] = useState(0);

    const changeTheme = () =>{
        if(theme < 3){
            setTheme(theme + 1);
        } else{
            setTheme(0)
        }

        switch(theme){
            case 0:
                document.documentElement.style.setProperty('--first-color', '#E27D60');
                document.documentElement.style.setProperty('--second-color', '#85DCB8');
                document.documentElement.style.setProperty('--third-color', '#41B3A3');
                document.documentElement.style.setProperty('--fourth-color', '#C38D9E');
                document.documentElement.style.setProperty('--fifth-color', '#E27D60');
                break;
            default:
                document.documentElement.style.setProperty('--first-color', '#1db954');
                document.documentElement.style.setProperty('--second-color', '#212121');
                document.documentElement.style.setProperty('--third-color', '#121212');
                document.documentElement.style.setProperty('--fourth-color', '#b3b3b3');
                document.documentElement.style.setProperty('--fifth-color', '#ffffff');
        }
        
    }
  return (
    <div className='themechanger' onClick={() => changeTheme()}>
        <span>Mix It Up!</span>
        <img src="/img/vinyl.png" alt="" />
    </div>
  )
}

export default ThemeChanger