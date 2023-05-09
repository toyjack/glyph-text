"use client";

import Header from "@/components/Header";
import Providers from "@/components/Provider";
import DisplayPanel from "@/components/panel/DisplayPanel";
import StepPanel from "@/components/panel/StepPanel";
import { Separator } from "@/components/ui/separator";

// TODO: read plain text file
// TODO: read glyph file
// TODO: glyph file modification
// TODO: glyph file generation

export default function Home() {
  return (
    <Providers>
      <main className="w-full">
        <div className="flex flex-col py-4">
          <Header />
          {/* <SearchPanel />
          <Separator className="my-4" /> */}
          <StepPanel />
          <Separator className="my-4" />
          <DisplayPanel />
        </div>
      </main>
    </Providers>
  );
}
