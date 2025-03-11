
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Patient = {
  "Card No"?: number | null;
  "Name"?: string | null;
  "Agenda"?: string | null;
  "Organization"?: string | null;
  "Page No"?: string | null;
  "Phone.No"?: string | null;
  "Notes"?: string | null;
};

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('zohour')
        .select('*');
      
      if (error) throw error;
      
      setPatients(data || []);
    } catch (error: any) {
      console.error('Error fetching patients:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب بيانات المرضى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = patient.Name && patient.Name.toLowerCase().includes(searchLower);
    const cardNoMatch = patient["Card No"] !== null && 
                       patient["Card No"] !== undefined && 
                       patient["Card No"].toString().includes(searchTerm);
    const phoneMatch = patient["Phone.No"] && patient["Phone.No"].toLowerCase().includes(searchLower);
    
    return nameMatch || cardNoMatch || phoneMatch;
  });

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center mb-4">سجل المرضى</CardTitle>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            placeholder="بحث بالاسم أو رقم الكارت أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10 py-2 text-right"
            dir="rtl"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">جاري التحميل...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-8">
            {searchTerm ? 'لا توجد نتائج مطابقة للبحث' : 'لا يوجد مرضى مسجلين بعد'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2 text-right">رقم الكارت</th>
                  <th className="border p-2 text-right">الاسم</th>
                  <th className="border p-2 text-right">رقم الهاتف</th>
                  <th className="border p-2 text-right">المنظمة</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border p-2 text-right">{patient["Card No"]}</td>
                    <td className="border p-2 text-right">{patient.Name}</td>
                    <td className="border p-2 text-right">{patient["Phone.No"]}</td>
                    <td className="border p-2 text-right">{patient.Organization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientList;
