import THEMES from './themes.json'

export const themes = THEMES;
const defaultTheme = themes[0];
const defaultShade = 'light';

export const getTheme = (name) => name ? themes.find(theme => theme.key === name) : defaultTheme;
