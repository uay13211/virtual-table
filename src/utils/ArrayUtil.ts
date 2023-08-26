export class ArrayUtil {
  static toggleElement<T>(array: T[], element: T) {
    const foundIndex = array.findIndex((_) => _ === element);
    if (foundIndex === -1) {
      return [...array, element];
    } else {
      const clonedArray = [...array];
      clonedArray.splice(foundIndex, 1);
      return clonedArray;
    }
  }

  static compactMap<T, V>(
    array: ReadonlyArray<T>,
    callback: (item: T, index: number) => V
  ): Array<NonNullable<V>> {
    return array
      .map(callback)
      .filter(
        (_) =>
          _ !== null &&
          _ !== undefined &&
          (typeof _ !== "number" || !Number.isNaN(_))
      ) as Array<NonNullable<V>>;
  }
}
