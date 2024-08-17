import React from 'react'
import { useEffect,useContext,useState } from 'react'
import { useDisclosure } from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from "@chakra-ui/react";
  import { AppContext } from '../App';

const ProductConfirmation = ({handleSubmit,handleUpdate,handleDelete}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {isSubmit,setIsSubmit,isUpdate,setIsUpdate,isDelete,setIsDelete} = useContext(AppContext)
    const cancelRef = React.useRef()
    const [message,setMessage] = useState({})

    useEffect(()=>{ 
        if(isSubmit){
            onOpen()
            setMessage({
                header:'Upload Product Confirmation',
                description:'Are you sure you want to proceed ?',
                cancel:'Cancel',
                corect:'Confirm!'
            })
        }else if(isUpdate){
            onOpen()
            setMessage({
                header:'Update Product Confirmation',
                description:'Are you sure you want to proceed ?',
                cancel:'Cancel',
                corect:'Confirm!'
            })
        }else if(isDelete){
            onOpen()
            setMessage({
                header:'Delete Product Confirmation',
                description:'Are you sure you want to proceed ?',
                cancel:'Cancel',
                corect:'Confirm!'
            })
        }else{
            onClose()
        }
    },[isSubmit,isUpdate,isDelete])
    
    const handleCancel = () => {
        const closeAndReset = () => {
            onClose();
            setIsSubmit(false);
            setIsUpdate(false);
            setIsDelete(false);
        };
    
        closeAndReset();
      }


    return (
        <>
             <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>

                <AlertDialogOverlay>
                    <AlertDialogContent>

                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {message.header} 
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {message.description}
                        </AlertDialogBody>

                        <AlertDialogFooter className={`flex gap-5`}>
                            <button className='p-2 rounded-xl bg-gray-200 text-black outline-none' type='button' ref={cancelRef} onClick={handleCancel}>
                                {message.cancel}
                            </button>
                            <button className='p-2 rounded-xl bg-orange-700 text-white' type='button' onClick={isUpdate? handleUpdate :isSubmit? handleSubmit:isDelete ? handleDelete:null} ml={3}>
                                {message.corect}
                            </button>
                        </AlertDialogFooter>

                    </AlertDialogContent>
                </AlertDialogOverlay>

            </AlertDialog>
        </>
    )
}

export default ProductConfirmation