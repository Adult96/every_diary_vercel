const Valid = {
  title(text) {
    if (text.length <= 0) return false;
    return true;
  },

  content(text) {
    if (text.length <= 0) return false;
    return true;
  },

  formEmpty(...text) {
    const textArr = text.map(v => v.length);
    if (textArr.length <= 0) return false;
    return true;
  },

  pwDifferentCheck(...text) {
    if (new Set(...text).size === text.length) return false;
    return true;
  },
};

export default Valid;
