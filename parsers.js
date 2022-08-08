const parser = (rawData, type = "DOMParser", format) => {
  switch (type) {
    case "DOMParser":
      const parser = new DOMParser();
      const parseData = parser.parseFromString(rawData, format);
      return {
        doc: parseData,
      };
    default:
      return {};
  }
};

export default parser;
