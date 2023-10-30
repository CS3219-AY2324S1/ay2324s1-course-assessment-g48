/**
 * Used to specify one or more CSS class names to be applied to an HTML element.
 * By generating this string of class names dynamically, you can conditionally apply different styles
 * to an element based on the provided arguments and their corresponding conditions.
 */

export const classNames = (...args: string[]) => {
  return args.filter(Boolean).join(" ");
};
