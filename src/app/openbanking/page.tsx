"use client"
import React from 'react'
import { useOBContext } from '@/contexts/OpenBanking/OpenBankingProvider';

export default function page() {
      const { openOBPage } = useOBContext();

      const onNavigate = () => {
    // setModalVisible(false);
    openOBPage();
  };
  return (
    <div>
        <button onClick={onNavigate}>hello click me</button>
    </div>
  )
}
