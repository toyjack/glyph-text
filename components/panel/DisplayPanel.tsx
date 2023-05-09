import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PreviewPanel from "./PreviewPanel";
import TextPanel from "./TextPanel";
import GlyphDataPanel from "./GlyphDataPanel";

function DisplayPanel() {
  return (
    <Tabs className="w-full" defaultValue="text">
      <TabsList>
        <TabsTrigger value="text">テキストデータ</TabsTrigger>
        <TabsTrigger value="preview">プレビュー</TabsTrigger>
        <TabsTrigger value="glyphData">字形データ</TabsTrigger>
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
