import Head from 'next/head'
import TaskBoard from "../components/TaskBoard";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Serenade - TODO app</title>
            </Head>
            <main>
                <h1>Serenade - TODO app</h1>
                <TaskBoard />
            </main>
        </div>
    )
}
