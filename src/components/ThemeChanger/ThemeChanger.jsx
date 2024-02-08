import React, { useState } from 'react'
import './ThemeChanger.scss'

const ThemeChanger = () => {
    
    const [theme, setTheme] = useState(1);

    const changeTheme = () =>{
        if(theme < 4){
            setTheme(theme + 1);
        } else{
            setTheme(0)
        }

        switch(theme){
            case 1:
                document.documentElement.style.setProperty('--first-color', '#8d1db7');
                document.documentElement.style.setProperty('--second-color', '#13097a');
                document.documentElement.style.setProperty('--third-color', '#06043d');
                document.documentElement.style.setProperty('--fourth-color', '#ffa357');
                document.documentElement.style.setProperty('--fifth-color', '#ffdec5');
                break;
            case 2:
                document.documentElement.style.setProperty('--first-color', '#d83232');
                document.documentElement.style.setProperty('--second-color', '#3d0c0c');
                document.documentElement.style.setProperty('--third-color', '#280505');
                document.documentElement.style.setProperty('--fourth-color', '#b29696');
                document.documentElement.style.setProperty('--fifth-color', '#ffeeee');
                break;
            case 3:
                document.documentElement.style.setProperty('--first-color', '#6afe77');
                document.documentElement.style.setProperty('--second-color', '#000001');
                document.documentElement.style.setProperty('--third-color', '#fd6e68');
                document.documentElement.style.setProperty('--fourth-color', '#b3b3b3');
                document.documentElement.style.setProperty('--fifth-color', '#ffffff');
                break;
            case 4:
                document.documentElement.style.setProperty('--first-color', '#1d42b7');
                document.documentElement.style.setProperty('--second-color', '#0d1a3a');
                document.documentElement.style.setProperty('--third-color', '#081021');
                document.documentElement.style.setProperty('--fourth-color', '#9fa7bc');
                document.documentElement.style.setProperty('--fifth-color', '#e1eaff');
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
        <img src="/spotifyvisual/img/vinyl.png" alt="" />
    </div>
  )
}

export default ThemeChanger