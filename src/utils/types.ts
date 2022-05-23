export type Error = { bodyText: string };
export type VueFunction = { validate: () => boolean };
export type VueElement = | undefined | Vue | Element | (Vue | Element)[];
