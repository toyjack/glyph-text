import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PreviewPanel from "./PreviewPanel";
import TextPanel from "./TextPanel";
import GlyphDataPanel from "./GlyphDataPanel";

function DisplayPanel() {
  return (
    <Tabs className="w-full" defaultValue="text">
      <TabsList>
        <TabsTrigger value="text">Text Data</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="glyphData">Glyph Data</TabsTrigger>
      </TabsList>

      <TabsContent value="text">
        <TextPanel />
      </TabsContent>

      <TabsContent value="preview">
        <PreviewPanel />
      </TabsContent>

      <TabsContent value="glyphData">
        <GlyphDataPanel />
      </TabsContent>
    </Tabs>
  );
}

export default DisplayPanel;
