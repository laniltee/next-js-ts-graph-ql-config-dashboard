import 'antd/dist/antd.dark.css'
import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Layout from '../components/layout'

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp