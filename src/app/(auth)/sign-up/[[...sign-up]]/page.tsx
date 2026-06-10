import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorBackground: "#0D1410",
          colorInputBackground: "#07090A",
          colorInputText: "#E8F0E9",
          colorText: "#E8F0E9",
          colorTextSecondary: "#789878",
          colorPrimary: "#B8EF35",
          colorTextOnPrimaryBackground: "#07090A",
          colorDanger: "#FF5E40",
          colorSuccess: "#28D485",
          colorNeutral: "#789878",
          borderRadius: "0.75rem",
          spacingUnit: "1rem",
          fontSize: "0.9rem",
        },
        layout: {
          socialButtonsVariant: "blockButton",
        },
        elements: {
          card: {
            background: "#0D1410",
            border: "1px solid #1C2B1F",
            boxShadow: "none",
            padding: "2rem",
          },
          headerTitle: {
            color: "#F5FAF5",
            fontWeight: "800",
            letterSpacing: "-0.04em",
            fontSize: "1.5rem",
          },
          headerSubtitle: {
            color: "#789878",
          },
          dividerLine: {
            background: "#1C2B1F",
          },
          dividerText: {
            color: "#456050",
          },
          formFieldInput: {
            background: "#07090A",
            border: "1px solid #1C2B1F",
            color: "#E8F0E9",
          },
          formButtonPrimary: {
            background: "#B8EF35",
            color: "#07090A",
            fontWeight: "700",
          },
          footerActionLink: {
            color: "#B8EF35",
          },
          socialButtonsBlockButton: {
            background: "#131C15",
            border: "1px solid #1C2B1F",
            color: "#E8F0E9",
          },
          socialButtonsBlockButtonText: {
            color: "#E8F0E9",
          },
          identityPreviewText: {
            color: "#E8F0E9",
          },
          identityPreviewEditButton: {
            color: "#B8EF35",
          },
          formResendCodeLink: {
            color: "#B8EF35",
          },
        },
      }}
    />
  );
}
