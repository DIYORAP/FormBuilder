// "use client";

// import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import useDesigner from "../hooks/useDesigner";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { LuHeading1 } from "react-icons/lu";

// const type: ElementsType = "TitleField";

// const extraAttributes = {
//     title: "Title field",
// };

// const propertiesSchema = z.object({
//     title: z.string().min(2).max(50),
// });

// export const TitleFieldFormElement: FormElement = {
//     type,
//     construct: (id: string) => ({
//         id,
//         type,
//         extraAttributes,
//     }),
//     designerBtnElement: {
//         icon: LuHeading1,
//         label: "Title field",
//     },
//     designerComponent: DesignerComponent,
//     formComponent: FormComponent,
//     propertiesComponent: PropertiesComponent,

//     validate: () => true,
// };

// type CustomInstance = FormElementInstance & {
//     extraAttributes: typeof extraAttributes;
// };

// function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
//     const element = elementInstance as CustomInstance;
//     const { title } = element.extraAttributes;
//     return (
//         <div className="flex flex-col gap-2 w-full">
//         <Label className="text-muted-foreground">Title field</Label>
//         <p className="text-xl">{title}</p>
//         </div>
//     );
// }

// function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
//     const element = elementInstance as CustomInstance;

//     const { title } = element.extraAttributes;
//     return <p className="text-xl">{title}</p>;
// }

// type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

// function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
//     const element = elementInstance as CustomInstance;
//     const { updateElement } = useDesigner();
//     const form = useForm<propertiesFormSchemaType>({
//         resolver: zodResolver(propertiesSchema),
//         mode: "onBlur",
//         defaultValues: {
//         title: element.extraAttributes.title,
//         },
//     });

//     useEffect(() => {
//         form.reset(element.extraAttributes);
//     }, [element, form]);

//     function applyChanges(values: propertiesFormSchemaType) {
//         const { title } = values;
//         updateElement(element.id, {
//         ...element,
//         extraAttributes: {
//             title,
//         },
//         });
//     }

//     return (
//         <Form {...form}>
//         <form
//             onBlur={form.handleSubmit(applyChanges)}
//             onSubmit={(e) => {
//             e.preventDefault();
//             }}
//             className="space-y-3"
//         >
//             <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//                 <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                     <Input
//                     {...field}
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") e.currentTarget.blur();
//                     }}
//                     />
//                 </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )}
//             />
//         </form>
//         </Form>
//     );
// }


"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChromePicker, ColorResult } from "react-color";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { LuHeading1 } from "react-icons/lu";

const type: ElementsType = "TitleField";

const extraAttributes = {
    title: "Title field",
    backgroundColor: "", // Default background color
};

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
    backgroundColor: z.string(), // Add backgroundColor to the schema
});

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: "Title field",
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
        <div className="flex flex-col gap-2 w-full rounded-md" style={{ backgroundColor }}>
            <Label className="text-muted-foreground">Title field</Label>
            <p className="text-xl">{title}</p>
        </div>
    );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { title, backgroundColor } = element.extraAttributes;
    return (
        <div style={{ backgroundColor }}>
            <p className="text-xl">{title}</p>
        </div>
    );
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
                backgroundColor, // Apply backgroundColor change
            },
        });
    }

    const handleColorChange = (color: ColorResult) => {
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

                {/* Background Color Picker */}
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

