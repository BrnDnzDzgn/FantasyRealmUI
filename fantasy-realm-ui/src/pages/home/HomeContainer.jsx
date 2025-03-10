import Home from "./Home"
import { Vortex } from "../../components/ui/vortex"

function HomeContainer() {

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
                <Vortex
                    backgroundColor="black"
                    rangeY={800}
                    particleCount={1500}
                    baseHue={300}
                    className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
                >
                    <Home/>

                </Vortex>
            </div>
        </>
    )
}

export default HomeContainer
