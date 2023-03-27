import Head from 'next/head'
import ProjectBoard from "../components/ProjectBoard";

export default function Projects() {
    return (
        <div>
            <Head>
                <title>Serenade - TODO app</title>
            </Head>
            <main>
                <h1>Serenade - TODO app</h1>
                <ProjectBoard />
            </main>
        </div>
    )
}
