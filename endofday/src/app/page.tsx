"use client";

import { useState } from "react";
import { VStack, Button, Text, Box } from "@chakra-ui/react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, teal.300, blue.500)"
    >
      <VStack
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Count: {count}
        </Text>
        <VStack>
          <Button colorScheme="teal" onClick={increment}>
            Increase
          </Button>
          <Button colorScheme="red" onClick={decrement}>
            Decrease
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
