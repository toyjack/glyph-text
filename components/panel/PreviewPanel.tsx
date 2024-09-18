"use client";
import Image from "next/image";
import clsx from "clsx";

import GlyphInfoPanel from "./GlyphInfoPanel";

import { AppDispatch, RootState } from "@/store";
import { setCharacter, setTextDataIndex } from "@/store/generalSlicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import { getGlyphWikiSvgFromGlyphData } from "@/lib/files";
import { useState } from "react";
import Glyph from "../Glyph";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function PreviewPanel() {
  const dispatch = useAppDispatch();
  const glyphData = useAppSelector((state) => state.general.glyphData);
  const textData = useAppSelector((state) => state.general.textData);

  const [useGlyphWiki, setUseGlyphWiki] = useState(false);

  const selectedTextDataIndex = useAppSelector(
    (state) => state.general.selectedTextDataIndex
  );

  const handleSwitchGlyphWiki = () => {
    setUseGlyphWiki(!useGlyphWiki);
  };

  const handleGlyphClick = (index: number) => {
    dispatch(setTextDataIndex(index));
    dispatch(setCharacter(textData[index].character));
  };

  return (
    <div className="flex flex-col">
      <GlyphInfoPanel />

      <div className="flex flex-col">
        <h3 className="font-bold p-2 m-1">Preivew</h3>
        <h3>
          Display with glyph data：
          <label className="swap">
            <input
              type="checkbox"
              checked={useGlyphWiki}
              onClick={handleSwitchGlyphWiki}
            />
            <div className="swap-on">ON</div>
            <div className="swap-off">OFF</div>
          </label>
        </h3>
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
                        {useGlyphWiki && (
                          <Image
                            src={
                              getGlyphWikiSvgFromGlyphData(
                                character.character
                              ) || "/images/noimage.png"
                            }
                            alt={character.character}
                            width={32}
                            height={32}
                            loading="lazy"
                          />
                        )}
                        {!useGlyphWiki && (
                          <Glyph
                            character={character.character}
                            glyphData={
                              glyphData.filter(
                                (e) => e.character === character.character
                              )[0].kage_data
                            }
                          />
                        )}
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
