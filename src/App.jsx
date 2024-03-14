import { useState, useCallback, useEffect, useRef } from 'react'

// import './App.css'

function App() {
  const [Length, setLength] = useState(6); 
  const [numberallowed, setnumberallowed] = useState(false);
  const [characterallowed, setcharacterallowed] = useState(false);
  const [password, setpassword] = useState("")

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "qwertyuiopzxcvbnmlkjhgfdsaQWERTYUIOPLKJHGFDSAZXCVBNM"

    if(numberallowed) str += "1234567890"
    if(characterallowed) str += "-=+?/\\|{}:\"<>;"

    for (let i=1; i <=Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  }, [Length, numberallowed, characterallowed, setpassword])

  // passwordgenerator();
  useEffect(() => {
    passwordgenerator()
  }, [Length, numberallowed, characterallowed, passwordgenerator])
  
  const passwordref = useRef(null)

  const copypaste = useCallback(() => {
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0, 10)
    navigator.clipboard.writeText(password)
  },[password]) 

  return (
    <>
      <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-900 '>
        <div className='text-2xl text-orange-500 mb-5'>Password Generator</div>
        <div className='flex shadow rounded-lg text-black overflow-hidden mb-4 text-2xl'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button onClick={copypaste} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={1}
              max={100}
              value={Length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='text-xl pr-3'>length: {<input type='number' value={Length} min={1} max={100} placeholder='password'onChange={(e) => {
              setLength(e.target.value)
            }}/>}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type='checkbox'
              defaultChecked={numberallowed}
              id='numberInput'
              onChange={() => {
                setnumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' className='text-xl pr-3'>Number Allowed</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type='checkbox'
              defaultChecked={characterallowed}
              id='charInput'
              onChange={() => {
                setcharacterallowed((prev) => !prev);
              }}
            />
            <label htmlFor='charInput' className='text-xl pr-3'>Character Allowed</label>
          </div>
        </div>
      </div>
      
    </>
  )
}


export default App
