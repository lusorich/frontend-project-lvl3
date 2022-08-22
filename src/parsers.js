/* eslint-disable no-case-declarations */
// eslint-disable-next-line default-param-last
const parser = (rawData, type = 'DOMParser', format) => {
  switch (type) {
    case 'DOMParser':
      const domParser = new DOMParser();
      const parseData = domParser.parseFromString(rawData, format);
      return {
        doc: parseData,
      };
    default:
      return {};
  }
};

export default parser;
