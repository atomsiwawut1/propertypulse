import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Place',
  description: ' Find The Best Place',
  keywords: 'Asset Manangement'
};

const Mainlayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer/>
        </body>
      </html>


    </AuthProvider>


  );
};

export default Mainlayout