import { ThemeProvider } from "./theme-provider";

type Props = {
  children: React.ReactNode;
};

export function Provider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
