import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel"
import React from "react"

function Home() {

    return (
        <>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>Hellooooo</CarouselItem>
                    <CarouselItem>My name isss</CarouselItem>
                    <CarouselItem>
                        whateva
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </>
    )
}

export default Home