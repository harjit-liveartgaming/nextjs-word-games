export function InputFieldComponent(props: { label: string, inputType: 'text' | 'number', onSubmit: () => {}, onChange: (e: React.FormEvent<HTMLInputElement>) => {}, value: string | number }) {
  return (
    <div className="h-full">
      <div className='justify-center items-center flex w-full'>


        <label className="p-2 text-align-center ">{props.label}</label>
        <input className="p-2 w-2/5 border-2" type={props.inputType} value={props.value}
          onChange={(e: React.FormEvent<HTMLInputElement>) => { props.onChange(e) }}>

        </input>
        <button className="p-2 w-1/5 border-2"
          onClick={() => { props.onSubmit() }}>Next</button>
      </div>
    </div>
  )
}