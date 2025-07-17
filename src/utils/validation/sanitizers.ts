
export const sanitizers = {
  string: (value: string) => {
    return value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  filename: (value: string) => {
    return value.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_');
  },

  url: (value: string) => {
    try {
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Invalid protocol');
      }
      return url.toString();
    } catch {
      return '';
    }
  }
};
