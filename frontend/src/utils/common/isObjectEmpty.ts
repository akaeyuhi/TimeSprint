export const isObjectEmpty = (object: object) => (
  object &&
    Object.keys(object).length === 0 &&
    object.constructor === Object
);
