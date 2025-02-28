"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Flex,
  ImageProps,
  ButtonProps,
  BoxProps,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { motion, MotionProps } from "framer-motion";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

// Define motion components
const MotionImage = motion.create(Image) as React.ComponentType<ImageProps & MotionProps>;
const MotionButton = motion.create(Button) as React.ComponentType<ButtonProps & MotionProps>;
const MotionBox = motion.create(Box) as React.ComponentType<BoxProps & MotionProps>;

// Dot component
const Dot = ({ x, y }: { x: number; y: number }) => (
  <Box
    position="absolute"
    left={`${x}px`}
    top={`${y}px`}
    width="4px"
    height="4px"
    borderRadius="full"
    bg="rgba(0, 196, 180, 0.5)"
    animation="twinkle 2s infinite ease-in-out"
    sx={{
      "@keyframes twinkle": {
        "0%": { opacity: 0.5, transform: "scale(1)" },
        "50%": { opacity: 1, transform: "scale(1.2)" },
        "100%": { opacity: 0.5, transform: "scale(1)" },
      },
    }}
  />
);

// Rocket component
const Rocket = () => (
  <Box
    position="absolute"
    width="40px"
    height="40px"
    zIndex={1}
    animation="rocket 8s infinite linear"
    sx={{
      "@keyframes rocket": {
        "0%": { transform: "translate(0, 100vh) rotate(45deg)" },
        "100%": { transform: "translate(100vw, -100vh) rotate(45deg)" },
      },
    }}
  >
    <Box as="svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2">
      <path d="M12 2L10 8H14L12 2ZM12 8L6 20H18L12 8Z" fill="#FF6B6B" />
      <path d="M8 20L6 22H18L16 20H8Z" fill="#00C4B4" />
    </Box>
  </Box>
);

// LandingPage component
const LandingPage = () => {
  const router = useRouter();
  const [_, setIsTransitioning] = useState(false); // Keep setter, unused variable fixed
  const [dots, setDots] = useState<{ x: number; y: number; key: string }[]>([]);

  useEffect(() => {
    const generateDots = () => {
      const dotCount = 100;
      const newDots: { x: number; y: number; key: string }[] = [];
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        newDots.push({ x, y, key: `dot-${i}` });
      }
      setDots(newDots);
    };
    generateDots();
    window.addEventListener("resize", generateDots);
    return () => window.removeEventListener("resize", generateDots);
  }, []);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const parallaxStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "120%",
    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0, 196, 180, 0.15) 0%, rgba(10, 25, 47, 0) 70%)",
    backgroundSize: "cover",
    transform: "translateY(0)",
    zIndex: 0,
  };

  return (
    <Box minHeight="100vh" bg="#0A192F" color="#E2E8F0" position="relative" overflow="hidden">
      <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0}>
        {dots.map((dot) => (
          <Dot key={dot.key} x={dot.x} y={dot.y} />
        ))}
        <Rocket />
      </Box>

      <Box position="relative" minH="100vh" overflow="hidden">
        <Box
          style={parallaxStyle}
          sx={{
            "@media (min-width: 768px)": {
              transform: "translateY(calc(var(--scroll-y) * -0.3))",
            },
          }}
          ref={(el: HTMLElement | null) => {
            if (el) {
              const handleScroll = () => {
                el.style.transform = `translateY(${window.scrollY * -0.3}px)`;
              };
              window.addEventListener("scroll", handleScroll);
              return () => window.removeEventListener("scroll", handleScroll);
            }
          }}
        />
        <Container maxW="8xl" py={12} position="relative" zIndex={1}>
          <MotionBox variants={containerVariants} initial="hidden" animate="visible" pt={16} pb={24} textAlign="center">
            <MotionImage
              src="/image27.png"
              alt="VIKAL Logo"
              maxW={["200px", "300px", "400px"]}
              mx="auto"
              mb={4}
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              _hover={{ filter: "drop-shadow(0 0 15px rgba(0, 196, 180, 0.5))" }}
            />
            <Heading
              as="h2"
              fontSize={["4xl", "5xl", "6xl"]}
              fontWeight="bold"
              mb={8}
              bgGradient="linear(to-r, #00C4B4, #FF6B6B)"
              bgClip="text"
              fontFamily="'Cinzel', serif"
              textShadow="0 0 20px rgba(0, 196, 180, 0.5)"
            >
              VIKAL
            </Heading>

            <Heading
              as="h1"
              fontSize={["3xl", "4xl", "5xl"]}
              fontWeight="extrabold"
              lineHeight="1.1"
              mb={6}
              bgGradient="linear(to-r, #00C4B4, #FF6B6B)"
              bgClip="text"
              fontFamily="'Playfair Display', serif"
            >
              Unlock Your Potential with AI-Powered Learning
            </Heading>

            <Text
              fontSize={["lg", "xl", "2xl"]}
              maxW="3xl"
              mx="auto"
              mb={10}
              opacity={0.85}
              fontFamily="Inter, sans-serif"
              fontWeight="medium"
            >
              VIKAL – AI-Powered Prep for UPSC, GATE & SSC! Tailored Learning, Smarter Success.
            </Text>

            <HStack spacing={6} justify="center">
              <MotionButton
                size="lg"
                rounded="md"
                bg="#00C4B4"
                color="white"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                fontFamily="Inter, sans-serif"
                _hover={{ bg: "#00A89D", boxShadow: "0 0 20px rgba(0, 196, 180, 0.4)" }}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
              >
                Get Started
              </MotionButton>

              <MotionButton
                size="lg"
                rounded="md"
                bg="transparent"
                border="2px solid"
                borderColor="#FF6B6B"
                color="#FF6B6B"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                fontFamily="Inter, sans-serif"
                _hover={{ bg: "rgba(255, 107, 107, 0.1)", color: "#FF8787" }}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </MotionButton>
            </HStack>
          </MotionBox>
        </Container>
      </Box>

      <Container maxW="8xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          mb={20}
          bg="rgba(20, 30, 50, 0.9)"
          borderRadius="xl"
          p={8}
          boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
        >
          <Heading as="h2" size="xl" mb={6} color="#00C4B4" fontFamily="DM Sans, sans-serif" textAlign="center">
            Discover How to Use VIKAL
          </Heading>
          <Box maxW="800px" mx="auto" borderRadius="md" overflow="hidden" boxShadow="0 0 20px rgba(0, 196, 180, 0.2)">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/your_video_link"
              title="How to use VIKAL"
              frameBorder="0"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            />
          </Box>
        </MotionBox>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          mb={20}
        >
          <Heading
            as="h2"
            fontSize={["3xl", "4xl", "5xl"]}
            fontWeight="bold"
            textAlign="center"
            color="#00C4B4"
            mb={4}
            fontFamily="DM Sans, sans-serif"
          >
            Revolutionizing Exam Preparation with AI Solutions
          </Heading>
          <Text
            fontSize={["lg", "xl"]}
            textAlign="center"
            maxW="3xl"
            mx="auto"
            mb={12}
            opacity={0.85}
            fontFamily="Inter, sans-serif"
          >
            VIKAL harnesses the power of AI to provide tailored solutions for your exam queries. Whether it’s UPSC, GATE, or SSC, we’ve got you covered.
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
            {[
              {
                title: "Innovative",
                description: "Customized answers for your exam questions",
                icon: null, // Removed ChevronRightIcon
              },
              {
                title: "Comprehensive",
                description: "In-depth explanations for subjects like math and science",
                icon: <InfoIcon boxSize={8} color="#00C4B4" />,
              },
            ].map((feature, index) => (
              <MotionBox
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                bg="rgba(20, 30, 50, 0.9)"
                borderRadius="lg"
                p={6}
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
                _hover={{ transform: "translateY(-5px)", boxShadow: "0 12px 30px rgba(0, 196, 180, 0.3)" }}
              >
                <VStack spacing={4} align="start">
                  {feature.icon && <Box>{feature.icon}</Box>}
                  <Heading as="h3" size="lg" color="#E2E8F0" fontFamily="DM Sans, sans-serif">
                    {feature.title}
                  </Heading>
                  <Text color="#CBD5E0" fontFamily="Inter, sans-serif">
                    {feature.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </Grid>
        </MotionBox>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          bg="rgba(20, 30, 50, 0.9)"
          borderRadius="xl"
          p={12}
          mb={20}
          boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
        >
          <Heading
            fontSize={["3xl", "4xl", "5xl"]}
            fontWeight="bold"
            textAlign="center"
            bgGradient="linear(to-r, #00C4B4, #FF6B6B)"
            bgClip="text"
            mb={12}
            fontFamily="DM Sans, sans-serif"
          >
            Your Learning Journey
          </Heading>

          <Grid templateColumns={{ base: "1fr" }} gap={10}>
            {[
              {
                icon: null, // Removed ChevronRightIcon
                title: "Identify Your Path",
                description: "Identify your exam and subjects to focus on for tailored preparation.",
              },
              {
                icon: <InfoIcon boxSize={8} color="#00C4B4" />,
                title: "Access Resources",
                description: "Access customized resources and practice questions designed for your specific exam.",
              },
              {
                icon: null, // Removed ChevronRightIcon
                title: "Video Learning",
                description: "Utilize our YouTube summarizer for quick topic reviews and video insights.",
              },
              {
                icon: <InfoIcon boxSize={8} color="#00C4B4" />,
                title: "Track Progress",
                description: "Track your progress and adjust your study plan for optimal results.",
              },
            ].map((step, index) => (
              <MotionBox
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                display="flex"
                alignItems="center"
                bg="rgba(30, 40, 60, 0.8)"
                borderRadius="md"
                p={6}
                _hover={{ bg: "rgba(30, 40, 60, 1)", transform: "translateY(-5px)" }}
              >
                {step.icon && <Box mr={4}>{step.icon}</Box>}
                <VStack align="start" spacing={2}>
                  <Heading as="h3" size="md" color="#E2E8F0" fontFamily="DM Sans, sans-serif">
                    {step.title}
                  </Heading>
                  <Text color="#CBD5E0" fontFamily="Inter, sans-serif">
                    {step.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </Grid>

          <Box mt={12} textAlign="center" py={6} borderTop="1px" borderBottom="1px" borderColor="rgba(255, 255, 255, 0.1)">
            <Text fontSize="xl" color="#E2E8F0" fontStyle="italic" fontFamily="Inter, sans-serif" opacity={0.9}>
              "Education is not preparation for life; education is life itself."
            </Text>
            <Text mt={2} color="#FF6B6B" fontFamily="Inter, sans-serif">
              - John Dewey
            </Text>
          </Box>

          <VStack spacing={8} mt={12} align="center">
            <Heading
              fontSize={["3xl", "4xl"]}
              fontWeight="bold"
              color="#00C4B4"
              fontFamily="DM Sans, sans-serif"
            >
              Unlock Your Learning Potential
            </Heading>
            <Text fontSize={["lg", "xl"]} color="#CBD5E0" maxW="3xl" fontFamily="Inter, sans-serif" opacity={0.85}>
              Experience personalized learning solutions tailored for your exam success. Join VIKAL today!
            </Text>
            <MotionButton
              size="lg"
              rounded="md"
              bg="#FF6B6B"
              color="white"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
              _hover={{ bg: "#FF8787", boxShadow: "0 0 20px rgba(255, 107, 107, 0.4)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </MotionButton>
          </VStack>
        </MotionBox>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          mb={20}
        >
          <Heading
            fontSize={["3xl", "4xl", "5xl"]}
            fontWeight="bold"
            textAlign="center"
            color="#00C4B4"
            mb={4}
            fontFamily="DM Sans, sans-serif"
          >
            Unlock Your Potential with Personalized Learning and Efficient Exam Preparation
          </Heading>
          <Text
            fontSize={["lg", "xl", "2xl"]}
            textAlign="center"
            maxW="3xl"
            mx="auto"
            mb={12}
            color="#CBD5E0"
            fontFamily="Inter, sans-serif"
            opacity={0.85}
          >
            "VIKAL – आपकी 🧠 AI तैयारी, आपकी 🏆 सफलता!"
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {[
              {
                icon: null, // Removed ChevronRightIcon
                title: "Personalized Learning",
                description: "Tailored solutions for your specific exam needs.",
              },
              {
                icon: <InfoIcon boxSize={8} color="#00C4B4" />,
                title: "Comprehensive Resources",
                description: "Access a wide range of study materials and practice questions.",
              },
              {
                icon: null, // Removed ChevronRightIcon
                title: "Progress Tracking",
                description: "Monitor your progress and adjust your study plan accordingly.",
              },
              {
                icon: <InfoIcon boxSize={8} color="#00C4B4" />,
                title: "Video Summaries",
                description: "Quickly review topics with our YouTube video summarizer.",
              },
              {
                icon: null, // Removed ChevronRightIcon
                title: "AI-Powered Insights",
                description: "Get instant feedback and insights to improve your performance.",
              },
              {
                icon: <InfoIcon boxSize={8} color="#00C4B4" />,
                title: "Innovative Tools",
                description: "Utilize advanced tools to enhance your learning experience.",
              },
            ].map((benefit, index) => (
              <MotionBox
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                bg="rgba(20, 30, 50, 0.9)"
                borderRadius="lg"
                p={6}
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
                _hover={{ transform: "translateY(-5px)", boxShadow: "0 12px 30px rgba(0, 196, 180, 0.3)" }}
              >
                <VStack spacing={4} align="start">
                  {benefit.icon && <Box>{benefit.icon}</Box>}
                  <Heading as="h3" size="md" color="#E2E8F0" fontFamily="DM Sans, sans-serif">
                    {benefit.title}
                  </Heading>
                  <Text color="#CBD5E0" fontFamily="Inter, sans-serif">
                    {benefit.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </Grid>
        </MotionBox>

        <Box
          as="footer"
          bg="rgba(10, 25, 47, 0.9)"
          py={6}
          borderTop="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Container maxW="8xl">
            <Flex justify="center" align="center" gap={2}>
              <Text fontSize="sm" color="whiteAlpha.600" fontFamily="Inter, sans-serif">
                Powered by
              </Text>
              <Image
                src="/zovx.png"
                alt="ZOVX"
                height="100px"
                objectFit="contain"
                filter="brightness(2) drop-shadow(0 0 10px rgba(0, 196, 180, 0.3))"
                _hover={{ filter: "brightness(2.5) drop-shadow(0 0 15px rgba(0, 196, 180, 0.5))" }}
              />
            </Flex>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;