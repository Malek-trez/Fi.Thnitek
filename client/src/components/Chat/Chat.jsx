import { Text, VStack } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import { FriendContext, MessagesContext } from "./ChatHome.jsx";

const Chat = ({ userId }) => {
  const { friendList } = useContext(FriendContext);
  const { messages } = useContext(MessagesContext);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return friendList.length > 0 ? (
      <VStack h="100%" justify="end">
        <TabPanels
            overflowY="auto"
            maxH="70vh"
            ref={chatContainerRef}
            css={{
              "::-webkit-scrollbar": {
                width: "0.5rem",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "gray.300",
                borderRadius: "0.5rem",
              },
            }}
        >
          {friendList.map((friend) => (
              <VStack
                  flexDir="column-reverse"
                  as={TabPanel}
                  key={`chat:${friend.username}`}
                  w="100%"
                  spacing={2}
              >
                {messages
                    .filter(
                        (msg) => msg.to === friend.userId || msg.from === friend.userId
                    )
                    .map((message, idx) => (
                        <Text
                            m={
                              message.to === friend.userId
                                  ? "0 0 0 auto !important"
                                  : "0 auto 0 0 !important"
                            }
                            maxW="50%"
                            key={`msg:${friend.username}.${idx}`}
                            fontSize="lg"
                            bg={message.to === friend.userId ? "blue.100" : "gray.100"}
                            color="gray.800"
                            borderRadius="10px"
                            p="0.5rem 1rem"
                        >
                          {message.content}
                        </Text>
                    ))}
              </VStack>
          ))}
        </TabPanels>
        <ChatBox userId={userId} />
      </VStack>
  ) : (
      <VStack justify="center" pt="5rem" w="100%" textAlign="center" fontSize="lg">
        <TabPanels>
          <TabPanel>
            <Text>No connections! Click add connection to start chatting</Text>
          </TabPanel>
        </TabPanels>
      </VStack>
  );
};

export default Chat;