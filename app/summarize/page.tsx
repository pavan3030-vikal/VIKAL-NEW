"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
  Link,
  Image,
  Container,
} from "@chakra-ui/react";
import { ChevronLeftIcon, LinkIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const API_URL = "https://vikal-backend3030-production.up.railway.app";

const SummarizePage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [resources, setResources] = useState<{ title: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [videoId, setVideoId] = useState("");
  const toast = useToast();

  // Handle summarization
  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary("");
    setResources([]);
    setChatResponse(""); // Clear previous chat response
    try {
      const res = await fetch(`${API_URL}/summarize-youtube`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status} - ${await res.text()}`);
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        setVideoId(data.video_id); // Store video_id for chat
        setResources(data.resources || []);
      } else {
        throw new Error(data.error || "No summary returned");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chat with video
  const handleChat = async () => {
    if (!videoId || !chatQuery) {
      toast({
        title: "Error",
        description: "Please enter a question and ensure a video is summarized",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/chat-youtube`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_id: videoId, query: chatQuery }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      if (data.response) {
        setChatResponse(data.response);
      } else {
        throw new Error(data.error || "No chat response");
      }
    } catch (error) {
      toast({
        title: "Chat Error",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg="#0A192F"
      color="#E2E8F0"
      position="relative"
      overflow="hidden"
      fontFamily="Inter, sans-serif"
    >
      {/* Subtle particle overlay for depth */}
      <Box
        position="absolute"
        inset={0}
        bgImage="radial-gradient(circle at 50% 50%, rgba(0, 196, 180, 0.1) 0%, rgba(10, 25, 47, 0) 70%)"
        opacity={0.8}
        zIndex={0}
      />

      <Container maxW="5xl" py={8} px={4} position="relative" zIndex={1}>
        {/* Header */}
        <MotionBox initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} mb={6}>
          <HStack justify="space-between" align="center">
            <HStack spacing={4}>
              <Image src="/image27.png" alt="VIKAL Logo" boxSize="60px" />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="DM Sans, sans-serif"
                bgGradient="linear(to-r, #00C4B4, #FF6B6B)"
                bgClip="text"
                textShadow="0 0 10px rgba(0, 196, 180, 0.3)"
              >
                VIKAL Summarizer
              </Text>
            </HStack>
            <Link
              href="/dashboard"
              fontSize="md"
              color="#FF6B6B"
              fontWeight="medium"
              _hover={{ textDecoration: "underline", color: "#FF8787" }}
            >
              <ChevronLeftIcon mr={2} boxSize={5} /> Back to Dashboard
            </Link>
          </HStack>
        </MotionBox>

        {/* Main Content */}
        <VStack spacing={8} align="stretch">
          {/* Input Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            bg="rgba(20, 30, 50, 0.9)"
            borderRadius="2xl"
            p={8}
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
            border="1px solid rgba(0, 196, 180, 0.2)"
            _hover={{ boxShadow: "0 15px 40px rgba(0, 196, 180, 0.4)" }}
          >
            <VStack spacing={6} align="stretch">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="#00C4B4"
                fontFamily="DM Sans, sans-serif"
                textShadow="0 0 5px rgba(0, 196, 180, 0.2)"
              >
                Paste YouTube Video URL
              </Text>
              <HStack w="full" spacing={4}>
                <Input
                  placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  bg="rgba(30, 40, 60, 0.9)"
                  border="none"
                  color="#E2E8F0"
                  _placeholder={{ color: "#CBD5E0" }}
                  py={6}
                  px={6}
                  borderRadius="xl"
                  _focus={{ boxShadow: "0 0 0 3px rgba(0, 196, 180, 0.5)" }}
                  fontFamily="Inter, sans-serif"
                  fontSize="md"
                />
                <Button
                  bg="#00C4B4"
                  color="white"
                  rounded="xl"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                  _hover={{ bg: "#00A89D", transform: "scale(1.05)", boxShadow: "0 0 20px rgba(0, 196, 180, 0.6)" }}
                  onClick={handleSummarize}
                  isLoading={isLoading}
                >
                  {isLoading ? (
                    <MotionBox animate={{ y: [-10, 10] }} display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="xl">🚀</Text>
                      <Text ml={2} fontFamily="Inter, sans-serif">
                        Launching Summary...
                      </Text>
                    </MotionBox>
                  ) : (
                    "Summarize"
                  )}
                </Button>
              </HStack>
            </VStack>
          </MotionBox>

          {/* Summary Section */}
          {summary && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              bg="rgba(20, 30, 50, 0.9)"
              borderRadius="2xl"
              p={8}
              boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
              border="1px solid rgba(0, 196, 180, 0.2)"
              _hover={{ boxShadow: "0 15px 40px rgba(0, 196, 180, 0.4)" }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="#00C4B4"
                fontFamily="DM Sans, sans-serif"
                mb={4}
                textShadow="0 0 5px rgba(0, 196, 180, 0.2)"
              >
                Video Summary
              </Text>
              <Box fontSize="md" color="#CBD5E0" lineHeight="1.6" fontFamily="Inter, sans-serif">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <Link
                        href={href}
                        color="#FF6B6B"
                        isExternal
                        _hover={{ textDecoration: "underline", color: "#FF8787" }}
                      >
                        {children} <LinkIcon mx="1" boxSize={4} />
                      </Link>
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </Box>
              {resources.length > 0 && (
                <>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="#00C4B4"
                    mt={6}
                    mb={4}
                    fontFamily="DM Sans, sans-serif"
                    textShadow="0 0 5px rgba(0, 196, 180, 0.2)"
                  >
                    Resources
                  </Text>
                  <VStack align="start" spacing={3}>
                    {resources.map((res, idx) => (
                      <Link
                        key={idx}
                        href={res.url}
                        isExternal
                        color="#CBD5E0"
                        fontSize="md"
                        fontFamily="Inter, sans-serif"
                        _hover={{ color: "#FF6B6B", textDecoration: "underline" }}
                      >
                        {res.title} <LinkIcon mx="1" boxSize={4} />
                      </Link>
                    ))}
                  </VStack>
                </>
              )}
            </MotionBox>
          )}

          {/* Chat with Video Section */}
          {summary && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              bg="rgba(20, 30, 50, 0.9)"
              borderRadius="2xl"
              p={8}
              boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
              border="1px solid rgba(0, 196, 180, 0.2)"
              _hover={{ boxShadow: "0 15px 40px rgba(0, 196, 180, 0.4)" }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="#00C4B4"
                fontFamily="DM Sans, sans-serif"
                mb={4}
                textShadow="0 0 5px rgba(0, 196, 180, 0.2)"
              >
                Chat with Video
              </Text>
              <VStack spacing={6} align="stretch">
                <Input
                  placeholder="Ask a question about the video..."
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  bg="rgba(30, 40, 60, 0.9)"
                  border="none"
                  color="#E2E8F0"
                  _placeholder={{ color: "#CBD5E0" }}
                  py={6}
                  px={6}
                  borderRadius="xl"
                  _focus={{ boxShadow: "0 0 0 3px rgba(255, 107, 107, 0.5)" }}
                  fontFamily="Inter, sans-serif"
                  fontSize="md"
                />
                <Button
                  bg="#FF6B6B"
                  color="white"
                  rounded="xl"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                  _hover={{ bg: "#FF8787", transform: "scale(1.05)", boxShadow: "0 0 20px rgba(255, 107, 107, 0.6)" }}
                  onClick={handleChat}
                >
                  Send
                </Button>
                {chatResponse && (
                  <Box
                    fontSize="md"
                    color="#CBD5E0"
                    lineHeight="1.6"
                    fontFamily="Inter, sans-serif"
                    mt={4}
                    p={4}
                    bg="rgba(30, 40, 60, 0.9)"
                    borderRadius="md"
                    boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
                  >
                    <ReactMarkdown>{chatResponse}</ReactMarkdown>
                  </Box>
                )}
              </VStack>
            </MotionBox>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default SummarizePage;