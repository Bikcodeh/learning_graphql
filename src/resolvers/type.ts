import { IResolvers } from 'graphql-tools';
import { database } from './../data/data.store';
import _ from 'lodash';

const type : IResolvers = {
    Estudiante: {
        courses: parent => {
            const cursosLista : Array<any> = [];
            parent.courses.map((idCurso: string) => {
                cursosLista.push(_.filter(database.cursos, ['id', idCurso])[0])
            });
            return cursosLista;
        }
    },
    Curso: {
        students: parent => {
            const estudiantesLista : Array<any> = [];
            const idCurso = parent.id;
            database.estudiantes.map((estudiante: any) => {
                if(estudiante.courses.filter( (id: any ) => id === idCurso) > 0){
                    estudiantesLista.push(estudiante);
                }
            });
            return estudiantesLista;
        }
    }
}

export default type;