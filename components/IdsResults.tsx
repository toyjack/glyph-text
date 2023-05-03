"use client";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useGetCharacterByIdsQuery } from "@/store/idsfindAPI";
import { ScrollArea } from "./ui/scroll-area";
import { AppDispatch, RootState } from "@/store";
import { setCharacter } from "@/store/generalSlicer";
import Image from "next/image";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function IdsResults() {
  const dispatch = useAppDispatch();
  const term = useAppSelector((state) => state.general.search);

  const { data, error, isLoading } = useGetCharacterByIdsQuery(term);

  const handleClick = (character: string) => {
    dispatch(setCharacter(character));
  };

  const uniq = (array: any[]) => {
    return Array.from(new Set(array));
  };

  const getGwName = (character: string) => {
    const codePoint = character.codePointAt(0);
    const gwName = `u${codePoint?.toString(16)}`;
    return gwName;
  };
    const svgUrl = (character: string) => {
      const svgUrl = `https://glyphwiki.org/glyph/${getGwName(character)}.svg`;
      return svgUrl;
    };
  return (
    <div className="flex flex-col h-full">
      <p>
        Searched Term:
        {term &&
          Array.from(term).map((character) => (
            <span
              className="px-1 hover:text-white hover:bg-black hover:cursor-pointer"
              onClick={() => handleClick(character)}
              key={character}
            >
              {character}
            </span>
          ))}
      </p>
      <p className="flex flex-wrap">
        Results:
        {isLoading && "Loading..."}
      </p>
      <ScrollArea className="h-full p-1">
        {data &&
          uniq(data).map((item) => (
            // <span
            //   key={item}
            //   className="px-1 hover:text-white hover:bg-black hover:cursor-pointer"
            //   onClick={() => handleClick(item)}
            // >
            //   {item}
            // </span>
            <div
              className="avatar border-transparent border-2  hover:cursor-pointer hover:border-primary"
              key={item}
              onClick={() => handleClick(item)}
            >
              <div className="w-8 rounded">
                <Image src={svgUrl(item)} alt={item} width={200} height={200} />
              </div>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
}

export default IdsResults;
