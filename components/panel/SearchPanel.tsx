
"use client"

import { Separator } from "@/components/ui/separator";
import IdsSearchInput from "../IdsSearchInput";
import IdsResults from "../IdsResults";
import IdsGlyphs from "../IdsGlyphs";
import { Label } from "../ui/label";


function SearchPanel() {
  return (
    <>
      <h2>Input Panel</h2>

      <div className="flex space-x-4 h-64 pt-2">
        <div className="basis-1/4">
          <IdsSearchInput />
        </div>
        <Separator orientation="vertical" className="mx-4" />
        <div className="flex-1">
          <IdsResults />
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1">
          <IdsGlyphs />
        </div>
      </div>
    </>
  );
}

export default SearchPanel;
