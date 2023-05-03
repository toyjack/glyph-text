import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { AppDispatch, RootState } from "@/store";
import { clearCodeData, importCodeData } from "@/store/generalSlicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function Header() {
  const dispatch = useAppDispatch();
  const codedata = useAppSelector((state) => state.general.codeData);

  const importData = () => {
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
            dispatch(importCodeData(json));
          }
        };
        reader.readAsText(file);
      }
    });
    fileSelector.click();
  };

  const exportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(codedata));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleClear = () => {
    dispatch(clearCodeData());
  };

  return (
    <div className="flex flex-col">
      <h1>glyph-text</h1>
      <AlertDialog>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={importData}>Open(upload)</MenubarItem>
              <MenubarItem onClick={exportData}>Save(download)</MenubarItem>
              <MenubarSeparator />
              <AlertDialogTrigger asChild>
                <MenubarItem>Close(clear)</MenubarItem>
              </AlertDialogTrigger>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>About</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Help</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>About</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Header;
