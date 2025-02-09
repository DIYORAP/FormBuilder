import React, { useState } from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { toast } from "./ui/use-toast";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn() {
    const { elements } = useDesigner();
    const [loading, setLoading] = useState(false);

    const updateFormContent = async () => {
        setLoading(true);
        try {
            const jsonElements = JSON.stringify(elements);
            console.log("Form data to save:", jsonElements);


            setTimeout(() => {
                toast({
                    title: "Success",
                    description: "Your form has been saved",
                });
                setLoading(false);
            }, 1000);
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    return (
        <Button
            variant={"outline"}
            className="gap-2"
            disabled={loading}
            onClick={updateFormContent}
        >
            <HiSaveAs className="h-4 w-4" />
            Save
            {loading && <FaSpinner className="animate-spin" />}
        </Button>
    );
}

export default SaveFormBtn;
