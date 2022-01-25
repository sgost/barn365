import React from "react";
import { FormControl, Heading, Input, Button, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider } from "native-base";

const Login = () => {
    return <Box alignItems="center">
        <Box w="90%" maxWidth="300px">
            <FormControl isRequired>
                <Stack mb="2.5" mt="1.5" direction={{
                    base: "column",
                    md: "row"
                }} space={2} mx={{
                    base: "auto",
                    md: "0"
                }}>
                    <Heading size="md">Login</Heading>
                </Stack>
                <Stack mx="4">
                    <FormControl.Label>User Name</FormControl.Label>
                    <Input type="text" placeholder="Username" />
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" placeholder="password" />
                    <FormControl.HelperText>
                        Must be atleast 6 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 6 characters are required.
                    </FormControl.ErrorMessage>
                </Stack>
                <Stack mb="2.5" mt="1.5" direction={{
                    base: "column",
                    md: "row"
                }} space={2} mx={{
                    base: "auto",
                    md: "0"
                }}>
                    <Button size="sm" variant="outline">
                        Login
                    </Button>

                </Stack>
            </FormControl>
        </Box>
    </Box>;
};

export default Login;