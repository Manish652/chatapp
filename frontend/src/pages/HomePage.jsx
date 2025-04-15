import React, { useEffect } from 'react'
import { useChartStore } from '../store/useChartStore.js'
import Slidebar from '../components/Slidebar.jsx';
import NoChartSelected from '../components/NoChartSelected.jsx';
import ChartCotainer from '../components/ChartCotainer.jsx';

function HomePage() {
  const { selectedUser, setSelectedUser } = useChartStore();

  // Clear selected user when component mounts
  useEffect(() => {
    setSelectedUser(null);
  }, [setSelectedUser]);

  return (
    <div className='h-[calc(100vh-4rem)] mt-16'>
      <div className='h-full bg-base-100'>
        <div className='flex h-full'>
          <Slidebar/>
          {!selectedUser ? <NoChartSelected/> : <ChartCotainer/>}
        </div>
      </div>
    </div>
  )
}

export default HomePage