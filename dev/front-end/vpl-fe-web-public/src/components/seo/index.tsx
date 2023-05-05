import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
}

const SEO = ({ title, description, keywords }: SEOProps) => {
    return (
        <Helmet>
            <title>{title} | VPL</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            { /* Facebook tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            { /* Twitter tags */}   
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}

export default SEO;