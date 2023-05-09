"use client";
import { AppDispatch, RootState } from "@/store";
import { setCharacter, setTextDataIndex } from "@/store/generalSlicer";
import Image from "next/image";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import clsx from "clsx";
import { Separator } from "../ui/separator";
import {
  getGlyphWikiNameByCharacter,
  getUnicodeFromCharacter,
} from "@/lib/utils";
import Link from "next/link";
import { getGlyphWikiSvgFromGlyphData } from "@/lib/files";
import { useGetRelatedGlyphsByCodeQuery } from "@/store/glyphfindAPI";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function PreviewPanel() {
  const dispatch = useAppDispatch();
  const glyphData = useAppSelector((state) => state.general.glyphData);
  const textData = useAppSelector((state) => state.general.textData);
  const selectedCharacter = useAppSelector(
    (state) => state.general.selctedCharacter
  );
  const selectedTextDataIndex = useAppSelector(
    (state) => state.general.selectedTextDataIndex
  );

  const getGwName = (character: string) => {
    const codePoint = character.codePointAt(0);
    const gwName = `${codePoint?.toString(16)}`;
    return gwName;
  };

  const {
    data: relatedGlyphsData,
    error,
    isLoading: relatedLoading,
  } = useGetRelatedGlyphsByCodeQuery(getGwName(selectedCharacter));

  const handleGlyphClick = (index: number) => {
    console.log(index);
    dispatch(setTextDataIndex(index));
    dispatch(setCharacter(textData[index].character));
  };
  const getGlyphSvg = (char: string) => {
    const result = glyphData?.find((item) => item.character === char);
    return result?.glyphwiki_svg;
  };

  const hanldeNameInRelated = (name: string) => {
    if (name.includes("=")) {
      return name.split("=")[0].trim();
    }
    return name;
  };
  const handleClickRelated =(glyphName:string, character:string)=>{}
  return (
    <div className="flex flex-col">
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

      <div className="flex flex-col">
        <h3 className="font-bold p-2 m-1">翻字字形データプレビュー</h3>
        <div className="border-2 border-black m-1 p-2">
          <ScrollArea className="h-96">
            <div className="flex flex-wrap">
              {textData &&
                textData.map((character) => {
                  if (
                    character.character === "\r" ||
                    character.character === "\n"
                  ) {
                    // https://tobiasahlin.com/blog/flexbox-break-to-new-row/
                    return (
                      <span
                        key={character.index}
                        className="basis-full w-0"
                      ></span>
                    );
                  } else {
                    return (
                      <span
                        key={character.index}
                        onClick={() => handleGlyphClick(character.index)}
                        className={clsx(
                          character.index === selectedTextDataIndex &&
                            "border-2 border-black"
                        )}
                      >
                        <Image
                          src={
                            getGlyphWikiSvgFromGlyphData(character.character) ||
                            "/images/noimage.png"
                          }
                          alt={character.character}
                          width={32}
                          height={32}
                          loading="lazy"
                        />
                      </span>
                    );
                  }
                })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default PreviewPanel;
