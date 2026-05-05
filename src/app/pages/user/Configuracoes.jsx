import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { Settings, Bell, Shield, Palette } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';
import { isAuthenticated } from "../../utils/auth";
import { currentUser } from "../../../data/user";
import { currentUser as getCurrentUser } from "../../../data/user";

export default function Configuracoes() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(
    currentUser.notificacoes_push
  );
  const [emailPromotions, setEmailPromotions] = useState(
    currentUser.promocoes_email
  );

  const handleSave = () => {
    alert('Configurações salvas com sucesso!');
  };

  const isLoggedIn = isAuthenticated();
  
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} userName={currentUser?.nome ?? ''} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          </div>
          <p className="text-muted-foreground">Personalize sua experiência na Loja Insper</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Notificações</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-foreground">Notificações Push</p>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre seus agendamentos
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="rounded border-border w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-foreground">Promoções por Email</p>
                  <p className="text-sm text-muted-foreground">
                    Receba novidades e ofertas especiais
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailPromotions}
                  onChange={(e) => setEmailPromotions(e.target.checked)}
                  className="rounded border-border w-5 h-5"
                />
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Aparência</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground mb-3">Tema</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`px-4 py-2 border-2 rounded-lg transition-all ${
                      theme === 'light'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    Claro
                  </button>
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`px-4 py-2 border-2 rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    Escuro
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Privacidade e Segurança</h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-between">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Gerenciar Dados Pessoais
              </Button>
              <Button variant="outline" className="w-full justify-between text-destructive border-destructive hover:bg-destructive/10">
                Excluir Conta
              </Button>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={() => navigate('/perfil')}>
              Cancelar
            </Button>
            <Button className="w-full" onClick={handleSave}>
              Salvar Alterações
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
