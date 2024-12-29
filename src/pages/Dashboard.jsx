import React from 'react'
import Cookies from 'js-cookie';
import Accounts from '../components/Accounts';
import GenManager from '../components/GenManager';
import Proc from '../components/Proc';
import Service from '../components/Service';
function Dashboard() {
    const role = Cookies.get('data')
  return (
    <div>
        {role === 'accounting' && (
            <Accounts />
        )}
        {role === 'General Manager'&& (
          <GenManager />
        )}
        {role === 'Procurement Officer' &&(
          <Proc />
        )}
        {role === 'Head of Service' && (
          <Service />
        )}
        {role === 'Waitress' && (
          <Service />
        )}
    </div>
  )
}

export default Dashboard