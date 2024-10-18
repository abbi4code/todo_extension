import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'


export default function page() {
  return (
    <div className='mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black'>
        <h2 className='font-bold text-xl'>hi there</h2>
        <p>please provide details</p>
        <form action="">
            <div>
                <Label htmlFor='firstname'>First Name</Label>
                <Input placeholder='abhishek' id='firstname' type='text' name='firstname'/>
                <Label htmlFor='lastname'>Last Name</Label>
                <Input placeholder='abhishek' id='firstname' type='text' name='firstname'/>
            </div>
            <Label htmlFor='email'>Email</Label>
            <Input placeholder='abhishek@gmail.com' id='email' type='text' name='email' />
            <Label htmlFor='password'>Password</Label>
            <Input placeholder='*******' id='password' type='password' name='password'/>
            <Button className='w-full font-bold mt-4 text-lg'>Sign up &rarr;</Button>

            <p>Already have a account? <Link href="login">Login</Link></p>
        </form>

      
    </div>
  )
}
