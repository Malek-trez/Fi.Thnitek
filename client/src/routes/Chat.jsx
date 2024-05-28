import ChatHome from "../components/Chat/ChatHome.jsx";
import theme from "../components/Chat/theme.js";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { ChakraProvider } from "@chakra-ui/react";
const Chat = () => {

    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <ChatHome/>
            </ChakraProvider>
        </>
    );
}

export default Chat;