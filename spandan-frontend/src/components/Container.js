import React from 'react'
import {
    useColorMode,
    Flex
} from '@chakra-ui/react'

import Navbar from "./Navbar"
import Footer from "./Footer";
import SEOComponent from './SEO';

const Container = ({ page_name, children }) => {
    return (
        <>
            <SEOComponent page_name={page_name} />
            <Navbar />
            <Flex
                as="main"
                align="center"
                justify={{ base: "center", md: "around" }}
                direction={{ base: "column-reverse", md: "row" }}
                wrap="no-wrap"
                minH="60vh"
                px={8}
                mb={8}
            >
                {children}
            </Flex>
            <Footer />
        </>
    );
};

export default Container;