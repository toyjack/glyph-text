import axios from "axios";
import { GlyphWikiGlyphResponse } from "./utils";
import { GlyphLine, parseGlyph } from "./kageUtils/glyph";

// genBushuMap
export async function genBushuMap(glyphName: string, bushinMap = new Map()) {
  const glyphData = await getGlyphWikiDataByGlyphName(glyphName);
  if (!glyphData) throw new Error(`Glyph ${glyphName} not found`);

  bushinMap.set(glyphName, glyphData);
  console.log(bushinMap);

  const glyphLines: GlyphLine[] = parseGlyph(glyphData);

  for (const glyphLine of glyphLines) {
    if (glyphLine.partName) {
      // await kageDecompose(glyphLine.partName, bushinMap)
      console.log(glyphLine.partName);
    }
  }

  return bushinMap;
}

export async function getGlyphWikiDataByGlyphName(name: string) {
  const res = await axios.get(`https://glyphwiki.org/api/glyph?name=${name}`)
  const data:GlyphWikiGlyphResponse = res.data
  return data.data
}


// const glyph = "99:0:0:0:0:200:200:u6d77-j";
//   const buhinMap = new Map();
  // buhinMap.set(
  //   "u6c35-01",
  //   "2:7:8:31:20:56:27:67:41$2:7:8:12:66:39:73:49:87$2:7:8:14:133:49:142:45:184$2:32:7:40:150:44:138:86:67"
  // );
  // buhinMap.set(
  //   "u6bce-02",
  //   "2:0:7:102:15:92:54:70:80$1:0:0:94:43:182:43$1:12:13:96:70:88:156$1:2:0:88:156:184:156$1:2:2:96:70:164:70$6:22:4:164:70:160:140:158:168:148:182$1:0:0:66:112:188:112$1:32:32:131:68:123:156"
  // );
  // buhinMap.set(
  //   "u6d77-j","99:0:0:3:0:148:200:u6c35-01$99:0:0:-9:0:200:200:u6bce-02")
    // const parsed:GlyphLine = parseGlyphLine(glyph);
    // const decomposed = decomposeDeep(parsed, buhinMap);

    // const gName = "u4e00"
    // const data = use(kageDecompose(gName));