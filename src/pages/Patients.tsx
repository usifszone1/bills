
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PatientForm from '@/components/PatientForm';
import PatientList from '@/components/PatientList';

const Patients = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8" dir="rtl">
          نظام إدارة مرضى صيدلية الزهور
        </h1>
        
        <Tabs 
          defaultValue="list" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">سجل المرضى</TabsTrigger>
            <TabsTrigger value="add">إضافة مريض جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-6">
            <PatientList />
          </TabsContent>
          
          <TabsContent value="add" className="mt-6">
            <PatientForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Patients;
