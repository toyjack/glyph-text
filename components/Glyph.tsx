import { getGlyphWikiNameByCharacter } from '@/lib/utils'
import { Kage, Polygons } from '@kurgm/kage-engine'
import Image from 'next/image';


function Glyph({character, glyphData}:{character: string, glyphData: string}) {
  const kage = new Kage()
  const glyphName = getGlyphWikiNameByCharacter(character)
  kage.kBuhin.push(glyphName, glyphData);
  const polygons = new Polygons()
  kage.makeGlyph(polygons, glyphName)
  const image = polygons.generateSVG()
  return (
    <div>
      <Image src={`data:image/svg+xml;utf8,${image}`} alt={character} width={32} height={32} loading='lazy' />
    </div>
  );
}

export default Glyph