import Image from "next/image";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getGlyphWikiSvgFromGlyphData } from "@/lib/files";
import { useGetRelatedGlyphsByCodeQuery } from "@/store/glyphfindAPI";
import { getGlyphWikiNameByCharacter, getUnicodeFromCharacter } from "@/lib/glyphs";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function GlyphInfoPanel() {
  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector(
    (state) => state.general.selctedCharacter
  );
  const selectedTextDataIndex = useAppSelector(
    (state) => state.general.selectedTextDataIndex
  );

  const {
    data: relatedGlyphsData,
    error,
    isLoading: relatedLoading,
  } = useGetRelatedGlyphsByCodeQuery(
    getGlyphWikiNameByCharacter(selectedCharacter)
  );
  const hanldeNameInRelated = (name: string) => {
    if (name.includes("=")) {
      return name.split("=")[0].trim();
    }
    return name;
  };
  const handleClickRelated = (glyphName: string, character: string) => {};
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>漢字符号・字形の情報</AccordionTrigger>
        <AccordionContent>
          <div className="flex-1 border-2 border-black m-1 p-2 flex items-center justify-center">
            <div className="basis-1/3  flex flex-col h-full items-center justify-center">
              <Link
                href={`https://glyphwiki.org/wiki/${getGlyphWikiNameByCharacter(
                  selectedCharacter
                )}`}
                target="_blank"
                className=""
              >
                <Image
                  src={getGlyphWikiSvgFromGlyphData(selectedCharacter) || ""}
                  alt="glyph"
                  width={128}
                  height={128}
                />
              </Link>
              <div className="flex flex-col">
                {/* <p>テキストに出現位置: {selectedTextDataIndex}</p> */}
                <p>テキストに出現位置: {selectedTextDataIndex}</p>
                <p>漢字符号: {selectedCharacter}</p>
                <p>Unicode: {getUnicodeFromCharacter(selectedCharacter)}</p>
              </div>
            </div>

            <div className="basis-2/3 flex flex-col m-2 p-4">
              <h2>関連字形</h2>
              <div className="flex-1 border-2 border-black">
                <ScrollArea className="h-48">
                  <div className="flex flex-wrap">
                    {/* related glyphs */}
                    {!relatedLoading &&
                      relatedGlyphsData?.related_glyphs
                        ?.split(",")
                        .map((item, index) => (
                          <div key={index} className="flex flex-col w-32">
                            <div
                              className="flex w-full justify-center items-center hover:border-2 hover:border-black"
                              onClick={() =>
                                handleClickRelated(
                                  hanldeNameInRelated(item),
                                  selectedCharacter
                                )
                              }
                            >
                              <Image
                                src={`https://glyphwiki.org/glyph/${hanldeNameInRelated(
                                  item
                                )}.png`}
                                alt={item}
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="tooltip" data-tip={item}>
                              <p className="text-xs truncate">{item}</p>
                            </div>
                          </div>
                        ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default GlyphInfoPanel;
