import { Redirect } from "next";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { IntialModal } from "@/components/modals/initial-modal";

const SetupPage = async() => {

    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where : {
            members : {
                some : {
                    profileId : profile?.id
                }
            }
        }
    })

    if(server){
        return redirect(`/server/${server.id}`);
    }
    

    return <IntialModal />
}
 
export default SetupPage;  