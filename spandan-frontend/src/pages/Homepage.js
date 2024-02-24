import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Button, Image, Text, useMediaQuery, Link } from "@chakra-ui/react";
import axios from '../AxiosConfig';

import Container from '../components/Container'
import TV from "../components/OldTV";

const images = [
    "/sports-assets/cricket.png",
    "/sports-assets/football.png",
    "/sports-assets/volleyball.png",
    "/sports-assets/basketball.png",
];

const ButtonWithImage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % images.length);
        }, 175);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/main">
            <Button variant="custom"
                as={motion.button}
                whileTap={{ scale: 0.9 }}
                color={"gray.800"}
                fontFamily="heading"
                fontSize={"25"}
                fontWeight={'medium'}
            >
                <Flex align="center">
                    <Image src={images[currentImageIndex]} boxSize="18px" objectFit="contain" mr={4} />
                    <Text fontSize={"25px"}>Register Now!</Text>
                </Flex>
            </Button >
        </Link>
    );
};


const Homepage = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const imageList = [
        "/sports-assets/cricket.png",
        "/sports-assets/football.png",
        "/sports-assets/volleyball.png",
        "/sports-assets/basketball.png",
    ];

    return (
        <Container direction={{ base: "column", lg: "row" }} page_name="Home">
            <Flex
                flexDirection={isLargerThanLg ? "row" : "column"}
                justifyContent={isLargerThanLg ? "center" : "center"}
                align="center"
            >
                <Box
                    mr={isLargerThanLg ? 8 : 0}
                    mb={isLargerThanLg ? 0 : 4}
                    align="center"
                >
                    <Flex justifyContent="center" mb="8" flexDirection={{ base: "column", md: "row" }} flexWrap="wrap">
                        <Image src={'Spandan_Logo_B.svg'} w="150px" h="150px" mx={{ base: "auto", md: "0" }} mr={{ md: "2" }} p={4} alt="Logo" />
                        <Box>
                            <Heading as="h1" size="2xl" textAlign="center" fontSize={'8vh'} mt={4}>
                                SPANDAN
                            </Heading>
                            <Text textAlign="center" fontSize="2xl" mt="2">
                                17th to 19th March 2023
                            </Text>
                        </Box>
                    </Flex>
                    <ButtonWithImage />
                </Box>
                {/* <Box mt={{ base: "8vh", md: "6vh", lg: "0" }} ml={"10vw"} />
                <TV /> */}
                {isLargerThanLg && <Box ml={"10vw"} />}
                {isLargerThanLg && <TV />}
            </Flex>
        </Container >
    );
}

export default Homepage;
