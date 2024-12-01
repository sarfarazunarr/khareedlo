import Link from 'next/link'
import React from 'react'

function SectionHeader({title, linkText, link}: {title: string, linkText?: string, link?: string}) {
  return (
    <div className='flex justify-between items-center py-5'>
        <h1 className='font-semibold text-2xl text-black'>{title}</h1>
        {linkText && link && <Link href={link} className='text-primary-800 hover:underline hover:underline-offset-1'>{linkText}</Link>}
    </div>
  )
}

export default SectionHeader
