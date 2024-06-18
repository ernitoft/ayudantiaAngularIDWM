export interface ResponseDelete {
  message: string;
  usuario: Usuario;
}

export interface Usuario {
  id:         number;
  name:       string;
  lastname:   string;
  username:   string;
  email:      string;
  rut:        string;
  score:      number;
  role:       number;
  created_at: Date;
  updated_at: Date;
}
