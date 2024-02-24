import React, { useState } from 'react';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Input,
    Text,
    Link,
    Image,
    useBreakpointValue
} from '@chakra-ui/react';
import Container from "../components/Container";
import sd from "../components/sportsData";
import { Link as ReactRouterLink } from 'react-router-dom';

function SearchBar({ onSearch }) {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <Box p={4} borderColor={"black"}>
            <Input placeholder="Search Sports" onChange={handleChange} />
        </Box>
    );
}

// Things to add
// Change box color for registered events

function SportsCard({ title, data }) {
    const [isOpen, setIsOpen] = useState(true);
    const shouldDisplay = useBreakpointValue({ base: false, sm: true });

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Box mt={8} minW="50vw">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
                <button onClick={toggleOpen}>{isOpen ? '-' : '+'} {title}</button>
            </Text>
            {isOpen &&
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']} gap={4}>
                    {data.map((sport) => (
                        <GridItem
                            key={sport.id}
                            borderWidth="2px"
                            borderRadius="0"
                            borderColor="black"
                            overflow="hidden"
                            _hover={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)", bgGradient: "linear(to-r, yellow, yellow)" }}
                        >
                            <Link to={`/events/${sport.id}`} as={ReactRouterLink}>
                                <Flex direction={{ base: "row", sm: "column" }} align="center">
                                    {sport.icon && (
                                        <Box display={['inline-block', 'none']} ml={2}>
                                            <Image src={sport.icon} boxSize="32px" objectFit="contain" />
                                        </Box>
                                    )}
                                    {shouldDisplay && sport.displayImage && (
                                        <Box display={['none', 'inline-block']} borderWidth="1px" borderRadius="0" borderColor="black" boxSize="225px" overflow="hidden">
                                            <Image src={sport.displayImage} boxSize="100%" objectFit="cover" />
                                        </Box>
                                    )}

                                    <Box p={4} ml={{ base: 4, sm: 0 }}>
                                        <Text fontWeight="normal" fontSize="md">
                                            {sport.name}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Link>
                        </GridItem>
                    ))}
                </Grid>
            }
        </Box >
    );
}



const Events = () => {

    const sportsData = sd();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter sports data based on search term
    const filteredData = sportsData.filter(
        (sport) =>
            sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sport.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container page_name="Events">
            <Box>
                <SearchBar onSearch={(term) => setSearchTerm(term)} />
                <SportsCard title="Major Sports" data={filteredData.filter((s) => s.type === 'major')} />
                <SportsCard title="Minor Sports" data={filteredData.filter((s) => s.type === 'minor')} />
            </Box>
        </Container>
    )
}

export default Events;

