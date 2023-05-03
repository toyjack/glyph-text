import { AppDispatch, RootState } from "@/store";
import { useGetRelatedGlyphsByCodeQuery } from "@/store/glyphfindAPI";
import Image from "next/image";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "./ui/scroll-area";
import { setGlyphName,addCharacter, setGlyphWikiData } from "@/store/generalSlicer";
import { useGetGlyphDataQuery } from "@/store/glyphDataApi";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function IdsGlyphs() {
  const dispatch = useAppDispatch();
  const characterOfGlyphs = useAppSelector(
    (state) => state.general.selctedCharacter
  );

  const getGwName = (character: string) => {
    const codePoint = character.codePointAt(0);
    const gwName = `${codePoint?.toString(16)}`;
    return gwName;
  };

  const { data, error, isLoading } = useGetRelatedGlyphsByCodeQuery(
    getGwName(characterOfGlyphs)
  );

  
  const {data:gwData, error:gwError,}= useGetGlyphDataQuery("u"+getGwName(characterOfGlyphs))

  const handleClick = (glyphName: string) => {
    if (glyphName.includes("=")) {
      glyphName = glyphName.split("=")[0].trim();
    }
    dispatch(setGlyphName(glyphName));
    if (gwData){
      dispatch(setGlyphWikiData(gwData));
      dispatch(addCharacter());
    }
  };

  const svgUrl = (glyphName: string) => {
    if (glyphName.includes("=")) {
      glyphName = glyphName.split("=")[0].trim();
    }
    const svgUrl = `https://glyphwiki.org/glyph/${glyphName}.svg`;
    return svgUrl;
  };

  return (
    <div className="h-full py-2">
      <p>Selected Character: {characterOfGlyphs}</p>
      {/* <p>
        Glyph Count:{" "}
        {data && data.related_glyphs && data.related_glyphs?.split(",").length}
      </p> */}
      <p className="gap-1 h-full">
        {isLoading && "Loading..."}
        {error && "Error"}
        <ScrollArea className="h-full">
          {data &&
            data.related_glyphs?.split(",").map((glyph) => (
              <div
                className="avatar border-transparent border-2  hover:cursor-pointer hover:border-primary"
                key={glyph}
                onClick={() => handleClick(glyph)}
              >
                <div className="w-12 rounded">
                  <Image
                    src={svgUrl(glyph)}
                    alt={glyph}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            ))}
        </ScrollArea>
      </p>
    </div>
  );
}

export default IdsGlyphs;
