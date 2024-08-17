import React,{useContext,useCallback} from 'react'
import { useDropzone} from 'react-dropzone';
import { AppContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
import UploadIcon from './UploadIcon'
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const Dropzone = () => {
    
    const {avatars,setAvatars} = useContext(AppContext)
    const toast = useToast()

    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length){
          setAvatars(prev => [...prev,...acceptedFiles.map(file => Object.assign(file,{id:uuidv4(),preview: URL.createObjectURL(file)}))])
        }
    }, []) 

    const {fileRejections,getRootProps, getInputProps, isDragActive,isDragReject} = useDropzone({
        onDrop,
        minSize:0,
        maxSize:50 * 1024 * 1024,
        maxFiles:6,
        multiple:true,
        accept:{'image/png': ['.png'],
                'image/jpeg': ['.jpg', '.jpeg'], }
    })

    const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
            return (
              <li key={file.path}>
                   {file.path} - {file.size} bytes
                   <ul>
                     {errors.map(e => <li key={e.code}>{e.message}</li>)}
                  </ul>
              </li>
            ) 
    });

    const handleRemoveWhenUpload = (e,id) => {
        e.preventDefault();
        const copyAvatars = [...avatars]
        const updateAvatars = copyAvatars.filter(avatar => avatar.id !== id)
        setAvatars(updateAvatars)
      }

    const handleRemoveWhenEdit = (e,id) => {
      e.preventDefault();
      console.log(id);
      const copyAvatar = [...avatars]
      const updateAvatars = copyAvatar.filter(avatar => avatar.publicId !== id)
      setAvatars(updateAvatars)

    }

      useEffect(()=>{
        if(fileRejections.length > 0){
            toast({
              title: 'Image Type.',
              description: "Product images only accept JPG or PNG formats",
              status: 'error',
              duration: 2000,
              isClosable: true,
              position:'top'
            })
        }

        if(fileRejections.length > 6){
          toast({
            title: 'Image Type.',
            description: "Product images can drag up to 6 images",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
      }
      },[fileRejections])


  return (
    <>
      
        {avatars.length < 6 &&
                <div {...getRootProps()} 
                    className={`border-2 border-dashed flex flex-col justify-center items-center min-h-[40vh] rounded-2xl 
                    ${isDragActive && !isDragReject ? 'border-green-500':isDragReject ? 'border-red-500':null}`}>
                
                    <input {...getInputProps()}/>
                    {isDragActive && 
                                    !isDragReject && <p className='font-bold text-3xl text-green-800'>"Drop it like it's hot!" 🥳</p>}

                    {!isDragActive && 
                                    <label htmlFor='upload' className='flex flex-col justify-center items-center gap-4'>
                                        <UploadIcon/>
                                        <p className='font-light text-gray-500 text-center'>Drag & Drop or <span className='text-blue-500 underline cursor-pointer'>Choose file</span> to upload</p>
                                        <p className='font-extralight text-sm text-gray-400 text-center'>JPG. or PNG Maximum file size 50MB</p>
                                    </label>}   

                    {isDragReject && 
                                    <p className='font-bold text-3xl text-red-800 text-center'> 😯 Sorry! Product images only accept JPG or PNG formats.</p>}
                </div>
        }
    
        <section className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-10'>
            {
            avatars[0]?.id ?
            avatars.map((file)=>{
                return (
                <div key={file.id} className='relative flex flex-col justify-center items-center w-32'>
                    <img src={file.preview} alt={file.name} className='w-32 h-32 rounded-2xl object-cover'/>
                    <button onClick={(e)=> handleRemoveWhenUpload(e,file.id)} className='absolute top-[-10px] right-[-10px] rounded-full bg-[#E04132] text-white w-8 h-8'>x</button>
                </div>)
            })
            :
            avatars.map((file)=>{
              return (
              <div key={file.publicId} className='relative flex flex-col justify-center items-center w-32'>
                  <img src={file.url} className='w-32 h-32 rounded-2xl object-cover'/>
                  <button onClick={(e)=> handleRemoveWhenEdit(e,file.publicId)} className='absolute top-[-10px] right-[-10px] rounded-full bg-[#E04132] text-white w-8 h-8'>x</button>
              </div>)
          })
          }
        </section>
    
        {fileRejectionItems.length > 0 && (
            <div className='text-red-500'>
            <h4>Rejected Files</h4>
            <ul>{fileRejectionItems}</ul>
            </div>
        )}    
    </>
  )
}

export default Dropzone