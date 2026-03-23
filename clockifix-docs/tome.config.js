/** @type {import('@tomehq/core').TomeConfig} */
export default {
  name: "Clockifixed",
  theme: {
    preset: "amber",
    mode: "auto",
  },
  // api: {
  //   spec: "./openapi.json",
  //   playground: true,
  // },
  navigation: [
    {
      group: "Overview",
      pages: ["index"],
    },
    {
      group: "Clockifixed SDK",
      pages: [
        "sdk/architecture",
        "sdk/getting-started",
        "sdk/type-system",
        "sdk/endpoints",
        "sdk/verification",
      ],
    },
    {
      group: "System Design",
      pages: [
        "system/overview",
        "system/data-flow",
        "system/type-generation",
      ],
    },
    {
      group: "Clockify API",
      pages: [
        "api/overview",
        "api/anomalies",
      ],
    },
  ],
};
