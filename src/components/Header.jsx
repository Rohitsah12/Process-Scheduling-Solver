import DarkModeToggler from "./DarkModeToggler";
import { Github } from "lucide-react";
function Header() {
    return (
        <div className="flex items-center justify-between w-full dark:text-white dark:bg-black h-[120px] p-5">
            <h1 className="w-3/4 text-4xl font-bold">Process Scheduling Solver</h1>
            <div className="flex items-center gap-x-5">
                <DarkModeToggler />
                <a href="https://github.com/Rohitsah12/Process-Scheduling-Solver" target="_blank" >
                    <Github className="text-black dark:text-white w-7 h-7" />
                </a>
            </div>
        </div>
    );
}

export default Header;
