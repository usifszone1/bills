
import React from 'react';
import { LogOut, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthButtonsProps {
  session: any;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/patients" className="flex items-center gap-2">
              <Users size={16} />
              <span>سجل المرضى</span>
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      ) : (
        <Button variant="outline" asChild>
          <Link to="/auth" className="flex items-center gap-2">
            <span>تسجيل الدخول</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
