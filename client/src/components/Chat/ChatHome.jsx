import { Box, Grid, GridItem, Tabs, CSSReset, ColorModeScript, Flex } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../../contexts/AccountContext.jsx";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import useSocketSetup from "./useSocketSetup";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../components/Chat/theme.js";
export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const ChatHome = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);
  useSocketSetup(setFriendList, setMessages, socket);

  return (
    <ChakraProvider resetCSS={false} disableGlobalStyle={true} theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box bg="#f4f4f4">
      <Flex justify="center" align="center" h="90vh">
        <Box
          bg="white"
          w="90%" // Adjust the width of the container as needed
          maxW="950px" // Set maximum width to prevent container from becoming too wide
          p="4" // Add padding
          border="1px solid black" // Add border
          borderRadius="md" // Add border radius for rounded corners
        >
          <div className="workspace_manager">
            <FriendContext.Provider value={{ friendList, setFriendList }}>
              <SocketContext.Provider value={{ socket }}>
                <Grid
                  templateColumns="repeat(10, 1fr)"
                  h="70vh" // Adjust the height of the grid as needed
                  as={Tabs}
                  onChange={index => setFriendIndex(index)}
                >
                  <GridItem colSpan="3" borderRight="1px solid gray">
                    <Sidebar />
                  </GridItem>
                  <GridItem colSpan="7" maxH="100vh">
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                      <Chat userId={friendList[friendIndex]?.userId} />
                    </MessagesContext.Provider>
                  </GridItem>
                </Grid>
              </SocketContext.Provider>
            </FriendContext.Provider>
          </div>
        </Box>
      </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default ChatHome;
