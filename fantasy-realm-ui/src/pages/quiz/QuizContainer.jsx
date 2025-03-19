import Quiz from "./Quiz";
import { useState } from "react";
import { Vortex } from "../../components/ui/vortex"
import React from "react";
import { getRandomVortexProps } from "../../utils/getRandomVortexProps";

function QuizContainer() {
    const [vortexProps, setVortexProps] = useState(() => getRandomVortexProps());

    function handleRandomizeBackground() {
        setVortexProps(getRandomVortexProps());
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <Vortex {...vortexProps} className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <Quiz onCarouselNav={handleRandomizeBackground} />
            </Vortex>
        </div>
    );
}

export default QuizContainer;