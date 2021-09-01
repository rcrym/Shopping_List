import { Box } from "@chakra-ui/react";

interface WrapperProps {
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = "regular",
}) => {
    return (
        <Box
            mt={8}
            mx="auto"
            // maxW={variant === "regular" ? "800px" : "400px"}
            w={variant === "regular" ? "60%" : "80%"}>
            {children}
        </Box>);
};