import { Tile, TileComponent } from "@/app/wordle/components/tile";

export class TileRow {
  tiles: Array<Tile>;

  constructor(length: number) {
    this.tiles = new Array<Tile>();
    while (length > 0) {
      this.tiles.push(new Tile());
      length--;
    }
  }
}

export function TileRowComponent(props: { tiles: TileRow }) {

  const tRowProps = props.tiles;
  const className = `
                  z-[-1]
                  flex
                  items-center 
                  w-full 
                  p-2
                  `
  return (
    <>
      <div className={className}>
        <ul className="flex">
          {
            tRowProps.tiles.map((card, i) => <li key={i} className="p-1"> <TileComponent tile={card}></TileComponent></li>)
          }
        </ul>
      </div>
    </>
  )
}