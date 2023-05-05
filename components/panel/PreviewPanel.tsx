"use client";
import { AppDispatch, RootState } from "@/store";
import { setTextDataIndex } from "@/store/generalSlicer";
import Image from "next/image";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import clsx from "clsx";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function PreviewPanel() {
  const dispatch = useAppDispatch();
  const glyphData = useAppSelector((state) => state.general.glyphData);
  const textData = useAppSelector((state) => state.general.textData);
  const selectedTextDataIndex = useAppSelector(
    (state) => state.general.selectedTextDataIndex
  );

  const handleGlyphClick = (index: number) => {
    console.log(index);
    dispatch(setTextDataIndex(index + 1));
  };
  const getGlyphSvg = (char: string) => {
    const result = glyphData?.find((item) => item.character === char);
    return result?.glyphwiki_svg;
  };
  return (
    <div className="border-2 border-black m-1 p-2">
      <h3>Glyph Images</h3>
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
                  <span key={character.index} className="basis-full w-0"></span>
                );
              } else {
                return (
                  <span
                    key={character.index}
                    onClick={() => handleGlyphClick(character.index)}
                    className={clsx(
                      character.index + 1 === selectedTextDataIndex &&
                        "border-2 border-black"
                    )}
                  >
                    <Image
                      src={
                        getGlyphSvg(character.character) ||
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
        {/* <article className="prose">
          <span
            className={
              0 === selectedTextDataIndex
                ? "border-r-2 border-black"
                : "" + " text-xl"
            }
            onClick={() => handleGlyphClick(-1)}
          >
            →
          </span>
          {textData &&
            textData.map((character) => {
              if (
                character.character === "\r" ||
                character.character === "\n"
              ) {
                return <br key={character.index} />;
              } else {
                return (
                  <span
                    key={character.index}
                    className={
                      character.index + 1 === selectedTextDataIndex
                        ? "border-r-2 border-black"
                        : ""
                    }
                    onClick={() => handleGlyphClick(character.index)}
                  >
                    <Image
                      src={getGlyphSvg(character.character)}
                      alt={character.character}
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                  </span>
                );
              }
            })}
        </article> */}
      </ScrollArea>
    </div>
  );
}

export default PreviewPanel;
