"use client "

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"

interface FileUploadProps{
    onChange : (url?: string)=>void;
    value :string;
    endpoint : "serverImage" | "messageFile"
}
export const FileUplaod = ({
onChange,
value,
endpoint

} : FileUploadProps) =>{
    
    //checking the type of the url
    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image
                fill
                src={value}
                alt="Upload"
                className="rounded-full" 
                />
                <button className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                onClick={() => onChange("")}>
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    return(
        <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            console.log("Upload response: ", res); // Log the entire response
            if (res && res.length > 0) {
              // Check if the response is valid and has fileUrl

              const fileUrl = res[0]?.url;
              if (fileUrl) {
                onChange(fileUrl);
              } else {
                console.error("fileUrl not found in the response");
              }
            } else {
              console.error("No response or empty response from UploadDropzone");
            }
          }}
        onUploadError={(error : Error)=> {
            console.log(error);
            
        }}
        />
    )
}