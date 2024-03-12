import React, { useState } from 'react';
import { Grid, GridItem, Flex, Button, Image, useMediaQuery } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink,useNavigate } from "react-router-dom";
import Signup from '../Signup';
import Staff_Signup from '../Staff_Signup';
import Alumni_Signup from '../Alumni_Signup';
import { MdArrowBack } from 'react-icons/md';
const Main = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const handleRefresh = () => {
    navigate('/');
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
          <GridItem rowSpan={isMobile ? 10 : 2} colSpan={isMobile ? 20 : 2}>
            <VStack
              spacing={20}
              align='stretch'
              alignItems="center"
            >
              <Flex h='10vh'></Flex>
              <Button colorScheme="white" bgColor='black' fontStyle='akshar' variant="outline" size="xl" onClick={handleRefresh}>
                <MdArrowBack/>
              </Button>
              <Button h='10vh' colorScheme='white' bgColor={'black'} variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Alumini")} borderRadius={0}>
                Alumini
              </Button>

              <Button h='10vh' colorScheme='white' bgColor={'black'} variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Student")}borderRadius={0}>
                Student
              </Button>
              {/* <Button h='10vh' colorScheme='white' bgColor={'black'} variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Staff")}borderRadius={0}>
                Staff
              </Button> */}
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
            <Flex justifyContent="center" alignItems="center" style={{ height: 'calc(100vh)' }}>
              <Image src={"Logo123.png"} style={{ width: 'auto', height: '80%' }} />
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
                {/* {selectedButton === "Staff" && <Staff_Signup />} */}
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
        {/* {isMobile && selectedButton === "Staff" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Staff_Signup />
          </GridItem>
        )} */}
      </Grid>
    </div>
  )
}

export default Main;