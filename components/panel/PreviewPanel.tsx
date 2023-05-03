"use client";
import { AppDispatch, RootState } from "@/store";
import { setIndex } from "@/store/generalSlicer";
import Image from "next/image";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function PreviewPanel() {
  const dispatch = useAppDispatch();
  const codedata = useAppSelector((state) => state.general.codeData);
  const selectedIndex = useAppSelector((state) => state.general.selectedIndex);

  const handleGlyphClick = (index: number) => {
    dispatch(setIndex(index + 1));
  };
  return (
    <div className="flex flex-col ">
      <h2>Preview Panel</h2>
      {/* <div>{selectedIndex}</div> */}
      <div className="border-2 border-black m-1 p-2">
        <h3>Glyph Images</h3>
        <div className="flex">
          <span
            className={
              0 === selectedIndex ? "border-r-2 border-black" : "" + " text-xl"
            }
            onClick={() => handleGlyphClick(-1)}
          >→</span>
          {codedata &&
            codedata.map((character, index) => (
              <span
                key={index}
                className={
                  index + 1 === selectedIndex ? "border-r-2 border-black" : ""
                }
                onClick={() => handleGlyphClick(index)}
              >
                <Image
                  src={character.glyphwiki_svg}
                  alt={character.character}
                  width={32}
                  height={32}
                />
              </span>
            ))}
        </div>
      </div>

      <div>
        <h3>Unicode Charaters</h3>
        <div className="border-2 border-black m-1 p-2 text-lg">
          {codedata &&
            codedata.map((character, index) => (
              <span key={index}>{character.character}</span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PreviewPanel;
