const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'En serio... ';
  }
};

export default {
  checked
};
