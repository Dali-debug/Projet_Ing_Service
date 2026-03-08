export interface Message {
  id: string;
  expediteurId: string;
  destinataireId: string;
  contenu: string;
  dateEnvoi: string;
  estLu: boolean;
}
