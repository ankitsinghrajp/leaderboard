import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Leaderboard - Track.Claim.Rise",
  description: "This is a simple app where you can select a user, click a button to give random points (1 to 10), and see the updated rankings in real-time. You can also add new users, and every time points are claimed, it saves the history. Made with Node.js and ReactJS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#09090b]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="container py-6 mx-auto">
             <div className="flex justify-center gap-2 text-center items-center flex-col">
            <h1 className="font-extrabold text-4xl text-emerald-500 md:text-5xl">User Ranking System</h1>
            <h2 className="text-xl font-medium text-muted-foreground">Select users, claim points, and watch the leaderboard evolve in the real-time</h2>
              </div>
          </header>
         
          <main className="min-h-screen w-full">
                 {children}
          </main>
        <footer>

        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
