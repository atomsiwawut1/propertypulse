import React from 'react'
import'@/assets/styles/globals.css'


export const metadata={
    title: 'PropertyPulse | Find The Perfect Place',
    description: ' Find The Best Place',
    keywords:'Asset Manangement'
};

const Mainlayout = ({children}) => {
  return (
  <html lang='en'>
      <body>
         <div>{children}</div>
      </body>
       </html>

  );
};

export default Mainlayout