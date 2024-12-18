import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ResetPassword = ({ username, passwordResetToken }) => {
    return (
        <Html>
            <Head />
            <Preview>Mandarin Mastery reset your password</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text>Mandarin Mastery</Text>
                    <Section>
                        <Text style={text}>Hi {username},</Text>
                        <Text style={text}>
                            Someone recently requested a password change for your Mandarin Mastery
                            account. If this was you, you can set a new password here:
                        </Text>
                        <Button style={button} href={`${baseUrl}/auth/reset-password?token=${passwordResetToken}`}>
                            Reset password
                        </Button>
                        <Text style={text}>
                            If you don&apos;t want to change your password or didn&apos;t
                            request this, just ignore and delete this message.
                        </Text>
                        <Text style={text}>Happy Learning!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ResetPassword;

const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
};

const text = {
    fontSize: "16px",
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
};

const button = {
    backgroundColor: "#007ee6",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "210px",
    padding: "14px 7px",
};

const anchor = {
    textDecoration: "underline",
};
