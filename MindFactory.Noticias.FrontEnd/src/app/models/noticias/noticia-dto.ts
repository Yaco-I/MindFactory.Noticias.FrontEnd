export interface NoticiaDto {
  id: number;
  titulo: string;
  url: string;
  contenido: string;
  resumen?: string;
  categoriaId: number;
  categoriaNombre: string;
  publicada: boolean;
}
