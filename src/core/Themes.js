import THEMES from './themes.json'

const themes = THEMES;
const defaultTheme = themes[0];

export const getThemes = () => themes.map(theme => theme.key);

export const getThemeByName = (name) => name ? themes.find(theme => theme.key === name) : defaultTheme;
