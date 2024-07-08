"use client"

import { convertFileToUrl } from "@/lib/utils"
import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface FileUploaderProps {
    files: File[]
    onChange: (files: File[]) => void
}

export const FileUploader = ({ files, onChange }: FileUploaderProps ) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div 
            {...getRootProps()}
            className="file-upload"
        >
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image 
                    src={convertFileToUrl(files[0])}
                    height={1000}
                    width={1000}
                    alt="File uploaded"
                    className="max-h-[400px] overflow-hidden object-cover"
                />
            ) : (
                <>
                <Image 
                    src={"/assets/icons/upload.svg"}
                    width={1000}
                    height={1000}
                    alt="Upload icon"
                    className="w-12 h-12"
                />
                </>
            )}
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    )
}