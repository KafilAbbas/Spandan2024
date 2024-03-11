import React, { useState } from 'react';
import { Grid, GridItem, Flex, Button, Image, useMediaQuery } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from "react-router-dom";
import Signup from '../Signup';
import Staff_Signup from '../Staff_Signup';
import Alumni_Signup from '../Alumni_Signup';
const Main = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Grid
        h={isMobile && selectedButton ? '100%' : '100vh'} // Set height dynamically based on isMobile state and selected button
        templateRows={isMobile && selectedButton ? '1fr' : 'repeat(2, 1fr)'}
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        {!isMobile || !selectedButton ? (
          <GridItem rowSpan={isMobile ? 10 : 2} colSpan={isMobile ? 20 : 2} bg='yellow.50'>
            <VStack
              spacing={20}
              align='stretch'
              alignItems="center"
            >
              <Flex h='15vh'></Flex>
              <Button h='10vh' colorScheme='black' variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Alumini")}>
                Alumini
              </Button>
              <Button h='10vh' colorScheme='black' variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Student")}>
                Student
              </Button>
              <Button h='10vh' colorScheme='black' variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Staff")}>
                Staff
              </Button>
            </VStack>
          </GridItem>
        ) : null}
        {!isMobile && !selectedButton && (
          <GridItem
            rowSpan={1}
            colSpan={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Flex justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 10vh)' }}>
              <Image src={"Spandan_Logo_2024.jpg"} style={{ width: '50%', height: 'auto' }} />
            </Flex>
          </GridItem>
        )}
        {!isMobile && selectedButton && (
          <GridItem
            rowSpan={1}
            colSpan={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {selectedButton ? (
              <>
                {selectedButton === "Alumini" && <Alumni_Signup />}
                {selectedButton === "Student" && <Signup />}
                {selectedButton === "Staff" && <Staff_Signup />}
              </>
            ) : null}
          </GridItem>
        )}
        {isMobile && selectedButton === "Alumini" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Alumni_Signup />
          </GridItem>
        )}
        {isMobile && selectedButton === "Student" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Signup />
          </GridItem>
        )}
        {isMobile && selectedButton === "Staff" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Staff_Signup />
          </GridItem>
        )}
      </Grid>
    </div>
  )
}

export default Main;