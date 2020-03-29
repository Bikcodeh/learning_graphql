import { IResolvers } from 'graphql-tools';
import { database } from './../data/data.store';

const query : IResolvers = {
    Query: {
        estudiantes(): any{
            return database.estudiantes;
        },
        estudiante(__: void, { id }): any{
            const resultado = database.estudiantes.filter(estudiante => estudiante.id === id) [0]
            if (resultado === undefined){
                return {
                    id: '-1',
                    name: `No se ha encontrado el estudiante con el ID ${id}`,
                    email: '',
                    courses: []
                }
            }
            return resultado;
        },
        cursos(): any{
            return database.cursos;
        },
        curso(__: void, { id } ): any{
            const curso = database.cursos.filter( course => course.id === id)[0];
            if(curso === undefined){
                return {
                    id: '-1',
                    title: `No se ha encontrado el curso con el ID ${id}`,
                    description: '',
                    clases: 0,
                    time: 0.0,
                    level: null,
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
            return curso;
        }
    }
}

export default query;