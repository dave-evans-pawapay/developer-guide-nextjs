
import React, {useContext, Dispatch, useEffect, useState} from "react";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
export default async function Platform(){
    const session = await getServerSession(authOptions)
    return (
        <>
            {session?.user.email && <div className="flex flex-row justify-end text-red-700 text-2xl">
                <div>Production</div>
            </div>
            }
            {!session?.user && <div className="flex flex-row justify-end text-red-700 text-2xl">
                <div>Sandbox</div>
            </div>
            }
        </>
    )
}
