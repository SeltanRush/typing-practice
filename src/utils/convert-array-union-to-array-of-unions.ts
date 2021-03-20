export const convertArrayUnionToArrayOfUnions = <T extends Array<unknown>>(
  array: T
): Array<T[number]> => array;
