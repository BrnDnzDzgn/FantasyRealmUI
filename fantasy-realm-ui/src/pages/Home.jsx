import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Vortex } from "../components/ui/vortex";

function Home() {

    const form = useForm({
        defaultValues: {
            selections: {
                item1: "option1",
                item2: "option1",
                item3: "option1"
            }
        },
    })

    function onSubmit(values) {
        console.log("Form submitted with:", values)
    }

    const radioOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
    ];

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">

        <Vortex
            backgroundColor="black"
            rangeY={800}
            particleCount={500}
            baseHue={120}
            className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
        >
            <div className="p-10 bg-white shadow-md rounded-lg max-w-[800px] w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
                        <Carousel>
                            <CarouselContent>
                                {["item1", "item2", "item3"].map((itemId, index) => (
                                    <CarouselItem key={itemId}>
                                        <p className="text-center mb-4">
                                            Carousel Item {index + 1}
                                        </p>
                                        <FormField
                                            control={form.control}
                                            name={`selections.${itemId}`}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="flex flex-col items-start space-y-2"
                                                >
                                                    {radioOptions.map((option) => (
                                                        <div key={option.value} className="flex items-center space-x-2">
                                                            <RadioGroupItem value={option.value} id={`${itemId}-${option.value}`} />
                                                            <label htmlFor={`${itemId}-${option.value}`} className="text-sm">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            )}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
    
                        <Button type="submit">Start Adventure</Button>
                    </form>
                </Form>
            </div>
        </Vortex>


        </div>
    )
}

export default Home