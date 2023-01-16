import { useState } from "react";

interface IAppFormProps {
    nameText: string;
    setNameText: React.Dispatch<React.SetStateAction<string>>;
}

const AppForm = (props: IAppFormProps) => {
    const [inputText, setInputText] = useState('');
    const { nameText, setNameText } = props;

    const save = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        alert(inputText);
    }

    return (
        <form onSubmit={save}>
            Quem é você?
            <input
                type="text"
                placeholder="Digite algo..."
                value={nameText}
                onChange={(evt) => setNameText(evt.currentTarget.value)} />
            <br />
            <br />

            Aqui é o form
            <br />
            <input
                name="desccription"
                type="text"
                placeholder="Digite algo..."
                required
                minLength={3}
                value={inputText}
                onChange={(evt) => setInputText(evt.currentTarget.value)} />
            <button>Ok</button>
            <br />
            <br />
        </form>
    );
}

export default AppForm;