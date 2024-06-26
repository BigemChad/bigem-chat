import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import { db } from "@/lib/db"
import { NavigationAction } from "./navigation-action";
export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile)
        return redirect("/")

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#0c1a0f] py-3">
            <NavigationAction />
        </div>
    )
}