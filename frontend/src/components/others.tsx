export function ErrorMsg({ errorMsg, setErrorMsg }: {
  errorMsg: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
}) {
  return <div className="p-4 mb-4 flex items-center justify-between text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span>{errorMsg}</span>
    <button 
      onClick={() => { setErrorMsg('') }}
      className="p-1 rounded-full hover:bg-red-100">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
}