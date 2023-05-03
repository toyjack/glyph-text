"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState, store } from "@/store";
import { setIdsSearchTerm } from "@/store/generalSlicer";

export const useAppDispatch : () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function IdsSearchInput() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.general.search);

  const clearTerm = () => {
    dispatch(setIdsSearchTerm(""));
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="term">Term</Label>
      <Input
        type="text"
        id="term"
        value={search}
        onChange={(e) => dispatch(setIdsSearchTerm(e.target.value))}
      />
      <p className="text-sm text-muted-foreground">
        Input components and remain stroke-count of a Chinese character.
      </p>
      <div className="flex w-full gap-4 items-center justify-end">
        <Button type="submit" className="w-1/3" onClick={clearTerm}>
          Clear
        </Button>
        <Button type="submit" className="w-1/3" >
          Search
        </Button>
      </div>
    </div>
  );
}

export default IdsSearchInput