import THEMES from './themes.json'

const themes = THEMES;
const defaultTheme = themes[0];

export const getThemeNames = () => themes.map(theme => theme.key);

export const getTheme = (name) => name ? themes.find(theme => theme.key === name) : defaultTheme;
