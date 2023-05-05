import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
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
import { clearGlyphData } from "@/store/generalSlicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { callSetGlyphData } from "@/lib/generateGlyphData";
import { exportData, importGlyphData, importTextData } from "@/lib/files";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function Header() {
  const dispatch = useAppDispatch();
  const textData = useAppSelector((state) => state.general.textData);

  const handleClearGlyph = () => {
    dispatch(clearGlyphData());
  };

  return (
    <div className="flex flex-col">
      {/* <h1>glyph-text</h1> */}
      <AlertDialog>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={importTextData}>Open text data</MenubarItem>
              <MenubarItem onClick={importGlyphData}>
                Open glyph data
              </MenubarItem>
              <MenubarItem onClick={exportData}>Save glyph data</MenubarItem>
              <MenubarSeparator />
              <AlertDialogTrigger asChild>
                <MenubarItem>Close(clear)</MenubarItem>
              </AlertDialogTrigger>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Glyphs</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={callSetGlyphData}>
                Generate glyph data
              </MenubarItem>
              {/* <MenubarSeparator /> */}
              <AlertDialogTrigger asChild>
                <MenubarItem>Clear glyph data</MenubarItem>
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
            <AlertDialogAction onClick={handleClearGlyph}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Header;
