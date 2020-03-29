import { IResolvers } from 'graphql-tools';
import { database } from './../data/data.store';
import _ from 'lodash';

const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__: void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }

            if (database.cursos.filter(curso => curso.title === itemCurso.title).length === 0) {
                database.cursos.push(itemCurso);
                return itemCurso;
            }
            return {
                id: '-1',
                title: `El curso ya esta registrado con este titulo`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }
        },
        modificarCurso(__: void, { curso }): any {
            
            const elementoExiste = findIndex(database.cursos, curso.id);

            if (elementoExiste > -1) {
                const valoraciones = database.cursos[elementoExiste].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExiste] = curso;
                return curso;
            }
            return {
                id: '-1',
                title: `El curso no esta registrado en la base de datos`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }
        },
        eliminarCurso(__: void, { id }): any {
            const indexCurso = findIndex(database.cursos, id);
            if(indexCurso > -1 ){    
                const curso = database.cursos[indexCurso];
                database.cursos.splice(indexCurso, 1);
                return curso;
            }
            return {
                id: '-1',
                title: `El curso no esta registrado en la base de datos`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }
        }
    }
}

const findIndex = (listaCurso: Array<any>, idCurso: any) => {
    return listaCurso.findIndex(element => element.id === idCurso);
}

export default mutation;