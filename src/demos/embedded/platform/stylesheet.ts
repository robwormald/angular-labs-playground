
const COMPONENT_REGEX = /%COMP%/g;
export const COMPONENT_VARIABLE = '%COMP%';

export function flattenStyles(
    compId: string, styles: Array<any|any[]>, target: string[]): string[] {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];

    if (Array.isArray(style)) {
      flattenStyles(compId, style, target);
    } else {
      style = style.replace(COMPONENT_REGEX, compId);
      target.push(style);
    }
  }
  return target;
}
