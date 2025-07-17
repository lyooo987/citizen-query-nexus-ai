
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageSquare, Users, FileText, Calendar, ExternalLink, Reply } from "lucide-react";

export function MessagesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    {
      id: 1,
      sender: "Marie Dubois",
      subject: "Révision du code du travail",
      preview: "Pouvez-vous me donner votre avis sur les modifications proposées...",
      time: "Il y a 30 min",
      type: "collaboration",
      unread: true,
      avatar: "MD"
    },
    {
      id: 2,
      sender: "Ahmed Benaissa",
      subject: "Question sur la procédure d'investissement",
      preview: "J'ai besoin d'éclaircissements concernant les nouvelles dispositions...",
      time: "Il y a 2 heures",
      type: "question",
      unread: true,
      avatar: "AB"
    },
    {
      id: 3,
      sender: "Équipe Support",
      subject: "Mise à jour de la plateforme",
      preview: "La maintenance programmée aura lieu demain soir à 22h00...",
      time: "Il y a 1 jour",
      type: "system",
      unread: false,
      avatar: "ES"
    }
  ];

  const unreadCount = messages.filter(m => m.unread).length;

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "collaboration":
        return <Users className="w-4 h-4" />;
      case "question":
        return <FileText className="w-4 h-4" />;
      case "system":
        return <Calendar className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case "collaboration":
        return "bg-blue-100 text-blue-600";
      case "question":
        return "bg-green-100 text-green-600";
      case "system":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <MessageSquare className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Badge variant="secondary">{unreadCount} non lus</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`
                    p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                    ${message.unread ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-medium">
                        {message.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.sender}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getMessageColor(message.type)}`}>
                            {getMessageIcon(message.type)}
                          </div>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-1 truncate">
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {message.time}
                        </p>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Reply className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button 
                variant="ghost" 
                className="w-full text-green-600 hover:text-green-700"
                onClick={() => setIsOpen(false)}
              >
                Voir tous les messages
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
