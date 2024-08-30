"use client "

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
    return<div>
        file upload component 
    </div>
}