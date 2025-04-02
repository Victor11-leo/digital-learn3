import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

export default function RootLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen flex-col">
    <Header/>
        <main className="flex-1 p-4">
            {children}
        </main>
    <Footer/>
    </div>
  );
}
