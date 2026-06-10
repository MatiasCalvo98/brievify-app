import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        variables: {
          colorBackground: "#0D1410",
          colorInputBackground: "#07090A",
          colorInputText: "#E8F0E9",
          colorText: "#E8F0E9",
          colorTextSecondary: "#789878",
          colorPrimary: "#B8EF35",
          colorDanger: "#FF5E40",
          colorSuccess: "#28D485",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
        },
        elements: {
          rootBox: "w-full",
          card: "bg-surface border border-border shadow-none w-full rounded-xl p-8",
          headerTitle:
            "font-heading font-extrabold tracking-[-0.04em] text-bright text-2xl",
          headerSubtitle: "text-text-2 text-sm",
          socialButtonsBlockButton:
            "border-border bg-surface-2 text-text hover:bg-surface-3 hover:border-border-2 transition-colors",
          socialButtonsBlockButtonText: "font-heading font-semibold text-sm",
          dividerLine: "bg-border",
          dividerText: "text-muted text-xs",
          formFieldLabel: "font-heading font-semibold text-xs uppercase tracking-[0.15em] text-text-2",
          formFieldInput:
            "bg-ink border-border text-text placeholder:text-muted focus:border-border-2 rounded-lg h-10 text-sm",
          formButtonPrimary:
            "bg-lime hover:bg-lime-2 text-ink font-heading font-bold rounded-lg h-10 transition-colors",
          footerActionText: "text-text-2 text-sm",
          footerActionLink: "text-lime hover:text-lime-2 font-semibold",
          identityPreviewText: "text-text",
          identityPreviewEditButton: "text-lime",
          formResendCodeLink: "text-lime",
          otpCodeFieldInput: "border-border bg-ink text-text",
          alert: "bg-coral/10 border-coral/20 text-coral",
          alertText: "text-coral text-sm",
        },
      }}
    />
  );
}
