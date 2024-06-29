"use client"
import React from 'react'
import { useToast } from "./ui/use-toast"
import { Button } from "./ui/button";
import { BookmarkPlus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

function AddToListBtn() {
    const { toast } = useToast();
    const { isLoaded, userId } = useAuth();
    const router = useRouter();

    const handleClick = () => {
        if (!isLoaded) return; // Ensure auth is loaded
        if (!userId) {
            // Redirect to sign-in page if the user is not logged in
            router.push("/sign-in");
        } else {
            // Show toast notification if the user is logged in
            toast({
                title: "Show Added to the List",
                description: "Explore your List by going on TV List on navbar",
            });
        }
    }

    return (
        <div>
            <Button
                variant={"outline"}
                className="mt-2 w-full gap-1 rounded-xl"
                type="submit"
                onClick={handleClick}
            >
                Add To List <BookmarkPlus />
            </Button>
        </div>
    )
}

export default AddToListBtn;
