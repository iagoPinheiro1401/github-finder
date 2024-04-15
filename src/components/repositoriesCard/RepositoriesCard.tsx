import { RepoProps } from "../../types/repo"

import moment from "moment"

export default function RepositoriesCard({ name, html_url, language, commitsCount, created_at, update_at }: RepoProps) {
    return(
        <div className="bg-blue-950 p-8 rounded-2xl flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-2xl">{name}</h1>
            <a className="text-blue-500 underline" href={html_url}>Link do repositório</a>
            <p>Linguagem mais utilizada: {language}</p>
            <p>Total de commits: {commitsCount}</p>
            <p>Data de criação: {moment(created_at).format('DD/MM/YYYY')}</p>
            <p>ùltima atualização: {moment(update_at).format('DD/MM/YYYY')}</p>
        </div>
    )
}