import { AppDispatch, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function TextPanel() {
  const dispatch = useAppDispatch();
  const textData = useAppSelector((state) => state.general.textData);
  

  return (
    <ScrollArea className="h-96">
      <article className="prose-xl">
        {textData &&
          textData.map((character) => {
            if (character.character === "\r" || character.character === "\n") {
              return <br key={character.index} />;
            } else {
              return <span key={character.index}>{character.character}</span>;
            }
          })}
      </article>
    </ScrollArea>
  );
}

export default TextPanel;
