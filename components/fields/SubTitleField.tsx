"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import useDesigner from "../hooks/useDesigner";
import { Input } from "../ui/input";
import { ChromePicker } from "react-color";
import { Label } from "../ui/label";
import { LuHeading2 } from "react-icons/lu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
    title: "SubTitle field",
    backgroundColor: ""
};

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
    backgroundColor: z.string(),
});

export const SubTitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading2,
        label: "SubTitle field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { title, backgroundColor } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full rounded-md" style={{ backgroundColor: backgroundColor || "#ffffff" }}>
            <Label className="text-muted-foreground">SubTitle field</Label>
            <p className="text-lg">{title}</p>
        </div>
    );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes;
    return <p className="text-lg">{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            title: element.extraAttributes.title,
            backgroundColor: element.extraAttributes.backgroundColor,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        const { title, backgroundColor } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title,
                backgroundColor,
            },
        });
    }

    const handleColorChange = (color) => {
        form.setValue("backgroundColor", color.hex);
        applyChanges({
            ...form.getValues(),
            backgroundColor: color.hex,
        });
    };

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="backgroundColor"
                    render={() => (
                        <FormItem>
                            <FormLabel>Background Color</FormLabel>
                            <FormControl>
                                <ChromePicker
                                    color={form.watch("backgroundColor") || "#ffffff"}
                                    onChangeComplete={handleColorChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}  
