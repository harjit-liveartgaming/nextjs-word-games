
import clsx from 'clsx';

export class Tile {
  status: 'unsubmitted' | 'submitted' | 'correct-location' | 'correct-letter';
  letter: string

  constructor(status?: 'unsubmitted' | 'submitted' | 'correct-location' | 'correct-letter', letter?: string) {
    this.status = status || 'unsubmitted';
    this.letter = letter || "";
  }
}

export function TileComponent(props: { tile: Tile }) {

  const tileProps = props.tile;

  const className = clsx(
    `
            max-w-xs
            w-16 
            md:w-16 
            lg:w-128 
            h-16 
            md:h-16 
            lg:h-128 
            text-2xl 
            flex 
            font-bold 
            items-center 
            justify-center 
            border 
            border-gray-300 
            shadow-lg 
            rounded-lg 
            overflow-hidden
            rotate-[0deg]
        `,
    {
      'bg-white': tileProps.status === 'unsubmitted',
      'bg-yellow-400': tileProps.status === 'correct-letter',
      'bg-green-400': tileProps.status === 'correct-location',
      'bg-gray-400': tileProps.status === 'submitted'
    }
  );
  return (
    <div className={className}>
      {tileProps.letter}
    </div>
  )
}