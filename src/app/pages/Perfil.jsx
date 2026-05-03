import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User, Calendar, History } from 'lucide-react';

const upcomingReservations = [
  {
    id: 1,
    productName: 'Moletom Insper Premium',
    pickupDate: '2026-04-25',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    productName: 'Camiseta Insper Básica',
    pickupDate: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
  }
];

export default function Perfil() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('joao.silva@insper.edu.br');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Informações atualizadas com sucesso!');
    setIsEditing(false);
    setNewPassword('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName="João Silva" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Olá, João Silva!</h1>
              <p className="text-muted-foreground">Gerencie seu perfil e reservas</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Informações Pessoais</h2>
              {!isEditing && (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />

              <Input
                label="Nova Senha (deixe em branco para não alterar)"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isEditing}
              />

              {isEditing && (
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsEditing(false);
                      setEmail('joao.silva@insper.edu.br');
                      setNewPassword('');
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="w-full">
                    Salvar
                  </Button>
                </div>
              )}
            </form>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próximas Retiradas
              </h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate('/historico')}
                className="gap-1.5"
              >
                <History className="w-4 h-4" />
                Ver histórico
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingReservations.length > 0 ? (
                upcomingReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center gap-4 p-3 bg-muted hover:bg-accent rounded-lg transition-colors"
                  >
                    <img
                      src={reservation.image}
                      alt={reservation.productName}
                      className="w-16 h-16 object-cover rounded border border-border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{reservation.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Retirada: {new Date(reservation.pickupDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma reserva agendada
                </p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}