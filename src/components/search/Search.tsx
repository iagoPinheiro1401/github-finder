type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
}

import { useState, KeyboardEvent } from "react";

import { BsSearch } from "react-icons/bs"

export default function Search({loadUser}: SearchProps) {
    const [userName, setUserName] = useState("")

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            loadUser(userName)
        }
    }

    return(
        <div className="bg-blue-950 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl font-semibold">Busque por um usuário:</h2>
            <p className="text-gray-400">Conheça seus melhores repositórios</p>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Digite o nome do usuário"
                    onChange={(e) => setUserName(e.target.value)}
                    className="p-1.5 rounded-md border-none text-blue-900"
                    onKeyDown={handleKeyDown}
                />
                <button 
                    onClick={() => loadUser(userName)}
                    className="p-1.5 rounded-md border-none text-blue-900 bg-black/70 cursor-pointer"
                >
                    <BsSearch />
                </button>
            </div>
        </div>
    )
}