// https://github.com/kurgm/kage-editor/blob/master/src/kage.ts
// author: kurgm

import { Kage, Polygons, KShotai } from "@kurgm/kage-engine";

export { KShotai };

const kage_ = new Kage();

export const getKage = (
  buhinMap: Map<string, string>,
  fallback?: (name: string) => string | undefined | void,
  shotai?: KShotai
): Kage => {
  kage_.kBuhin.search = (name) => {
    let result = buhinMap.get(name);
    if (typeof result === "undefined") {
      result = fallback?.(name) || "";
    }
    return result;
  };
  if (typeof shotai !== "undefined") {
    kage_.kShotai = shotai;
  }
  return kage_;
};
