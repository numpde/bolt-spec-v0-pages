(function(root, factory) {
  const yamlApi = typeof module === "object" && module.exports
    ? require("js-yaml")
    : root.jsyaml;
  const api = factory(yamlApi);

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root) {
    Object.assign(root, api);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function(yamlApi) {
  const getYamlApi = () => {
    if (!yamlApi || typeof yamlApi.load !== "function") {
      throw new Error("js-yaml is not available");
    }

    return yamlApi;
  };

  const parseYamlDocument = (yamlText) => {
    const activeYamlApi = getYamlApi();
    const parsedValue = activeYamlApi.load(String(yamlText), {
      // Keep catalog parsing constrained to JSON-like data types.
      schema: activeYamlApi.JSON_SCHEMA,
    });

    return parsedValue == null ? {} : parsedValue;
  };

  return {
    parseYamlDocument,
  };
});
