import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

export default defineConfig({
  name: "default",
  title: "Cogito Academy Website",

  projectId: "skfmwuke",
  dataset: "development",

  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages: [
        { id: "id", title: "Indonesian" },
        { id: "en", title: "English" },
      ],
      defaultLanguages: ["id"],
      fieldTypes: ["string", "text"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
