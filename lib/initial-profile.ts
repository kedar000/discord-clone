import { currentUser , redirectToSignIn } from "@clerk/nextjs/server";

import { db } from "@/lib/db"
import { ArrowDownAzIcon } from "lucide-react";
import { Profile } from "@prisma/client";

export const initialProfile = async(): Promise< Profile| null> =>{
    const user = await currentUser();

    if(!user){
        return null;
    }

    const profile = await db.profile.findUnique({
        where :{
            userId : user.id
        }
    })

    if(profile){
        return profile;
    }

    const newProfile = await db.profile.create({
        data : {
            userId : user.id,
            name : `${user.firstName} + ${user.lastName}`,
            imageUrl : user.imageUrl,
            email : user.emailAddresses[0].emailAddress
        }
    });

    return newProfile


}