export interface Busqueda {
    titulo: string;
    genero: Genero;
    fechaPublicacionInicio: Date[];
    fechaPublicacionFin: Date[];
}



export interface Genero {
    code: string;
    name: string;
}

export interface Libro {
    id:          number;
    title:       string;
    author:      string;
    image:       string;
    genre:       string;
    isbn:        string;
    published:   Date;
    publisher:   string;
    description: string;
}
