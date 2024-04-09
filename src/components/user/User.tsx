import { UserProps } from "../../types/user"

import { MdLocationPin } from "react-icons/md"

import { Link } from "react-router-dom"

export default function User({ login, avatar_url, followers, following, location }: UserProps) {
    return(
        <div className="bg-blue-950 p-8 rounded-2xl flex flex-col items-center justify-center gap-4">
            <img 
                src={avatar_url} 
                alt={login}
                className="w-36 h-36 border-4 border-purple-700 rounded-full"
            />
            <h2>{login}</h2>
            {location && (
                <p className="flex justify-center items-center gap-1">
                    <MdLocationPin className="fill-green-300 size-6"/>
                    <span className="text-blue-300 font-bold">{location}</span>
                </p>
            )}
            <div className="flex ">
                <div className="flex flex-col px-4 border-r border-e-blue-300 gap-2">
                    <p>Seguidores:</p>
                    <p className="bg-green-300 px-2 py-1 rounded">{followers}</p>
                </div>
                <div className="flex flex-col px-4 gap-2">
                    <p>Seguindo:</p>
                    <p className="bg-green-300 px-2 py-1 rounded">{following}</p>
                </div>
            </div>
            <Link className="p-4 bg-purple-700 rounded-md text-center opacity-80 hover:opacity-100 transition-all duration-300" to={`/repos/${login}`}>Ver melhores projetos</Link>
        </div>
    )
}