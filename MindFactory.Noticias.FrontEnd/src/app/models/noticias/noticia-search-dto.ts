export interface NoticiaSearchDto {
  id: number;
  titulo?: string;
  url?: string;
  contenido?: string;
  resumen?: string;
  publicada: boolean;
  categoriaId: number;
  categoriaNombre?: string;
}