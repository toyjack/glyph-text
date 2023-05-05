import { store } from "@/store";
import { setGlyphData, setTextData } from "@/store/generalSlicer";

const dispatch = store.dispatch;

export const importTextData = () => {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("accept", ".txt");
  fileSelector.addEventListener("change", (event) => {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        console.log(data);
        if (typeof data === "string") {
          // const json = JSON.parse(data);
          dispatch(setTextData(data));
        }
      };
      reader.readAsText(file);
    }
  });
  fileSelector.click();
};

export const importGlyphData = () => {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("accept", ".json");
  fileSelector.addEventListener("change", (event) => {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (typeof data === "string") {
          const json = JSON.parse(data);
          console.log(json);
          dispatch(setGlyphData(json));
        }
      };
      reader.readAsText(file);
    }
  });
  fileSelector.click();
};

export const exportData = () => {
  const glyphData = store.getState().general.glyphData;
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(glyphData));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};