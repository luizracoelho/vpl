import { useState } from "react";

interface IAppTextProps{
    nameText: string;
}

const AppText = ({ nameText }: IAppTextProps) => {
    const [isHelloWorld, setIsHelloWorld] = useState<boolean>(true);

    const toggleHelloWorld = () => {
        setIsHelloWorld(!isHelloWorld);
    }

    return (
        <>
            <p>
                Edit <code onClick={toggleHelloWorld}>src/App.tsx</code> and save to reload.
            </p>
            <p>{isHelloWorld ? `Hello ${nameText}!` : `Bye ${nameText}!`}</p>
        </>
    );
}

export default AppText;