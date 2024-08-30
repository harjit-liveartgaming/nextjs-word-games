export function SetUpForm(props: {
  room: string,
  setRoom: (e: React.FormEvent<HTMLInputElement>) => {},
  joinChallenge: () => {},
  selectedWord: string,
  setSelectedWord: (e: React.FormEvent<HTMLInputElement>) => {},
  maxAttempts: number,
  setMaxAttempts: (e: React.FormEvent<HTMLInputElement>) => {},
  initializeGame: () => {}
}) {
  return (
    <>
      <div className='w-full flex justify-center items-center p-2 '>
        <div><label className="p-2 text-right w-1/5">Enter a room name</label></div>
        <div><input className="p-2 border-2"
          type="text"
          value={props.room}
          onChange={props.setRoom}
          hint-text="AAAA"
        /></div>
      </div>
      <div className='w-full flex p-5 items-center justify-center text-center'>
        <button className="p-2 border-2 w-3/5"
          onClick={ props.joinChallenge}
        >
          Join
        </button>
      </div>
      <div className='w-full flex justify-center items-center p-2 '>
        <label className="p-2 text-center w-1/5">Enter a word</label>
        <input className="p-2 border-2"
          type="text"
          value={props.selectedWord}
          onChange={props.setSelectedWord}
        />
      </div>
      <div className='w-full flex justify-center items-center p-2 '>
        <label className="p-2 text-center w-1/5">Enter attempts</label>
        <input className="p-2 border-2"
          type="number"
          value={props.maxAttempts}
         onChange={props.setMaxAttempts}
        />
      </div>
      <div className='w-full flex p-5 items-center justify-center text-center'>
        <button className="p-2 border-2 w-3/5"
          onClick={props.initializeGame}
        >
          Start
        </button>
      </div>
    </>
  )

}