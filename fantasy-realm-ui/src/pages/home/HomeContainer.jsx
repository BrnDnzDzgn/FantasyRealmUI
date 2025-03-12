import Home from "./Home"
import { Vortex } from "../../components/ui/vortex"

function HomeContainer() {
    const backgrounds = [
        (props) => <Vortex {...props} rangeY={800} particleCount={1500} baseHue={300} />,
        (props) => <Vortex {...props} rangeY={600} particleCount={1000} baseHue={900} />,
        (props) => <Vortex {...props} rangeY={900} particleCount={1000} baseHue={100} />,
    ];

    const lastIndex = parseInt(localStorage.getItem("backgroundIndex")) || 0; // Get last used index from localStorage
    const nextIndex = (lastIndex + 1) % backgrounds.length; // Calculate next index (looping when reaching the end)
    localStorage.setItem("backgroundIndex", nextIndex); // Store new index in localStorage
    const SelectedBackground = backgrounds[nextIndex]; // Select the background component based on the index

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <SelectedBackground className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <Home />
            </SelectedBackground>
        </div>
    );
}

export default HomeContainer;