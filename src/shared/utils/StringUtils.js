export class StringUtils {
  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static formatId(id, padding = 3) {
    return id.toString().padStart(padding, '0');
  }
}