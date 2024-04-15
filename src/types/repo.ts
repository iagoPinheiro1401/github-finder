export type RepoProps = {
    name: string;
    html_url: string;
    language: string;
    id?: string;
    commitsCount: number;
    created_at: Date;
    update_at: Date;
}