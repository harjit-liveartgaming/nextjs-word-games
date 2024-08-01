import { TileRow, TileRowComponent } from "./tile-row";

export function GameBoardComponent(props: { gameBoard: Array<TileRow>}) {
    return (
        <>
            <div className="overflow-auto">
                <div className='flex-content justify-left items-center flex'>
                    <ul>
                        {
                            props.gameBoard.map((card, i) => <li key={i}> <TileRowComponent tiles={card} /></li>)
                        }
                    </ul>
                </div>
            </div>
            
        </>
    )
}