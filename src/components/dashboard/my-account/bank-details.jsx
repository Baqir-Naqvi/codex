import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function index({ t, user}) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 mt-3">
        <Label>{t.myaccount.accountNumber}</Label>
        <Input value={user?.accountNumber} readOnly />
      </div>
      <div className="flex flex-col space-y-2 mt-3">
        <Label>{t.myaccount.ibanNumber}</Label>
        <Input value={user?.IBAN} readOnly />
      </div>
    </div>
  );
}

export default index