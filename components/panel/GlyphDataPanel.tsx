import { AppDispatch, RootState, store } from "@/store";
import { useGetGlyphDataQuery } from "@/store/glyphDataApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import Image from "next/image";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
function GlyphDataPanel() {
  const dispatch = useAppDispatch();
  const glyphData = useAppSelector((state) => state.general.glyphData);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Unicode</th>
            <th>漢字符号</th>
            <th>GlyphWkiグリフ名</th>
            <th>字形画像</th>
          </tr>
        </thead>
        <tbody>
          {glyphData &&
            glyphData.map((character, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{character.unicode}</td>
                <td>{character.character}</td>
                <td>{character.glyphwiki_name}</td>
                <td>
                  <Image
                    src={character.glyphwiki_svg}
                    alt={character.character}
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default GlyphDataPanel;
