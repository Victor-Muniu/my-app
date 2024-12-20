import React from 'react'
import Cookies from 'js-cookie';
import Accounts from '../components/Accounts';
import GenManager from '../components/GenManager';
import Proc from '../components/Proc';
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
    </div>
  )
}

export default Dashboard