
import Results from "./Results";
import { LampContainer } from "../../components/ui/lamp";

function ResultsContainer() {
    return (
        <LampContainer className="h-screen w-screen flex items-center justify-center relative">
            <Results />
        </LampContainer>
    );
}

export default ResultsContainer;