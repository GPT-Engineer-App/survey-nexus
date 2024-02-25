import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Select, Divider, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });
  const [surveys, setSurveys] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Ideally, here you would send data to the server for registration
    setIsRegistered(true);
    toast({
      title: "Account created.",
      description: "You've successfully signed up. Please log in to continue.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Ideally, here you would validate login with the server
    setIsLoggedIn(true);
    // Fetch surveys based on demographic (mocked for this example)
    fetchSurveysBasedOnDemographic(user);
  };

  // Mock function to get surveys based on demographic
  const fetchSurveysBasedOnDemographic = (demographic) => {
    // Fetch and set surveys based on demographic data
    // This is a placeholder, replace with actual API call logic
    setSurveys([
      { id: 1, title: "Technology Survey", reward: "$5" },
      { id: 2, title: "Health & Wellness Survey", reward: "$3" },
      // ... other surveys
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box p={8}>
      <Heading mb={6}>SurveyApp</Heading>
      {!isLoggedIn ? (
        <Stack spacing={4}>
          {!isRegistered ? (
            <>
              <Heading size="md">Sign Up</Heading>
              <Divider />
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="John Doe" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input name="age" placeholder="30" type="number" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" placeholder="Select gender" onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl id="country" isRequired>
                <FormLabel>Country</FormLabel>
                <Input name="country" placeholder="USA" onChange={handleInputChange} />
              </FormControl>
              <Button leftIcon={<FaUserPlus />} colorScheme="blue" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Heading size="md">Login</Heading>
              <Divider />
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="John Doe" onChange={handleInputChange} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
                Log In
              </Button>
            </>
          )}
        </Stack>
      ) : (
        <Box>
          <Heading size="md">Available Surveys</Heading>
          <Divider my={4} />
          {surveys.length ? (
            <Stack spacing={3}>
              {surveys.map((survey) => (
                <Box p={5} shadow="md" borderWidth="1px" key={survey.id}>
                  <Text fontSize="lg">{survey.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {survey.reward}
                  </Text>
                  <Button mt={3} colorScheme="green">
                    Take Survey
                  </Button>
                </Box>
              ))}
            </Stack>
          ) : (
            <Text>No surveys available at the moment.</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Index;
