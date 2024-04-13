import { UserProps } from "../types/user"
import { RepoProps } from "../types/repo"

import Search from "../components/search/Search"
import User from "../components/user/User"
import Error from "../components/error/Error"
import RepositoriesCard from "../components/repositoriesCard/RepositoriesCard"

import { useState } from "react"

export default function Home() {
    const [user, setUser] = useState<UserProps | null>(null)
    const [topRepos, setTopRepos] = useState<RepoProps[]>([])
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [apiFullError, setApiFullError] = useState(false)

    const loadUser = async (userName: string) => {
        setError(false)
        setUser(null)
        setName('')
        setTopRepos([])

        const response = await fetch(`https://api.github.com/users/${userName}`)
        const data = await response.json()

        if(response.status == 404) {
            setError(true)
            return
        }

        if (response.status == 403) {
            setApiFullError(true)
            return
        }

        const { avatar_url, login, location, followers, following } = data
        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following,
        }
        setUser(userData)
        setName(userName)
    }

    const loadTopRepos = async () => {
        try {
          setTopRepos([])  
          const response = await fetch(`https://api.github.com/users/${name}/repos`)
          const reposData: RepoProps[] = await response.json()
  
          const reposWithCommits = await Promise.all(
            reposData.map(async repo => {
              const commitsResponse = await fetch(`https://api.github.com/repos/${name}/${repo.name}/commits`);
              const commitsData = await commitsResponse.json();
              return { ...repo, commitsCount: commitsData.length };
            })
          )
  
          reposWithCommits.sort((a, b) => b.commitsCount - a.commitsCount)
  
          const topThreeRepos = reposWithCommits.slice(0, 3)
  
          setTopRepos(topThreeRepos)
        } catch (error) {
          console.error('Erro ao carregar repositórios:', error)
        }
    }

    return (
        <div>
            <Search loadUser={loadUser}/>
            {user &&
                <User 
                    {...user} 
                    onClick={loadTopRepos}
                />}
            {error && <Error/>  }
            {apiFullError && <p className=" text-red-600"> 🥺  Limite de requisições da API atingido, tente novamente mais tarde</p>}
            <div className="flex flex-col gap-5 mt-5">
                {topRepos.map(repo => (
                    <RepositoriesCard
                        key={repo.id}
                        name={repo.name}
                        html_url={repo.html_url}
                        language={repo.language}
                        commitsCount={repo.commitsCount}
                    />
                ))}
            </div>
        </div>
    )
}