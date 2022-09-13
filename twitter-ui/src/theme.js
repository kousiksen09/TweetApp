import { createTheme } from '@mui/material/styles';

/**
 * @param px input px as per 1920 * 969 resolution
 */
export const pxToRem = (px) => `${px / 21.66}rem`;

/**
 * @param px input px as per 1920 * 969 resolution
 */
export const pxToVh = (px) => `${px * 0.10319}vh`;

export const pxToVh1974 = (px) => `${px * 0.10266940451}vh`;
/**
 * @param px input px as per 1920 * 1080 resolution
 */
export const pxToVw = (px) => `${px * 0.05208}vw`;

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#FFFFFF',
    },
  },
});

export default theme;
