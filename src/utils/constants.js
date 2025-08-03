// constants.js

export const BREAKPOINTS = {
  largeDevice: 1380,
  mediumLarge: 1200,
  medium: 1080,
  mediumSmall: 950,
  smallMedium: 873,
  small: 580,
  verySmall: 450,
  mini: 350,
};

export const QUERIES = {
  largeAndDown: `(max-width: ${BREAKPOINTS.largeDevice}px)`,
  mediumLargeAndDown: `(max-width: ${BREAKPOINTS.mediumLarge}px)`,
  mediumAndDown: `(max-width: ${BREAKPOINTS.medium}px)`,
  mediumSmallAndDown: `(max-width: ${BREAKPOINTS.mediumSmall}px)`,
  smallMediumAndDown: `(max-width: ${BREAKPOINTS.smallMedium}px)`,
  smallAndDown: `(max-width: ${BREAKPOINTS.small}px)`,
  verySmallAndDown: `(max-width: ${BREAKPOINTS.verySmall}px)`,
};

export const CITIES = ["Ho Chi Minh", "Hanoi", "Da Nang", "Can Tho", "Hai Phong"];

export const TIME = [
  "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
];
