import { UserProps } from "../types/user"
import { RepoProps } from "../types/repo"

import Search from "../components/search/Search"
import User from "../components/user/User"
import Error from "../components/error/Error"

import { useState } from "react"

export default function Home() {
    const [user, setUser] = useState<UserProps | null>(null)
    const [topRepos, setTopRepos] = useState<RepoProps[]>([])
    const [error, setError] = useState(false)

    const loadUser = async (userName: string) => {
        setError(false)
        setUser(null)

        const response = await fetch(`https://api.github.com/users/${userName}`)
        const data = await response.json()

        if(response.status == 404) {
            setError(true)
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
    }

    const loadTopRepos = async () => {
        try {
          setTopRepos([])  
          const response = await fetch(`https://api.github.com/users/iagoPinheiro1401/repos`)
          const reposData: RepoProps[] = await response.json()
  
          const reposWithCommits = await Promise.all(
            reposData.map(async repo => {
              const commitsResponse = await fetch(`https://api.github.com/repos/iagoPinheiro1401/${repo.name}/commits`);
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
            <div>
                {topRepos.map(repo => (
                    <div key={repo.id}>
                    <p>Name: {repo.name}</p>
                    <p>URL: {repo.html_url}</p>
                    <p>Language: {repo.language}</p>
                    <p>Commits Count: {repo.commitsCount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}