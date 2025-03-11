
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [dbServer, setDbServer] = useState('');
  const [dbUsername, setDbUsername] = useState('');
  const [dbPassword, setDbPassword] = useState('');
  const [dbName, setDbName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created",
          description: "Please check your email for the confirmation link.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isDirect) {
        // Store direct connection details in localStorage (not recommended for production)
        localStorage.setItem('directDbConnection', JSON.stringify({
          server: dbServer,
          username: dbUsername,
          password: dbPassword,
          database: dbName
        }));
        
        toast({
          title: "Direct connection saved",
          description: "Database connection details have been saved.",
        });
        navigate('/');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          navigate('/');
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">صيدلية الزهور</CardTitle>
          <CardDescription>تسجيل الدخول أو إنشاء حساب جديد</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="direct-connection"
                    checked={isDirect}
                    onChange={(e) => setIsDirect(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="direct-connection" className="cursor-pointer">
                    استخدام اتصال مباشر بقاعدة البيانات
                  </Label>
                </div>

                {isDirect ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="dbServer">خادم قاعدة البيانات</Label>
                      <Input 
                        id="dbServer" 
                        type="text" 
                        placeholder="localhost" 
                        value={dbServer}
                        onChange={(e) => setDbServer(e.target.value)}
                        required
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbUsername">اسم المستخدم</Label>
                      <Input 
                        id="dbUsername" 
                        type="text"
                        placeholder="اسم المستخدم لقاعدة البيانات" 
                        value={dbUsername}
                        onChange={(e) => setDbUsername(e.target.value)}
                        required
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbPassword">كلمة المرور</Label>
                      <Input 
                        id="dbPassword" 
                        type="password" 
                        placeholder="كلمة المرور لقاعدة البيانات" 
                        value={dbPassword}
                        onChange={(e) => setDbPassword(e.target.value)}
                        required
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbName">اسم قاعدة البيانات</Label>
                      <Input 
                        id="dbName" 
                        type="text" 
                        placeholder="اسم قاعدة البيانات" 
                        value={dbName}
                        onChange={(e) => setDbName(e.target.value)}
                        required
                        dir="ltr"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="أدخل بريدك الإلكتروني" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="أدخل كلمة المرور" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        dir="rtl"
                      />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isDirect ? "حفظ بيانات الاتصال" : "تسجيل الدخول"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">البريد الإلكتروني</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">كلمة المرور</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="أدخل كلمة المرور (8 حروف على الأقل)" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    dir="rtl"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "إنشاء حساب"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
