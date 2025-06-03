import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-blue-950 text-white flex items-center justify-around fixed w-full bottom-0 z-10 h-12 font-bold max-[480px]:h-10'>
        <div className='max-[480px]:text-[16px] text-xl'>
            <span className='text-green-700'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-700'>Guard/&gt;</span>
        </div>
        <div className='max-[480px]:text-[10px] text-[13px] font-extralight'>
            <span>Designed & Developed by NamanKr</span>
        </div>
    </footer>
  )
}

export default Footer
