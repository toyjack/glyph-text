import { exportData, importGlyphData, importTextData } from "@/lib/files";
import { callSetGlyphData } from "@/lib/generateGlyphData";
import { AppDispatch, RootState } from "@/store";
import clsx from "clsx";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function StepPanel() {
  const stepState = useAppSelector((state) => state.general.stepState);
  
  return (
    <div className="w-full md:py-4 md:my-4">
      <ul className="steps">
        <li className={clsx("step", stepState.step1 && "step-neutral")}>
          <button
            className="hover:underline hover:cursor-pointer"
            onClick={importTextData}
          >
            Open text file
          </button>
        </li>
        <li className={clsx("step", stepState.step2 && "step-neutral")}>
          <div className="flex">
            <span
              className="hover:underline hover:cursor-pointer"
              onClick={callSetGlyphData}
            >
              Generate
            </span>{" "}
            &nbsp;/&nbsp;
            <span
              className="hover:underline hover:cursor-pointer"
              onClick={importGlyphData}
            >
              Open
            </span>
            &nbsp;glyph file
          </div>
        </li>
        <li className={clsx("step", stepState.step3 && "step-neutral")}>
          Preview
        </li>
        <li className={clsx("step", stepState.step4 && "step-neutral")}>
          <span
            className="hover:underline hover:cursor-pointer"
            onClick={importGlyphData}
          >
            Save
          </span>
        </li>
      </ul>
    </div>
  );
}

export default StepPanel;
