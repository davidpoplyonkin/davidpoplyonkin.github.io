import React, { useMemo, useState } from "react";

import { Trie } from "./types/Trie";

interface AutocompleteProps {
    name: string,
    verbose: string,
    isLoading: boolean,
    suggestionsFlat: Array<string>
}

function AutocompleteField(
    { name, verbose, isLoading, suggestionsFlat }: AutocompleteProps
) {
    const [inputValue, setInputValue] = useState("");

    const trie = useMemo(() => {
        let t = new Trie();
        t.loadWords(suggestionsFlat);
        return t;
    }, [suggestionsFlat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // make the change visible
        trie.prefixNode = null // reset the prefix node
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
        case "ArrowLeft":
            setInputValue(trie.getSuggestion(inputValue, false))
            break;
        case "ArrowRight":
            setInputValue(trie.getSuggestion(inputValue, true))
            break;
        default:
            break;
        }
    };

    return (
        <div className="form-group m-3">
            <label htmlFor={name}>{verbose}</label>
            <input
                id={name}
                type="text"
                className="form-control"
                aria-describedby={`${name}Help`}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}/>

            { isLoading ? null :
                <small
                    id={`${name}Help`}
                    className="form-text text-muted">
                        Use left/right arrow to autocomplete.
                </small>
            }
        </div>
    )
}

export default AutocompleteField;