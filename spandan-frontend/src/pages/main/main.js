import React, { useState } from 'react';
import { Grid, GridItem, Flex, Button, Link, Image } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from "react-router-dom";
import Signup from '../Signup';
const Main = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Grid
        h='100%'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={2} bg='yellow.50'>
          <VStack
            spacing={20}
            align='stretch'
            alignItems={"center"}
          >
            <Flex h='15vh'></Flex>
            <Button h='10vh' colorScheme='black' variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Alumni")}>
              Alumni
            </Button>
            <Button h='10vh' colorScheme='black' variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Student")}>
              Student
            </Button>
            <Button h='10vh' colorScheme='black' variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Staff")}>
              Staff
            </Button>
          </VStack>
        </GridItem>
        <GridItem
          rowSpan={3}
          colSpan={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {selectedButton === "Alumni" && <div> <Signup/> </div>}
          {selectedButton === "Student" && <div> <Signup/></div>}
          {selectedButton === "Staff" && <div> <Signup/></div>}
          {!selectedButton && (
            <Link as={ReactRouterLink} to="/" style={{ width: '100%', height: '100%' }}>
              <Image src={"Spandan_Logo_2024.jpg"} style={{ width: '100%', height: '100%' }} />
            </Link>
          )}
        </GridItem>
      </Grid>
    </div>
  )
}

export default Main;