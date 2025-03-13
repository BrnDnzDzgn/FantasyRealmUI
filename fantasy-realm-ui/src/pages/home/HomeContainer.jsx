import Home from "./Home"
import { useState } from "react";
import { Vortex } from "../../components/ui/vortex"
import React from "react";
import { getRandomVortexProps } from "../../utils/getRandomVortexProps";

function HomeContainer() {
    const [vortexProps, setVortexProps] = useState(() => getRandomVortexProps());

    function handleRandomizeBackground() {
        setVortexProps(getRandomVortexProps());
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <Vortex {...vortexProps} className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <Home onCarouselNav={handleRandomizeBackground} />
            </Vortex>
        </div>
    );
}

export default HomeContainer;