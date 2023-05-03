import { AppDispatch, RootState, store } from "@/store"
import { useGetGlyphDataQuery } from "@/store/glyphDataApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function CodePanel() {
  const dispatch = useAppDispatch();
  const codedata = useAppSelector((state) => state.general.codeData);

  return (
    <div className="flex flex-col w-full">
      <Label>Code Panel</Label>
      <div className="border-black border-2 m-1 p-2">

          <p className="break-words">{codedata && JSON.stringify(codedata)}</p>

      </div>
    </div>
  );
}

export default CodePanel