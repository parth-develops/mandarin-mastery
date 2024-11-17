import * as React from 'react';
import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from '@react-email/components';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Define the VerificationTemplate component that takes the defined properties
const VerificationTemplate = ({ username, emailVerificationToken }) => (
    <Html>
        <Head />
        <Preview>Preview text that appears in the email client before opening the email.</Preview>
        <Body style={main}>
            <Container style={container}>
                LOGO
                <Text >Hi {username}!</Text>
                <Text >Welcome to Starter Kit for building a SaaS</Text>
                <Text >Please verify your email, with the link below:</Text>
                <Section >
                    {/* Button that takes the user to the verification link */}
                    <Button
                        href={`${baseUrl}/auth/verify-email?token=${emailVerificationToken}`}
                    >
                        Click here to verify
                    </Button>
                </Section>
                <Hr />
                <Text>Something in the footer.</Text>
            </Container>
        </Body>
    </Html>
);

// Styles applied to different parts of the email for customization
const main = {
    backgroundColor: '#020817',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

export default VerificationTemplate;