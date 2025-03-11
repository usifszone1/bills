
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

type PatientData = {
  "Card No"?: number | null;
  "Name"?: string | null;
  "Agenda"?: string | null;
  "Organization"?: string | null;
  "Page No"?: string | null;
  "Phone.No"?: string | null;
  "Notes"?: string | null;
};

const PatientForm = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    "Card No": null,
    "Name": "",
    "Agenda": "",
    "Organization": "",
    "Page No": "",
    "Phone.No": "",
    "Notes": ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "Card No") {
      setPatientData({
        ...patientData,
        [name]: value ? parseInt(value, 10) : null
      });
    } else {
      setPatientData({
        ...patientData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول لإضافة مريض جديد",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('zohour')
        .insert([patientData]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم إضافة بيانات المريض بنجاح",
      });

      setPatientData({
        "Card No": null,
        "Name": "",
        "Agenda": "",
        "Organization": "",
        "Page No": "",
        "Phone.No": "",
        "Notes": ""
      });
    } catch (error: any) {
      console.error("Error submitting patient data:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إضافة بيانات المريض",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">إضافة مريض جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardNo">رقم الكارت</Label>
              <Input
                id="cardNo"
                name="Card No"
                type="number"
                value={patientData["Card No"] || ''}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                name="Name"
                value={patientData["Name"] || ''}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agenda">الأجندة</Label>
              <Input
                id="agenda"
                name="Agenda"
                value={patientData["Agenda"] || ''}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">المنظمة</Label>
              <Input
                id="organization"
                name="Organization"
                value={patientData["Organization"] || ''}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pageNo">رقم الصفحة</Label>
              <Input
                id="pageNo"
                name="Page No"
                value={patientData["Page No"] || ''}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNo">رقم الهاتف</Label>
              <Input
                id="phoneNo"
                name="Phone.No"
                value={patientData["Phone.No"] || ''}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <textarea
              id="notes"
              name="Notes"
              value={patientData["Notes"] || ''}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-right"
              dir="rtl"
            />
          </div>

          <CardFooter className="flex justify-end px-0 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'جاري الإضافة...' : 'إضافة مريض'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
