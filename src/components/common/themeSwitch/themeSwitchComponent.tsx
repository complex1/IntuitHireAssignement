import { useEffect, useState } from "react";
import LightModeIcon from "../icons/lightModeIcon";
import DarkModeIcon from "../icons/darkModeIcon";
import styled from './themeSwitchComponent.module.css'

const ThemeSwitchComponent = () => {
  const [ theme, setTheme ] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
      const body = document.querySelector('body');
      body?.setAttribute('class', localTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    const body = document.querySelector('body');
    body?.setAttribute('class', theme === 'light' ? 'dark' : 'light');
  };
  return (
    <button className={styled.button} onClick={toggleTheme}>
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
}

export default ThemeSwitchComponent;