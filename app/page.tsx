"use client";

import Header from "@/components/Header";
import Providers from "@/components/Provider";
import CodePanel from "@/components/panel/CodePanel";
import PreviewPanel from "@/components/panel/PreviewPanel";
import SearchPanel from "@/components/panel/SearchPanel";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <Providers>
      <main className="w-full">
        <div className="flex flex-col py-4">
          <Header />
          <SearchPanel />
          <Separator className="my-4" />
          <PreviewPanel />
          <Separator className="my-4" />
          <CodePanel />
        </div>
      </main>
    </Providers>
  );
}
