import { SuperSEO } from "react-super-seo";

const SEOComponent = ({ page_name }) => {
    return (
        <SuperSEO
            title={page_name + " | Spandan 2023"}
            description="The annual intra-college sports fest of IIIT Bangalore"
            lang="en"
            openGraph={{
                ogImage: {
                    ogImage: "https://spandan.vercel.app/seo/ogspandan.png",
                    ogImageAlt: "Spandan IIITB 2023",
                    ogImageWidth: 1200,
                    ogImageHeight: 630,
                    ogImageType: "image/png",
                },
            }}
            twitter={{
                twitterSummaryCard: {
                    summaryCardImage: "https://spandan.vercel.app/seo/ogspandan.png",
                    summaryCardImageAlt: "Spandan '23",
                    summaryCardSiteUsername: "rithwiksai",
                },
            }}
        />
    )
}

export default SEOComponent;