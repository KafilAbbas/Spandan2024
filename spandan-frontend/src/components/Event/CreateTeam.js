import React from 'react';
import axios from '../../AxiosConfig';
import IIITBStudentData from '../IIITBSTudents.json'
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputLeftElement,
    Radio,
    RadioGroup,
    Stack,
    List,
    ListItem,
    Text,
    Flex,
    Spacer,
    InputGroup
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import sd from '../sportsData';
import * as Yup from 'yup';
import { SearchIcon } from '@chakra-ui/icons';
import { Navigate, useNavigate } from 'react-router-dom';

const users = IIITBStudentData;

// console.log(users[0]);

const CreateTeam = ({ sport_id }) => {
    let sport = sd();
    const [isSubmitting, setSubmitting] = useState(false)
    const sportsData = sport.find((sp) => sp.id === parseInt(sport_id));
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [caughtError, setcaughtError] = useState();
    const [error, setError] = useState(false)

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        // Filter users based on search query
        const filtered = users.filter(user =>
            `${user.name} ${user.rollNum}`.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [search, users]);

    const getValidationSchema = () => {
        return Yup.object().shape({
            teamName: Yup.string().required('Team name is required'),
            captainMobNo: Yup.string()
                .required("Captain's mobile number is required")
                .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number'),
            players: Yup.array()
                .min(sportsData.requirements.min_players, `Minimum ${sportsData.requirements.min_players} players are required`)
                .max(sportsData.requirements.max_players, `Maximum ${sportsData.requirements.max_players} players are allowed`)
                .test('has-females', `At least ${sportsData.requirements.min_female} female players are required`, (players) => {
                    const numFemales = players.reduce((count, player) => player.sex === 'female' ? count + 1 : count, 0);
                    return numFemales >= sportsData.requirements.min_female;
                })
                .test('max-females', `Maximum ${sportsData.requirements.max_female} female players are allowed`, (players) => {
                    const numFemales = players.reduce((count, player) => player.sex === 'female' ? count + 1 : count, 0);
                    return numFemales <= sportsData.requirements.max_female;
                }),
        });
    };

    const renderTeamPlayerGrid = (players, removePlayer, setFieldValue) => {
        return (
            <Grid
                templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                gap={6}
                mt={4}
            >
                {players.map((player, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="none">
                        <Flex direction={"row"}>
                            <Stack>
                                <Heading size="md">{player.name}</Heading>
                                <Box as="span" color="gray.600">
                                    {player.rollNum}
                                </Box>
                                <Box mt={4}>
                                    <RadioGroup
                                        name={`players.${index}.sex`}
                                        value={player.sex}
                                        onChange={(value) =>
                                            setFieldValue(`players.${index}.sex`, value)
                                        }
                                    >
                                        <Stack direction="row" spacing={8}>
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            </Stack>
                            <Spacer />
                            <Box mt={4}>
                                <Button
                                    onClick={() => removePlayer(index)}
                                    size="sm"
                                    rounded="none"
                                    bgColor={'red.500'}
                                    fontWeight="normal"
                                    color="white"
                                    _hover={{
                                        bgColor: "red.600"
                                    }}>
                                    Remove
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                ))}
            </Grid>
        );
    };

    const navigate = useNavigate();
    const handleSubmit = (values) => {
        setError(false)
        setcaughtError()
        const teamJson = {
            name: values.teamName,
            sports: sportsData.tag,
            members: values.players,
            team_size: values.players.length,
            phoneNum: values.captainMobNo,
        }
        axios
            .post('/team/', teamJson)
            .then((res) => {
                setSubmitting(true);
                window.location.reload(0)
            })
            .catch((error) => {
                setSubmitting(false);
                console.log(error.response)
                if (error.response.status === 401) {
                    console.log("User not authorized to access this endpoint");
                } else {
                    console.log("Error occurred:", error);
                    navigate('/profile');
                }
                setError(true);
                setcaughtError(error.response.data.error);
            })
        setSubmitting(false);
    }

    return (
        <Box>
            <Heading>Create Team</Heading>
            <Formik
                initialValues={{
                    teamName: '',
                    captainMobNo: '',
                    players: [],
                }}
                validationSchema={getValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Grid
                            templateColumns={['1fr', 'repeat(2, 1fr)']}
                            gap={{ base: 0, sm: 6 }}
                            mt={4}
                        >
                            <FormControl
                                id="teamName"
                                isInvalid={errors.teamName && touched.teamName}
                                mt={4}
                            >
                                <FormLabel fontFamily={'akshar'} fontSize={20}>Team Name</FormLabel>
                                <Input
                                    type="text"
                                    name="teamName"
                                    value={values.teamName}
                                    onChange={(e) => setFieldValue('teamName', e.target.value)}
                                    rounded="none"
                                    placeholder="Enter your team name here"
                                    _placeholder={{fontFamily:'akshar',color:'white',fontSize:'1.5rem'}}
                                />
                                <FormErrorMessage>{errors.teamName}</FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="captainMobNo"
                                isInvalid={errors.captainMobNo && touched.captainMobNo}
                                mt={4}
                            >
                                <FormLabel fontFamily={'akshar'} fontSize={20}>Captain's Mobile Number</FormLabel>
                                <Input
                                    type="text"
                                    name="captainMobNo"
                                    value={values.captainMobNo}
                                    onChange={(e) => setFieldValue('captainMobNo', e.target.value)}
                                    rounded="none"
                                    placeholder="9998777654"
                                    _placeholder={{fontFamily:'akshar',color:'white',fontSize:'1.5rem'}}
                                />
                                <FormErrorMessage>{errors.captainMobNo}</FormErrorMessage>
                            </FormControl>
                        </Grid>

                        <FormControl mt={4}>
                            <FormLabel fontFamily={'akshar'} fontSize={20}>Search for your teammates</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<SearchIcon color='gray.300' />}
                                />
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search by name or roll number"
                                    onChange={(e) => { handleSearchChange(e) }}
                                    rounded="none"
                                    _placeholder={{fontFamily:'akshar',color:'white',fontSize:'1.5rem'}}
                                />
                            </InputGroup>
                            <Box overflowY="auto">
                                {search.length > 2 && filteredUsers.length > 0 && (
                                    <List mt={4} border="1px" overflowY="scroll" maxH={"25vh"} pl={4} pr={4}>
                                        {filteredUsers.filter(user =>
                                            user.rollNum && !values.players.some(player => player.rollNum === user.rollNum)
                                        ).map((user) => (
                                            <ListItem key={user.rollNum}>
                                                <Box
                                                    p={2}
                                                    position="relative"
                                                    cursor="pointer"
                                                    _hover={{ bg: "white" ,color:'black'}}
                                                    onClick={() => {
                                                        setFieldValue('players', [
                                                            ...values.players,
                                                            { ...user, sex: 'male' },
                                                        ]);
                                                        setSearch("")
                                                    }}
                                                >
                                                    <Text fontWeight="normal">{user.name} - {user.rollNum}</Text>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Box>

                        </FormControl>

                        <FieldArray
                            name="players"
                            render={(arrayHelpers) =>
                                renderTeamPlayerGrid(
                                    values.players,
                                    (index) => arrayHelpers.remove(index),
                                    setFieldValue
                                )
                            }
                        />

                        {Object.keys(errors).length > 0 && (
                            <Box mt={4} color="red">
                                <ul>
                                    {Object.keys(errors).map((key) => (
                                        <li key={key}>{errors[key]}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}

                        <Button
                            type="submit"
                            colorScheme="pink"
                            mt={4}
                            mb={8}
                            rounded="none"
                            isLoading={isSubmitting}
                            isDisabled={
                                Object.keys(errors).length > 0 ||
                                values.players.length === 0
                            }
                            fontSize={'xl'}
                            size={'xl'}
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
            {error &&
                <>
                    {Object.entries(caughtError).map(([key, value]) => (
                        <Text key={key} color="red">
                            {key === "_all_"
                                ? value.map((errorMessage) => <div key={errorMessage}>{ }</div>)
                                : `${key}: ${value}`}
                        </Text>
                    ))}
                </>
            }
        </Box>
    )
};

export default CreateTeam;
