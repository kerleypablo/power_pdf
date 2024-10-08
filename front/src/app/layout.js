import { Inter } from "next/font/google";
import './globals.css';
import { UserProvider } from './context/userContext';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <UserProvider>
          <nav style={{ backgroundColor: '#333', padding: '10px' }}> 
            <ul style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', listStyleType: 'none', margin: 0, padding: 0 }}>
              <li>
                <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Home</Link> 
              </li>
              <li>
                <Link href="/merge/relatorios" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Relatórios</Link>
              </li>
            </ul>
          </nav>
          
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
