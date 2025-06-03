import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [showPassword, SetshowPassword] = useState(false)
    const [form, setform] = useState({site:"",username:"",password:""})
    const [passwords, setpasswords] = useState([])
    const [showAll, setshowAll] = useState(false)
    
    const fetchData = async ()=>{
        let p = await fetch("http://localhost:3000/")
        let pp = await p.json()
        setpasswords(pp)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }

    const handleSave = async ()=>{
        if(form.site=="" || form.username=="" || form.password=="") return
        let temp = {...form, id: uuidv4()}
        console.log(temp)
        await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp)
        });
        setpasswords([...passwords, temp])
        setform({site:"",username:"",password:""})
        notify("Password Saved")
    }

    const handleDelete = async (id)=>{
        let c = confirm('Are you sure you want to delete this password?')
        if(!c) return
        await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });
        setpasswords(passwords.filter(item=>item.id!=id))
        notify('Password Deleted!')
    }

    const copyText = (text)=>{
        navigator.clipboard.writeText(text)
        notify('Copied to Clipboard!')
    }

    const handleEdit = async (id)=>{
        await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });
        let temp = passwords.filter(item=>item.id==id)[0]
        setform(temp)
        setpasswords(passwords.filter(item=>item.id!=id))
        notify('Edit & Remember to Save')
    }

    const notify = (e) => toast(e, {
                            position: "bottom-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });

    return (
        <>
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        <div className='md:w-4/5 max-w-[1000px] border-2 border-green-700 rounded-2xl mx-4 md:mx-auto max-[400px]:mx-2 my-10 py-5 px-10 max-[640px]:px-5 max-[400px]:px-2 flex flex-col items-center bg-blue-200 mb-16 max-[400px]:mt-5'>
            <div className='text-xl font-bold max-[400px]:text-[18px]'>
                <span className='text-green-700'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-700'>Guard/&gt;</span>
            </div>
            <div className='max-[400px]:text-[14px]'>Your own Password Manager</div>
            <div className='flex flex-col w-full gap-4 my-5'>
                <div>
                    <input className='w-full rounded-lg bg-white border-2 border-green-700 px-2 focus:outline-1 outline-green-900' type="text" placeholder='Website URL' name='site' value={form.site} onChange={handleChange}/>
                </div>
                <div className='flex gap-4 w-full justify-between max-[480px]:flex-col'>
                    <input className='w-full rounded-lg bg-white border-2 border-green-700 px-2 focus:outline-1 outline-green-900' type="text" placeholder='Username' name='username' value={form.username} onChange={handleChange}/>
                    <div className='w-full relative'>
                        <input className='w-full rounded-lg bg-white border-2 border-green-700 px-2 pr-7 focus:outline-1 outline-green-900' type={showPassword?"text":"password"} placeholder='Password' name='password' value={form.password} onChange={handleChange}/>
                        {showPassword ? <FaEye className='absolute right-2 top-[6px] cursor-pointer' onClick={()=>{SetshowPassword(!showPassword)}}/> : <FaEyeSlash className='absolute right-2 top-[6px] cursor-pointer' onClick={()=>{SetshowPassword(!showPassword)}}/>}
                    </div>
                </div>
                <div className='mx-auto'>
                    <button className='flex items-center gap-1 border-2 rounded-lg border-green-700 px-4 text-sm font-bold cursor-pointer bg-green-400 hover:bg-green-500' onClick={()=>{handleSave()}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#0a5c15"
                            style={{ width: "30px", height: "30px" }}>
                        </lord-icon>
                        <span>Save </span>
                    </button>
                </div>
            </div>
            <div className='w-full'>
                <div className='my-2 flex justify-between'>
                    <h2 className='text-lg font-bold'>Your Passwords</h2>
                    <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium'>Visibility</span>
                        {showAll ? <FaEye className='cursor-pointer' onClick={()=>{setshowAll(!showAll)}}/> : <FaEyeSlash className='cursor-pointer' onClick={()=>{setshowAll(!showAll)}}/>}
                    </div>
                </div>
                {passwords.length == 0 && <div className='text-sm font-medium text-center'>No Passwords Added Yet.</div>}
                {passwords.length != 0 && 
                <table className="table-fixed w-full  rounded-lg overflow-hidden my-3">
                    <thead className='max-[640px]:text-[14px] max-[480px]:text-[12px]'>
                        <tr className='bg-green-700 text-white'>
                        <th className='py-2 w-3/8'>Website</th>
                        <th className='py-2 w-1/4'>Username</th>
                        <th className='py-2 w-1/4'>Password</th>
                        <th className='py-2 w-1/8'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm max-[480px]:text-[10px] font-medium'>
                        {passwords.map((item)=>{
                            return <tr key={item.id}>
                            <td className='py-2 bg-green-200 px-2'>
                                <div className='flex gap-1 text-center w-full justify-center items-center'>
                                    <a className='overflow-hidden text-ellipsis inline-block max-w-[calc(100%-25px)]' href={item.site} target='_blank'>{item.site}</a>
                                    <lord-icon
                                        className="cursor-pointer"
                                        onClick={()=>{copyText(item.site)}}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                        style={{width:'16px',height:'16px'}}>
                                    </lord-icon>
                                </div>
                            </td>
                            <td className='py-2 text-center bg-green-200 px-2 overflow-hidden text-ellipsis'>
                                <div className='flex gap-1 text-center w-full justify-center items-center'>
                                    <span className='overflow-hidden text-ellipsis inline-block max-w-[calc(100%-25px)]'>{item.username}</span>
                                    <lord-icon
                                        className="cursor-pointer"
                                        onClick={()=>{copyText(item.username)}}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                        style={{width:'16px',height:'16px'}}>
                                    </lord-icon>
                                </div>
                            </td>
                            <td className='py-2 text-center bg-green-200 px-2 overflow-hidden text-ellipsis'>
                                <div className='flex gap-1 text-center w-full justify-center items-center'>
                                    <span className='overflow-hidden text-ellipsis inline-block max-w-[calc(100%-25px)]'>{showAll ? item.password : "*".repeat(item.password.length)}</span>
                                    <lord-icon
                                        className="cursor-pointer"
                                        onClick={()=>{copyText(item.password)}}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                        style={{width:'16px',height:'16px'}}>
                                    </lord-icon>
                                </div>
                            </td>
                            <td className='bg-green-200'>
                                <div className='flex gap-1 items-center justify-center'>
                                    <lord-icon
                                        className="cursor-pointer"
                                        onClick={()=>{handleDelete(item.id)}}
                                        src="https://cdn.lordicon.com/xyfswyxf.json"
                                        trigger="hover"
                                        style={{width:'20px',height:'20px'}}>
                                    </lord-icon>
                                    <lord-icon
                                        className="cursor-pointer"
                                        onClick={()=>{handleEdit(item.id)}}
                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                        trigger="hover"
                                        style={{width:'20px',height:'20px'}}>
                                    </lord-icon>
                                </div>
                            </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                }
            </div>
        </div>
        </>
    )
}

export default Manager
