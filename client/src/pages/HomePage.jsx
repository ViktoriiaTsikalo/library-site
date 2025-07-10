import { Directions } from "../components/Directions/Directions"
import { Hero } from "../components/Hero/Hero"
import { Librarian } from "../components/Librarian/Librarian"
import { Rules } from "../components/Rules/Rules"
import { Schedule } from "../components/Schedule/Schedule"
import { Services } from "../components/Services/Services"

export const HomePage = () => {
    return( <> 
    <Hero/>
    <Librarian/>
    <Directions/>
    <Schedule/>
    <Services/>
    <Rules/>
     </>)
}